"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { problems, Problem, TestCase } from "@/lib/problems";
import { patterns } from "@/lib/patterns";
import { markProblemSolved, saveDerivationLog, saveDerivationLogDraft, getDerivationLog, scheduleReview } from "@/lib/actions";
import { sounds } from "@/lib/sound";
import { Play, RotateCcw, Check, Circle, AlertTriangle, ChevronDown, ChevronUp, Copy, Eye, EyeOff, Lock, Unlock, Timer, Brain, FileText } from "lucide-react";
import OnionReader from "./OnionReader";
import PauseAndRender from "./PauseAndRender";
import CCUWarning from "./CCUWarning";
import VictoryOverlay from "./VictoryOverlay";
import { useRouter } from "next/navigation";

function arraysEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!arraysEqual(a[i], b[i])) return false;
    }
    return true;
  }
  return false;
}

function valueEqual(a: any, b: any): boolean {
  if (typeof a === "number" && typeof b === "number") return a === b;
  if (typeof a === "boolean" && typeof b === "boolean") return a === b;
  if (typeof a === "string" && typeof b === "string") return a === b;
  if (Array.isArray(a) && Array.isArray(b)) return arraysEqual(a, b);
  if (a == null && b == null) return true;
  return false;
}

interface CodePlaygroundProps {
  initialProblemId?: string;
  focusMode?: boolean;
}

export default function CodePlayground({ initialProblemId, focusMode = false }: CodePlaygroundProps) {
  const initialIdx = initialProblemId ? problems.findIndex((p) => p.id === initialProblemId) : 0;
  const [problemIdx, setProblemIdx] = useState(Math.max(initialIdx, 0));
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState<{ case: TestCase; passed: boolean; actual: any; error?: string }[]>([]);
  const [derivationUnlocked, setDerivationUnlocked] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showTests, setShowTests] = useState(true);
  const [activeTab, setActiveTab] = useState<"description" | "derivation" | "editor" | "tests">("description");
  const [onionComplete, setOnionComplete] = useState(false);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [lineNumbers, setLineNumbers] = useState<string[]>(["1"]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Derivation log state
  const [structuralNecessity, setStructuralNecessity] = useState("");
  const [invariantIdentification, setInvariantIdentification] = useState("");
  const [failureModes, setFailureModes] = useState("");
  const [alternativesRejected, setAlternativesRejected] = useState("");
  const [mentalClarity, setMentalClarity] = useState(0);
  const [derivationConfidence, setDerivationConfidence] = useState(0);
  const [derivationTimer, setDerivationTimer] = useState(0);
  const [derivationActive, setDerivationActive] = useState(false);
  const [derivationSaved, setDerivationSaved] = useState(false);
  const [loadingLog, setLoadingLog] = useState(true);
  const [draftSavedAt, setDraftSavedAt] = useState<number | null>(null);

  // Stuck mode: emergency scaffolding
  const [stuckMode, setStuckMode] = useState(false);
  const [stuckStep, setStuckStep] = useState<0 | 1 | 2>(0);
  const [stuckTyped, setStuckTyped] = useState("");

  // PauseAndRender callbacks — stable references so interval doesn't reset
  const handleBreakStart = useCallback(() => setIsBreakActive(true), []);
  const handleBreakEnd = useCallback(() => setIsBreakActive(false), []);

  // Time-to-code tracking
  const [codeTimer, setCodeTimer] = useState(0);
  const [codeTimerActive, setCodeTimerActive] = useState(false);
  const [codeTimerStarted, setCodeTimerStarted] = useState(false);

  // Prevent duplicate DB writes when all tests pass
  const savedToDbRef = useRef(false);

  // Victory overlay
  const [showVictory, setShowVictory] = useState(false);
  const router = useRouter();

  // Copy confirmation
  const [copied, setCopied] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Refs for timers so auto-save interval doesn't reset every second
  const derivationTimerRef = useRef(derivationTimer);
  const codeTimerRef = useRef(codeTimer);
  useEffect(() => { derivationTimerRef.current = derivationTimer; }, [derivationTimer]);
  useEffect(() => { codeTimerRef.current = codeTimer; }, [codeTimer]);

  const problem = problems[problemIdx];
  const pattern = patterns.find((p) => p.id === problem.patternId);

  // Load derivation log from DB on problem change
  useEffect(() => {
    async function loadLog() {
      setLoadingLog(true);
      try {
        const log = await getDerivationLog(problem.id);
        if (log) {
          setStructuralNecessity(log.structural_necessity);
          setInvariantIdentification(log.invariant_identification);
          setFailureModes(log.failure_modes);
          setAlternativesRejected(log.alternatives_rejected);
          setMentalClarity(log.mental_image_clarity);
          setDerivationConfidence(log.derivation_confidence);
          // Only unlock if it's a final (non-draft) submission
          const isFinal = log.is_draft !== 1;
          setDerivationUnlocked(isFinal);
          setDerivationSaved(isFinal);
        } else {
          setStructuralNecessity("");
          setInvariantIdentification("");
          setFailureModes("");
          setAlternativesRejected("");
          setMentalClarity(0);
          setDerivationConfidence(0);
          setDerivationUnlocked(false);
          setDerivationSaved(false);
        }
      } catch (err) {
        console.error("Failed to load derivation log:", err);
        // Reset to empty state so the UI doesn't hang
        setDerivationUnlocked(false);
        setDerivationSaved(false);
      } finally {
        setLoadingLog(false);
      }
    }
    loadLog();
  }, [problem.id]);

  // Derivation timer (pauses during break)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (derivationActive && !isBreakActive) {
      interval = setInterval(() => {
        setDerivationTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [derivationActive, isBreakActive]);

  // Initialize code from starter
  useEffect(() => {
    setCode(problem.starterCode);
    setTestResults([]);
    setShowSolution(false);
    setActiveTab("description");
    setDerivationTimer(0);
    setDerivationActive(false);
    setCodeTimer(0);
    setCodeTimerActive(false);
    setCodeTimerStarted(false);
    setDraftSavedAt(null);
    setOnionComplete(false);
    savedToDbRef.current = false;
  }, [problemIdx]);

  // Update line numbers
  useEffect(() => {
    const lines = code.split("\n").length;
    setLineNumbers(Array.from({ length: Math.max(lines, 1) }, (_, i) => String(i + 1)));
  }, [code]);

  // Auto-save derivation draft every 10s
  useEffect(() => {
    if (derivationSaved) return; // don't auto-save after final submit
    const interval = setInterval(() => {
      saveDerivationLogDraft(problem.id, problem.patternId, {
        structural_necessity: structuralNecessity,
        invariant_identification: invariantIdentification,
        failure_modes: failureModes,
        alternatives_rejected: alternativesRejected,
        mental_image_clarity: mentalClarity,
        derivation_confidence: derivationConfidence,
        time_to_derive: derivationTimerRef.current,
        time_to_code: codeTimerRef.current,
      }).then(() => {
        setDraftSavedAt(Date.now());
      }).catch((err) => {
        console.error("Auto-save draft failed:", err);
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [structuralNecessity, invariantIdentification, failureModes, alternativesRejected, mentalClarity, derivationConfidence, problem.id, problem.patternId, derivationSaved]);

  // Code timer: start on first keystroke when editor is active (pauses during break)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (codeTimerActive && !isBreakActive) {
      interval = setInterval(() => {
        setCodeTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [codeTimerActive, isBreakActive]);

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
      }, 0);
    }
  };

  const runTests = useCallback(() => {
    const results: { case: TestCase; passed: boolean; actual: any; error?: string }[] = [];

    // Extract function name from starter code: "function twoSum(nums, target) {"
    const fnNameMatch = problem.starterCode.match(/function\s+(\w+)\s*\(/);
    const fnName = fnNameMatch ? fnNameMatch[1] : null;

    for (const tc of problem.testCases) {
      try {
        const userCode = code;
        const wrapper = new Function(`
          ${userCode}
          return typeof ${fnName} === 'function' ? ${fnName} : null;
        `);

        const fn = wrapper();

        if (!fn || typeof fn !== "function") {
          results.push({ case: tc, passed: false, actual: null, error: fnName ? `Could not find "${fnName}". Make sure you didn't rename it.` : "Could not find your function. Make sure you didn't rename it." });
          continue;
        }

        // Deep-clone args to prevent mutation between test cases
        const clonedArgs = JSON.parse(JSON.stringify(tc.args));
        const actual = fn(...clonedArgs);
        const passed = valueEqual(actual, tc.expectedValue);
        results.push({ case: tc, passed, actual });
      } catch (err: any) {
        results.push({ case: tc, passed: false, actual: null, error: err.message || "Runtime error" });
      }
    }

    setTestResults(results);
    setShowTests(true);
    setActiveTab("tests");
    if (results.length > 0 && !results.every((r) => r.passed)) {
      sounds.fail();
    }
  }, [code, problem]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.ctrlKey || e.metaKey;
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === "TEXTAREA" || target.tagName === "INPUT" || target.isContentEditable;

      // Ctrl/Cmd + Enter: Run tests (always works, even in code editor)
      if (isMeta && e.key === "Enter" && derivationUnlocked) {
        e.preventDefault();
        runTests();
        return;
      }

      // Escape: Hide solution
      if (e.key === "Escape" && showSolution) {
        e.preventDefault();
        setShowSolution(false);
        return;
      }

      // Don't intercept other shortcuts when typing in text fields
      if (isTyping && target !== textareaRef.current) return;

      // Ctrl/Cmd + /: Toggle solution
      if (isMeta && e.key === "/") {
        e.preventDefault();
        setShowSolution((s) => !s);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [derivationUnlocked, showSolution, runTests]);

  const allPassed = testResults.length > 0 && testResults.every((r) => r.passed);

  // Save to DB when all tests pass (once only)
  useEffect(() => {
    if (allPassed && problem && !savedToDbRef.current) {
      savedToDbRef.current = true;
      setCodeTimerActive(false);
      sounds.pass();
      setShowVictory(true);
      markProblemSolved(problem.id, problem.patternId, problem.name, problem.number, problem.difficulty);
      // Also update the derivation log with final time_to_code
      saveDerivationLogDraft(problem.id, problem.patternId, {
        structural_necessity: structuralNecessity,
        invariant_identification: invariantIdentification,
        failure_modes: failureModes,
        alternatives_rejected: alternativesRejected,
        mental_image_clarity: mentalClarity,
        derivation_confidence: derivationConfidence,
        time_to_derive: derivationTimer,
        time_to_code: codeTimer,
      }).catch((err) => console.error("Failed to save code time:", err));
      // Schedule next review (spaced repetition)
      scheduleReview(problem.id, problem.patternId, true).catch((err) => console.error("Failed to schedule review:", err));
    }
  }, [allPassed, problem, structuralNecessity, invariantIdentification, failureModes, alternativesRejected, mentalClarity, derivationConfidence, derivationTimer, codeTimer]);

  const nextProblem = () => {
    if (problemIdx < problems.length - 1) {
      setProblemIdx(problemIdx + 1);
    }
  };

  const prevProblem = () => {
    if (problemIdx > 0) {
      setProblemIdx(problemIdx - 1);
    }
  };

  const submitDerivation = async () => {
    if (!structuralNecessity.trim()) {
      setToast({ message: "Fill in the core derivation before submitting.", type: "error" });
      return;
    }

    try {
      await saveDerivationLog(problem.id, problem.patternId, {
        structural_necessity: structuralNecessity,
        invariant_identification: invariantIdentification,
        failure_modes: failureModes,
        alternatives_rejected: alternativesRejected,
        mental_image_clarity: mentalClarity,
        derivation_confidence: derivationConfidence,
        time_to_derive: derivationTimer,
        time_to_code: 0,
      });

      setDerivationUnlocked(true);
      setDerivationSaved(true);
      setDerivationActive(false);
      setActiveTab("editor");
      setToast({ message: "Derivation saved. Code editor unlocked.", type: "success" });
    } catch (err) {
      console.error("Failed to save derivation log:", err);
      setToast({ message: "Failed to save derivation log. Retry?", type: "error" });
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (loadingLog) {
    return (
      <div className="max-w-5xl mx-auto space-y-4 p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="animate-pulse bg-neutral-800/50 h-4 w-32 rounded-md" />
        </div>
        <div className="space-y-4">
          <div className="animate-pulse bg-neutral-800/50 h-24 w-full rounded-md" />
          <div className="animate-pulse bg-neutral-800/50 h-24 w-full rounded-md" />
          <div className="animate-pulse bg-neutral-800/50 h-16 w-full rounded-md" />
          <div className="flex gap-2">
            <div className="animate-pulse bg-neutral-800/50 h-8 flex-1 rounded-md" />
            <div className="animate-pulse bg-neutral-800/50 h-8 flex-1 rounded-md" />
          </div>
          <div className="animate-pulse bg-neutral-800/50 h-10 w-full rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <>
      <PauseAndRender
        isActive={derivationActive || codeTimerActive}
        onBreakStart={handleBreakStart}
        onBreakEnd={handleBreakEnd}
      />
      {/* Toast */}
      {toast && (
        <div className={`fixed top-24 right-6 z-[70] px-4 py-2.5 rounded-md border text-xs font-medium shadow-lg animate-pulse ${
          toast.type === "error"
            ? "bg-rose-950/90 border-rose-800 text-rose-300"
            : "bg-emerald-950/90 border-emerald-800 text-emerald-300"
        }`}>
          {toast.message}
        </div>
      )}

      <div className={`mx-auto space-y-4 ${focusMode ? "max-w-3xl" : "max-w-5xl"}`}>
        {!focusMode && <CCUWarning />}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {!focusMode && (
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Problem {problemIdx + 1} / {problems.length}</div>
          )}
          <h1 className={`font-bold tracking-tight ${focusMode ? "text-lg" : "text-2xl"}`}>{problem.name}</h1>
          {!focusMode && (
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded border font-medium ${
                problem.difficulty === "Easy" ? "bg-emerald-950/50 text-emerald-400 border-emerald-900" :
                problem.difficulty === "Medium" ? "bg-amber-950/50 text-amber-400 border-amber-900" :
                "bg-rose-950/50 text-rose-400 border-rose-900"
              }`}>
                {problem.difficulty}
              </span>
              <span className="text-xs text-zinc-500">LeetCode #{problem.number}</span>
              {pattern && (
                <span className="text-xs text-zinc-500">· {pattern.name}</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevProblem}
            disabled={problemIdx === 0}
            className="px-3 py-2 text-xs text-zinc-400 border border-neutral-800 rounded-md hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={nextProblem}
            disabled={problemIdx === problems.length - 1}
            className="px-3 py-2 text-xs text-zinc-400 border border-neutral-800 rounded-md hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Derivation Status Bar */}
      {!focusMode && !derivationUnlocked && (
        <div className="block-elevated p-4 bg-amber-950/20 border-amber-900/50">
          <div className="flex items-center gap-3">
            <Lock size={18} className="text-amber-400" />
            <div className="flex-1">
              <div className="text-sm font-medium text-amber-300">Code Editor Locked</div>
              <div className="text-xs text-amber-400/70">Complete the Derivation Log before writing code. This is mandatory per the protocol.</div>
            </div>
            <button
              onClick={() => setActiveTab("derivation")}
              className="px-4 py-2 bg-amber-500 text-black text-xs font-medium rounded-md hover:bg-amber-400 transition-colors"
            >
              Open Derivation Log
            </button>
          </div>
        </div>
      )}

      {!focusMode && derivationSaved && (
        <div className="block-elevated p-4 bg-emerald-950/20 border-emerald-900/50">
          <div className="flex items-center gap-3">
            <Unlock size={18} className="text-emerald-400" />
            <div>
              <div className="text-sm font-medium text-emerald-300">Derivation Log Complete</div>
              <div className="text-xs text-emerald-400/70">Code editor is unlocked. You may now implement the solution.</div>
            </div>
          </div>
        </div>
      )}

      {!focusMode && (
        <div className="flex sm:hidden gap-2 border-b border-neutral-800 pb-2">
          {(["description", "derivation", "editor", "tests"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                activeTab === tab ? "bg-white text-black border-white" : "border-neutral-800 text-zinc-400"
              }`}
            >
              {tab === "derivation" ? "Derive" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className={`grid gap-4 ${focusMode ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
        {/* Left: Problem Description + Derivation */}
        {!focusMode && (
        <div className={`space-y-4 ${activeTab !== "description" && activeTab !== "derivation" ? "hidden sm:block" : ""}`}>
          {/* Onion-Layer Reader */}
          {!onionComplete && (
            <OnionReader
              problem={problem}
              pattern={pattern}
              onComplete={() => setOnionComplete(true)}
            />
          )}

          {/* Problem Description — shown only after onion completes */}
          <div className={`block-elevated p-5 ${!onionComplete ? "hidden" : activeTab === "derivation" ? "hidden sm:block" : ""}`}>
            <div className="text-xs font-mono text-zinc-500 uppercase mb-3">Description</div>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{problem.description}</p>

            <div className="mt-5 space-y-4">
              {problem.examples.map((ex, i) => (
                <div key={i} className="p-3 bg-neutral-900/30 border border-neutral-800 rounded-md">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1.5">Example {i + 1}</div>
                  <div className="text-sm font-mono text-zinc-300 mb-1"><span className="text-zinc-500">Input:</span> {ex.input}</div>
                  <div className="text-sm font-mono text-zinc-300 mb-1"><span className="text-zinc-500">Output:</span> {ex.output}</div>
                  {ex.explanation && (
                    <div className="text-sm text-zinc-400">{ex.explanation}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5">
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Constraints</div>
              <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Derivation Log Form */}
          <div className={`block-elevated p-5 ${activeTab === "description" ? "hidden sm:block" : ""}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain size={16} className="text-zinc-400" />
                <span className="text-xs font-mono text-zinc-400 uppercase">Derivation Log</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-500">{formatTime(derivationTimer)}</span>
                {!derivationSaved && (
                  <button
                    onClick={() => setDerivationActive(!derivationActive)}
                    className={`px-2 py-0.5 text-[10px] rounded border transition-colors ${
                      derivationActive ? "bg-amber-950/50 text-amber-400 border-amber-900" : "border-neutral-700 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {derivationActive ? "Pause" : "Start"}
                  </button>
                )}
                {!derivationSaved && draftSavedAt && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-zinc-400 border border-neutral-700">Draft saved</span>
                )}
                {derivationSaved && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-900">Saved</span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {/* Core Derivation — required */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Why this pattern? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={structuralNecessity}
                  onChange={(e) => setStructuralNecessity(e.target.value)}
                  placeholder="Derive from first principles. What property of the problem makes this approach necessary?"
                  className="w-full p-3 bg-neutral-900/50 border border-neutral-800 rounded-md text-sm text-zinc-300 placeholder:text-zinc-600 resize-none focus:border-zinc-600 focus:outline-none"
                  rows={3}
                  disabled={derivationSaved}
                />
              </div>

              {/* Invariant — optional */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  What must stay true? (optional)
                </label>
                <textarea
                  value={invariantIdentification}
                  onChange={(e) => setInvariantIdentification(e.target.value)}
                  placeholder="The load-bearing wall. If this breaks, the algorithm collapses."
                  className="w-full p-3 bg-neutral-900/50 border border-neutral-800 rounded-md text-sm text-zinc-300 placeholder:text-zinc-600 resize-none focus:border-zinc-600 focus:outline-none"
                  rows={2}
                  disabled={derivationSaved}
                />
              </div>

              {/* Edge cases & rejected approaches — optional, combined */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Edge cases & rejected approaches (optional)
                </label>
                <textarea
                  value={failureModes}
                  onChange={(e) => setFailureModes(e.target.value)}
                  placeholder="When would this fail? What else did you consider and reject?"
                  className="w-full p-3 bg-neutral-900/50 border border-neutral-800 rounded-md text-sm text-zinc-300 placeholder:text-zinc-600 resize-none focus:border-zinc-600 focus:outline-none"
                  rows={2}
                  disabled={derivationSaved}
                />
              </div>

              {/* Compact Ratings */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-medium text-zinc-500 mb-1 uppercase">Clarity</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => !derivationSaved && setMentalClarity(n)}
                        className={`flex-1 h-7 rounded border text-[10px] font-medium transition-colors ${
                          mentalClarity === n
                            ? "bg-white text-black border-white"
                            : "border-neutral-800 text-zinc-500 hover:border-zinc-600"
                        }`}
                        disabled={derivationSaved}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-medium text-zinc-500 mb-1 uppercase">Confidence</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => !derivationSaved && setDerivationConfidence(n)}
                        className={`flex-1 h-7 rounded border text-[10px] font-medium transition-colors ${
                          derivationConfidence === n
                            ? "bg-white text-black border-white"
                            : "border-neutral-800 text-zinc-500 hover:border-zinc-600"
                        }`}
                        disabled={derivationSaved}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit */}
              {!derivationSaved && (
                <button
                  onClick={submitDerivation}
                  className="w-full py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText size={14} /> Submit Derivation & Unlock Code
                </button>
              )}
            </div>
          </div>
        </div>)}

        {/* Right: Code Editor + Tests */}
        <div className={`space-y-4 ${activeTab !== "editor" && activeTab !== "tests" ? "hidden sm:block" : ""}`}>
          {/* Editor */}
          <div className="block-elevated overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="text-xs text-zinc-400 font-mono">solution.js</span>
              </div>
              <div className="flex items-center gap-3">
                {codeTimerStarted && (
                  <span className="text-xs font-mono text-zinc-500">{formatTime(codeTimer)}</span>
                )}
                <button
                  onClick={() => setCode(problem.starterCode)}
                  className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="py-3 px-2 bg-neutral-950 border-r border-neutral-800 text-right select-none min-w-[40px]">
                {lineNumbers.map((n) => (
                  <div key={n} className="text-xs text-zinc-600 font-mono leading-6">{n}</div>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (!codeTimerStarted && derivationUnlocked) {
                    setCodeTimerStarted(true);
                    setCodeTimerActive(true);
                  }
                }}
                onKeyDown={handleTab}
                className="flex-1 p-3 bg-transparent text-zinc-300 font-mono text-sm resize-none outline-none leading-6 min-h-[320px]"
                spellCheck={false}
                disabled={!derivationUnlocked}
              />
            </div>
          </div>

          {/* Run & Solution */}
          <div className="flex items-center gap-3">
            <button
              onClick={runTests}
              disabled={!derivationUnlocked}
              className="flex-1 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Play size={16} /> Run Tests
            </button>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex-1 py-2.5 border border-neutral-800 text-zinc-400 text-sm rounded-md hover:border-zinc-600 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
              {showSolution ? "Hide Solution" : "Reveal Solution"}
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 text-[10px] text-zinc-600">
            <span>Ctrl+Enter to run</span>
            <span>·</span>
            <span>Ctrl+/ to toggle solution</span>
            <span>·</span>
            <span>Esc to hide</span>
          </div>

          {/* Stuck Emergency Protocol */}
          {!focusMode && derivationUnlocked && !allPassed && (
            <div className="border border-neutral-800 rounded-md overflow-hidden">
              {!stuckMode ? (
                <button
                  onClick={() => { setStuckMode(true); setStuckStep(0); setStuckTyped(""); }}
                  className="w-full py-2 text-xs text-zinc-500 hover:text-amber-400 hover:bg-amber-950/10 transition-colors flex items-center justify-center gap-2"
                >
                  <AlertTriangle size={12} /> Stuck? Emergency Protocol
                </button>
              ) : (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono text-amber-500 uppercase">Emergency Protocol</div>
                    <button
                      onClick={() => { setStuckMode(false); setStuckStep(0); }}
                      className="text-[10px] text-zinc-500 hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  {stuckStep === 0 && (
                    <>
                      <p className="text-xs text-zinc-400">
                        You are stuck. Do not jump to the solution. The protocol is:
                      </p>
                      <ol className="text-xs text-zinc-400 list-decimal list-inside space-y-1">
                        <li>Read the pattern trigger and template below.</li>
                        <li>Hide it and type the template from memory.</li>
                        <li>Only then you may view hints.</li>
                      </ol>
                      {pattern && (
                        <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-md">
                          <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Trigger</div>
                          <div className="text-xs text-zinc-300 mb-2">{pattern.trigger}</div>
                          <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Template</div>
                          <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap">{pattern.template}</pre>
                        </div>
                      )}
                      <button
                        onClick={() => setStuckStep(1)}
                        className="w-full py-2 bg-amber-500 text-black text-xs font-medium rounded-md hover:bg-amber-400 transition-colors"
                      >
                        Hide & Type From Memory
                      </button>
                    </>
                  )}

                  {stuckStep === 1 && (
                    <>
                      <p className="text-xs text-zinc-400">
                        The template is hidden. Type everything you remember. Do not peek.
                      </p>
                      <textarea
                        value={stuckTyped}
                        onChange={(e) => setStuckTyped(e.target.value)}
                        placeholder="// Type the pattern template from memory..."
                        className="w-full p-3 bg-neutral-900/50 border border-neutral-800 rounded-md text-xs font-mono text-zinc-300 placeholder:text-zinc-600 resize-none focus:border-zinc-600 focus:outline-none"
                        rows={6}
                      />
                      <button
                        onClick={() => setStuckStep(2)}
                        disabled={!stuckTyped.trim()}
                        className="w-full py-2 bg-white text-black text-xs font-medium rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        I Typed From Memory — Check & Reveal Hints
                      </button>
                    </>
                  )}

                  {stuckStep === 2 && pattern && (
                    <>
                      <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-md space-y-3">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">What You Typed</div>
                        <pre className="text-xs font-mono text-zinc-400 whitespace-pre-wrap">{stuckTyped || "(empty)"}</pre>
                        <div className="border-t border-neutral-800 pt-2">
                          <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Actual Template</div>
                          <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap">{pattern.template}</pre>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Compare line by line. What did you miss? Gaps reveal what has not yet compiled into procedural memory.
                      </p>
                      <button
                        onClick={() => { setShowSolution(true); setStuckMode(false); setStuckStep(0); }}
                        className="w-full py-2 border border-neutral-800 text-zinc-400 text-xs rounded-md hover:border-zinc-600 hover:text-white transition-colors"
                      >
                        Reveal Solution
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Test Results */}
          {(testResults.length > 0 || activeTab === "tests") && (
            <div className="block-elevated p-4">
              <button
                onClick={() => setShowTests(!showTests)}
                className="w-full flex items-center justify-between mb-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-500 uppercase">Test Results</span>
                  {allPassed && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-900">All Passed</span>}
                </div>
                {showTests ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
              </button>

              {showTests && (
                <div className="space-y-2">
                  {testResults.length === 0 ? (
                    <div className="text-xs text-zinc-500">Click "Run Tests" to verify your solution.</div>
                  ) : (
                    testResults.map((res, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-md border text-sm ${
                          res.passed
                            ? "bg-emerald-950/20 border-emerald-900/40"
                            : "bg-rose-950/20 border-rose-900/40"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {res.passed ? (
                            <Check size={14} className="text-emerald-400" />
                          ) : (
                            <AlertTriangle size={14} className="text-rose-400" />
                          )}
                          <span className={`text-xs font-medium ${res.passed ? "text-emerald-400" : "text-rose-400"}`}>
                            Test {i + 1}: {res.passed ? "Passed" : "Failed"}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500 font-mono">Input: {res.case.input}</div>
                        <div className="text-xs text-zinc-500 font-mono">Expected: {res.case.expected}</div>
                        {!res.passed && (
                          <div className="text-xs text-rose-400 font-mono mt-1">
                            {res.error ? `Error: ${res.error}` : `Got: ${JSON.stringify(res.actual)}`}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Solution Viewer */}
          {!focusMode && showSolution && (
            <div className="block-elevated overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
                <span className="text-xs text-zinc-400 font-mono">canonical.solution.js</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(problem.solution);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className={`flex items-center gap-1 text-xs transition-colors ${
                    copied ? "text-emerald-400" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-zinc-300 font-mono">{problem.solution}</code>
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Victory Overlay */}
      <VictoryOverlay
        show={showVictory}
        problemName={problem.name}
        timeToDerive={derivationTimer}
        timeToCode={codeTimer}
        mentalClarity={mentalClarity}
        derivationConfidence={derivationConfidence}
        onNext={() => {
          setShowVictory(false);
          nextProblem();
        }}
        onReview={() => {
          setShowVictory(false);
          setShowSolution(true);
        }}
        onDashboard={() => {
          setShowVictory(false);
          router.push("/");
        }}
      />
    </div>
    </>
  );
}
