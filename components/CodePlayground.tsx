"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { problems, Problem, TestCase } from "@/lib/problems";
import { patterns } from "@/lib/patterns";
import { markProblemSolved } from "@/lib/actions";
import { Play, RotateCcw, Check, Circle, AlertTriangle, ChevronDown, ChevronUp, Copy, Eye, EyeOff } from "lucide-react";

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
}

export default function CodePlayground({ initialProblemId }: CodePlaygroundProps) {
  const initialIdx = initialProblemId ? problems.findIndex((p) => p.id === initialProblemId) : 0;
  const [problemIdx, setProblemIdx] = useState(Math.max(initialIdx, 0));
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState<{ case: TestCase; passed: boolean; actual: any; error?: string }[]>([]);
  const [derivationDone, setDerivationDone] = useState(false);
  const [mentalDone, setMentalDone] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showTests, setShowTests] = useState(true);
  const [activeTab, setActiveTab] = useState<"description" | "editor" | "tests">("description");
  const [lineNumbers, setLineNumbers] = useState<string[]>(["1"]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const problem = problems[problemIdx];
  const pattern = patterns.find((p) => p.id === problem.patternId);

  // Initialize code from starter
  useEffect(() => {
    setCode(problem.starterCode);
    setTestResults([]);
    setShowSolution(false);
    setDerivationDone(false);
    setMentalDone(false);
    setActiveTab("description");
  }, [problemIdx]);

  // Update line numbers
  useEffect(() => {
    const lines = code.split("\n").length;
    setLineNumbers(Array.from({ length: Math.max(lines, 1) }, (_, i) => String(i + 1)));
  }, [code]);

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

    for (const tc of problem.testCases) {
      try {
        // Create an isolated evaluation context
        const userCode = code;
        // We need to extract the function and run it
        // Strategy: wrap in a function that returns the user's function
        const wrapper = new Function(`
          ${userCode}
          // Try to detect the function name from common patterns
          var fn = typeof twoSum === 'function' ? twoSum :
                   typeof containsDuplicate === 'function' ? containsDuplicate :
                   typeof maxArea === 'function' ? maxArea :
                   typeof lengthOfLongestSubstring === 'function' ? lengthOfLongestSubstring :
                   typeof isValid === 'function' ? isValid :
                   typeof search === 'function' ? search :
                   typeof reverseList === 'function' ? reverseList :
                   typeof maxDepth === 'function' ? maxDepth :
                   typeof climbStairs === 'function' ? climbStairs :
                   typeof rob === 'function' ? rob :
                   typeof uniquePaths === 'function' ? uniquePaths :
                   typeof singleNumber === 'function' ? singleNumber :
                   typeof subsets === 'function' ? subsets :
                   typeof merge === 'function' ? merge :
                   null;
          return fn;
        `);

        const fn = wrapper();

        if (!fn || typeof fn !== "function") {
          results.push({ case: tc, passed: false, actual: null, error: "Could not find your function. Make sure you didn't rename it." });
          continue;
        }

        const actual = fn(...tc.args);
        const passed = valueEqual(actual, tc.expectedValue);
        results.push({ case: tc, passed, actual });
      } catch (err: any) {
        results.push({ case: tc, passed: false, actual: null, error: err.message || "Runtime error" });
      }
    }

    setTestResults(results);
    setShowTests(true);
    setActiveTab("tests");
  }, [code, problem]);

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

  const allPassed = testResults.length > 0 && testResults.every((r) => r.passed);

  // Save to DB when all tests pass
  useEffect(() => {
    if (allPassed && problem) {
      markProblemSolved(problem.id, problem.patternId, problem.name, problem.number, problem.difficulty);
    }
  }, [allPassed]);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Problem {problemIdx + 1} / {problems.length}</div>
          <h1 className="text-2xl font-bold tracking-tight">{problem.name}</h1>
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

      {/* Mobile Tabs */}
      <div className="flex sm:hidden gap-2 border-b border-neutral-800 pb-2">
        {(["description", "editor", "tests"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
              activeTab === tab ? "bg-white text-black border-white" : "border-neutral-800 text-zinc-400"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Problem Description */}
        <div className={`space-y-4 ${activeTab !== "description" ? "hidden sm:block" : ""}`}>
          <div className="block-elevated p-5">
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

          {/* 3-Step Workflow */}
          <div className="block-elevated p-5 space-y-3">
            <div className="text-xs font-mono text-zinc-500 uppercase mb-1">Derivation Protocol</div>
            <button
              onClick={() => setDerivationDone(!derivationDone)}
              className={`w-full flex items-center gap-3 p-3 rounded-md border transition-colors text-left ${
                derivationDone ? "bg-emerald-950/20 border-emerald-900/50" : "bg-neutral-900/30 border-neutral-800 hover:border-zinc-600"
              }`}
            >
              {derivationDone ? <Check size={16} className="text-emerald-400" /> : <Circle size={16} className="text-zinc-600" />}
              <div className="flex-1">
                <div className="text-sm font-medium">1. Derive Before Code</div>
                <div className="text-xs text-zinc-500">Why must {pattern?.name || "this pattern"} be used? What is the invariant?</div>
              </div>
            </button>

            <button
              onClick={() => setMentalDone(!mentalDone)}
              className={`w-full flex items-center gap-3 p-3 rounded-md border transition-colors text-left ${
                mentalDone ? "bg-emerald-950/20 border-emerald-900/50" : "bg-neutral-900/30 border-neutral-800 hover:border-zinc-600"
              }`}
            >
              {mentalDone ? <Check size={16} className="text-emerald-400" /> : <Circle size={16} className="text-zinc-600" />}
              <div className="flex-1">
                <div className="text-sm font-medium">2. Mental Image Check</div>
                <div className="text-xs text-zinc-500">Close eyes. Can you trace the algorithm without code?</div>
              </div>
            </button>
          </div>
        </div>

        {/* Right: Code Editor + Tests */}
        <div className={`space-y-4 ${activeTab !== "editor" && activeTab !== "tests" ? "hidden sm:block" : ""}`}>
          {/* Editor */}
          <div className="block-elevated overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="text-xs text-zinc-400 font-mono">solution.js</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCode(problem.starterCode)}
                  className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
            </div>
            <div className="flex">
              {/* Line Numbers */}
              <div className="py-3 px-2 bg-neutral-950 border-r border-neutral-800 text-right select-none min-w-[40px]">
                {lineNumbers.map((n) => (
                  <div key={n} className="text-xs text-zinc-600 font-mono leading-6">{n}</div>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleTab}
                className="flex-1 p-3 bg-transparent text-zinc-300 font-mono text-sm resize-none outline-none leading-6 min-h-[320px]"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Run & Solution */}
          <div className="flex items-center gap-3">
            <button
              onClick={runTests}
              className="flex-1 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
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
          {showSolution && (
            <div className="block-elevated overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
                <span className="text-xs text-zinc-400 font-mono">canonical.solution.js</span>
                <button
                  onClick={() => navigator.clipboard.writeText(problem.solution)}
                  className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  <Copy size={12} /> Copy
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-zinc-300 font-mono">{problem.solution}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
