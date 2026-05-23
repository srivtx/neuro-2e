"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { patterns } from "@/lib/patterns";
import { Keyboard, Check, RotateCcw, Timer, Zap } from "lucide-react";

const COLOR_MAP: Record<string, { text: string; border: string; bg: string }> = {
  emerald: { text: "text-emerald-400", border: "border-emerald-900", bg: "bg-emerald-950/30" },
  sky: { text: "text-sky-400", border: "border-sky-900", bg: "bg-sky-950/30" },
  violet: { text: "text-violet-400", border: "border-violet-900", bg: "bg-violet-950/30" },
  amber: { text: "text-amber-400", border: "border-amber-900", bg: "bg-amber-950/30" },
  rose: { text: "text-rose-400", border: "border-rose-900", bg: "bg-rose-950/30" },
  teal: { text: "text-teal-400", border: "border-teal-900", bg: "bg-teal-950/30" },
  fuchsia: { text: "text-fuchsia-400", border: "border-fuchsia-900", bg: "bg-fuchsia-950/30" },
  indigo: { text: "text-indigo-400", border: "border-indigo-900", bg: "bg-indigo-950/30" },
  lime: { text: "text-lime-400", border: "border-lime-900", bg: "bg-lime-950/30" },
  orange: { text: "text-orange-400", border: "border-orange-900", bg: "bg-orange-950/30" },
  cyan: { text: "text-cyan-400", border: "border-cyan-900", bg: "bg-cyan-950/30" },
  pink: { text: "text-pink-400", border: "border-pink-900", bg: "bg-pink-950/30" },
  yellow: { text: "text-yellow-400", border: "border-yellow-900", bg: "bg-yellow-950/30" },
  blue: { text: "text-blue-400", border: "border-blue-900", bg: "bg-blue-950/30" },
  green: { text: "text-green-400", border: "border-green-900", bg: "bg-green-950/30" },
  red: { text: "text-red-400", border: "border-red-900", bg: "bg-red-950/30" },
  purple: { text: "text-purple-400", border: "border-purple-900", bg: "bg-purple-950/30" },
  slate: { text: "text-slate-400", border: "border-slate-900", bg: "bg-slate-950/30" },
};

export default function WarmupPage() {
  const [selectedPatternIdx, setSelectedPatternIdx] = useState(0);
  const [mode, setMode] = useState<"select" | "type" | "result">("select");
  const [input, setInput] = useState("");
  const [round, setRound] = useState(1);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [results, setResults] = useState<{ round: number; time: number; accuracy: number }[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const pattern = patterns[selectedPatternIdx];
  const templateLines = pattern.template.trim().split("\n");
  const target = pattern.template.trim();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (mode === "type") {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode, startTime]);

  const startRound = useCallback(() => {
    setInput("");
    setMode("type");
    setStartTime(Date.now());
    setElapsed(0);
    setTimeout(() => textareaRef.current?.focus(), 100);
  }, []);

  const normalize = (s: string) =>
    s.replace(/\s+/g, " ").replace(/;\s/g, ";").trim();

  const checkAccuracy = () => {
    const a = normalize(input);
    const b = normalize(target);
    if (a === b) return 100;
    // Simple char-level accuracy
    let matches = 0;
    const maxLen = Math.max(a.length, b.length);
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] === b[i]) matches++;
    }
    return Math.round((matches / maxLen) * 100);
  };

  const submitRound = () => {
    const time = Math.floor((Date.now() - startTime) / 1000);
    const accuracy = checkAccuracy();
    setResults((prev) => [...prev, { round, time, accuracy }]);
    setMode("result");
  };

  const nextRound = () => {
    if (round < 3) {
      setRound(round + 1);
      startRound();
    } else {
      // Reset
      setRound(1);
      setResults([]);
      setMode("select");
    }
  };

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      setInput((prev) => prev.substring(0, start) + "  " + prev.substring(end));
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
      }, 0);
    }
  };

  const allComplete = results.length === 3;
  const avgAccuracy = allComplete
    ? Math.round(results.reduce((s, r) => s + r.accuracy, 0) / 3)
    : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Syntax Sandbox</h1>
        <p className="text-sm text-zinc-500 mt-1">Type pattern templates from memory. 3 rounds per pattern. Accuracy before speed.</p>
      </div>

      {/* Pattern selector */}
      {mode === "select" && (
        <div className="space-y-4">
          <div className="text-xs font-mono text-zinc-500 uppercase">Select Pattern</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {patterns.map((p, i) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPatternIdx(i);
                  setRound(1);
                  setResults([]);
                  startRound();
                }}
                className={`block-elevated p-4 text-left hover:border-zinc-600 transition-colors ${
                  selectedPatternIdx === i ? "border-zinc-500" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{p.name}</div>
                  {(() => {
                    const c = COLOR_MAP[p.color] ?? COLOR_MAP.slate;
                    return (
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${c.text} ${c.border} ${c.bg}`}>
                        {p.tag}
                      </span>
                    );
                  })()}
                </div>
                <div className="text-xs text-zinc-500 mt-1">{p.trigger}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Typing round */}
      {mode === "type" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{pattern.name}</div>
              <div className="text-xs text-zinc-500">Round {round} / 3</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Timer size={14} />
              {Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, "0")}
            </div>
          </div>

          <div className="block-elevated overflow-hidden">
            <div className="px-4 py-2 border-b border-neutral-800 bg-neutral-900/50 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">type from memory</span>
              <button
                onClick={() => {
                  setMode("select");
                  setResults([]);
                  setRound(1);
                }}
                className="text-xs text-zinc-500 hover:text-white flex items-center gap-1"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleTab}
              placeholder="Type the template from memory..."
              className="w-full p-4 bg-transparent text-zinc-300 font-mono text-sm resize-none outline-none leading-6 min-h-[200px]"
              spellCheck={false}
              rows={templateLines.length + 2}
            />
          </div>

          <button
            onClick={submitRound}
            className="w-full py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            <Check size={16} /> Submit Round {round}
          </button>
        </div>
      )}

      {/* Result */}
      {mode === "result" && results.length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-semibold">{pattern.name} — Round {results[results.length - 1].round} Result</div>

          <div className={`p-4 rounded-md border ${
            results[results.length - 1].accuracy === 100
              ? "bg-emerald-950/20 border-emerald-900"
              : "bg-amber-950/20 border-amber-900"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {results[results.length - 1].accuracy === 100 ? (
                <Check size={16} className="text-emerald-400" />
              ) : (
                <Zap size={16} className="text-amber-400" />
              )}
              <span className={`text-sm font-medium ${
                results[results.length - 1].accuracy === 100 ? "text-emerald-400" : "text-amber-400"
              }`}>
                {results[results.length - 1].accuracy}% Accuracy · {results[results.length - 1].time}s
              </span>
            </div>
            {results[results.length - 1].accuracy < 100 && (
              <div className="text-xs text-zinc-400 mt-2">
                <div className="text-zinc-500 mb-1">Target:</div>
                <pre className="text-xs text-zinc-300 font-mono bg-neutral-950/50 p-2 rounded">{target}</pre>
              </div>
            )}
          </div>

          {allComplete ? (
            <div className="space-y-4">
              <div className="block-elevated p-4 text-center">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Session Complete</div>
                <div className="text-2xl font-bold mt-1">{avgAccuracy}% Avg Accuracy</div>
                <div className="text-xs text-zinc-500 mt-1">{results.reduce((s, r) => s + r.time, 0)}s total</div>
              </div>
              <button
                onClick={nextRound}
                className="w-full py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors"
              >
                Choose Another Pattern
              </button>
            </div>
          ) : (
            <button
              onClick={nextRound}
              className="w-full py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              Next Round
            </button>
          )}
        </div>
      )}
    </div>
  );
}
