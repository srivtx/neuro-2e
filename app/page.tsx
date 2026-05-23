"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { patterns } from "@/lib/patterns";
import { CodeBlock } from "@/components/CodeBlock";
import { Play, RotateCcw, Zap, CheckCircle, TrendingUp, Clock, AlertTriangle } from "lucide-react";

// 2e-optimized design: 
// - One mission at a time (no decision fatigue)
// - Code first (bottom-up)
// - Visual state tracking (external RAM)
// - Built-in pause/render cycle

export default function DashboardPage() {
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(12);
  const [msmwActive, setMsmwActive] = useState(false);
  const [msmwTime, setMsmwTime] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true); // Onion layer: skeleton first
  const [showFlesh, setShowFlesh] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const pattern = patterns[currentPatternIndex];

  // MSMW Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (msmwActive) {
      interval = setInterval(() => {
        setMsmwTime((t) => {
          if (t >= 7200) { // 120 min max
            setMsmwActive(false);
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [msmwActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const cycleStage =
    cycleCount < 5 ? "Discovery" :
    cycleCount < 15 ? "Structuring" :
    cycleCount < 30 ? "Compiling" :
    cycleCount < 50 ? "Associating" :
    cycleCount < 75 ? "Consolidating" :
    cycleCount < 100 ? "Snapping" : "Mastery";

  if (emergencyMode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <AlertTriangle size={48} className="text-amber-500" />
        <h1 className="text-2xl font-bold">Word-Blur Detected</h1>
        <p className="text-zinc-400 max-w-md">
          Your input port is saturated. Do not push through.
          Execute the recovery protocol.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
          <button onClick={() => setEmergencyMode(false)} className="block-square p-4 hover:border-white transition-colors text-left">
            <div className="text-xs text-zinc-500 mb-1">Step 1</div>
            <div className="font-medium">Hard Stop</div>
            <div className="text-xs text-zinc-400 mt-1">Close the problem immediately</div>
          </button>
          <div className="block-square p-4">
            <div className="text-xs text-zinc-500 mb-1">Step 2</div>
            <div className="font-medium">State Dump</div>
            <div className="text-xs text-zinc-400 mt-1">Write everything you currently hold</div>
          </div>
          <div className="block-square p-4">
            <div className="text-xs text-zinc-500 mb-1">Step 3</div>
            <div className="font-medium">Metabolic Reset</div>
            <div className="text-xs text-zinc-400 mt-1">5 min walk, no screens</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header: Today's Mission */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Today's Pattern</div>
          <h1 className="text-3xl font-bold tracking-tight">{pattern.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded bg-${pattern.color}-900/30 text-${pattern.color}-400 border border-${pattern.color}-800/50`}>
              {pattern.tag}
            </span>
            <span className="text-xs text-zinc-500">{cycleCount} / 100 cycles</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEmergencyMode(true)}
            className="px-3 py-2 text-xs font-medium bg-amber-950/50 border border-amber-900 text-amber-400 rounded-md hover:bg-amber-900/50 transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle size={14} /> Word-Blur
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="block-square p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-400">Pattern Snap Progress</span>
          <span className="text-xs font-mono text-zinc-300">{cycleStage}</span>
        </div>
        <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${Math.min((cycleCount / 100) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Pattern Code (Code First - Bottom Up) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-zinc-400" />
            <span className="text-xs font-mono text-zinc-400 uppercase">Template</span>
          </div>

          <CodeBlock code={pattern.template} filename={`${pattern.id}.template.js`} />

          {/* Onion Layer Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => { setShowSkeleton(true); setShowFlesh(false); }}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                showSkeleton && !showFlesh ? "bg-white text-black border-white" : "border-neutral-800 text-zinc-400 hover:text-white"
              }`}
            >
              Skeleton
            </button>
            <button
              onClick={() => setShowFlesh(true)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                showFlesh ? "bg-white text-black border-white" : "border-neutral-800 text-zinc-400 hover:text-white"
              }`}
            >
              Logic & Flesh
            </button>
          </div>

          {showSkeleton && !showFlesh && (
            <div className="block-square p-4 space-y-3">
              <div className="text-xs font-mono text-zinc-500 uppercase">Trigger</div>
              <p className="text-sm text-zinc-300">{pattern.trigger}</p>
              <div className="text-xs font-mono text-zinc-500 uppercase mt-4">Invariant</div>
              <p className="text-sm text-zinc-300">{pattern.invariant}</p>
            </div>
          )}

          {showFlesh && (
            <div className="block-square p-4 space-y-3">
              <div className="text-xs font-mono text-zinc-500 uppercase">Complexity</div>
              <p className="text-sm text-zinc-300 font-mono">{pattern.complexity}</p>
              <div className="text-xs font-mono text-zinc-500 uppercase mt-4">Why This Works</div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {pattern.problems[0]?.why}
              </p>
            </div>
          )}

          {/* Problems to Solve Today */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-zinc-400" />
              <span className="text-xs font-mono text-zinc-400 uppercase">Architecture Set (Derive First)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pattern.problems.map((p, i) => (
                <div key={i} className="block-square p-4 hover:border-zinc-600 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{p.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                      p.difficulty === "Easy" ? "bg-emerald-950/50 text-emerald-400 border-emerald-900" :
                      p.difficulty === "Medium" ? "bg-amber-950/50 text-amber-400 border-amber-900" :
                      "bg-rose-950/50 text-rose-400 border-rose-900"
                    }`}>{p.difficulty}</span>
                  </div>
                  <p className="text-xs text-zinc-500">{p.why}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: MSMW Control Panel */}
        <div className="space-y-4">
          <div className="block-elevated p-5 sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-zinc-400" />
              <span className="text-xs font-mono text-zinc-400 uppercase">MSMW Control</span>
            </div>

            <div className="text-center py-6">
              <div className="text-4xl font-mono font-bold tracking-tight">{formatTime(msmwTime)}</div>
              <div className="text-xs text-zinc-500 mt-1">{msmwActive ? "SIMULATION LIVE" : "STANDBY"}</div>
            </div>

            <div className="flex gap-2 mb-4">
              {!msmwActive ? (
                <button
                  onClick={() => setMsmwActive(true)}
                  className="flex-1 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Play size={16} /> Start Deep Work
                </button>
              ) : (
                <button
                  onClick={() => setMsmwActive(false)}
                  className="flex-1 py-2.5 bg-neutral-800 text-white text-sm font-medium rounded-md hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} /> Stop / Reset
                </button>
              )}
            </div>

            {/* Pause & Render Reminder */}
            {msmwActive && msmwTime > 0 && msmwTime % 1200 === 0 && (
              <div className="mb-4 p-3 bg-amber-950/50 border border-amber-900 rounded-md text-xs text-amber-300">
                <div className="font-semibold mb-1">Pause & Render (20 min elapsed)</div>
                Close eyes. Render the current problem structure. Do not proceed until the image is clear.
              </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-2 pt-4 border-t border-neutral-800">
              <Link href="/practice" className="block w-full py-2.5 text-xs text-center text-black bg-white font-medium rounded-md hover:bg-zinc-200 transition-colors">
                Start Coding →
              </Link>
              <Link href="/daily" className="block w-full py-2 text-xs text-center text-zinc-400 hover:text-white border border-neutral-800 rounded-md hover:border-zinc-600 transition-colors">
                Daily Checklist
              </Link>
            </div>
          </div>

          {/* Pattern Switcher (minimized to reduce context switching) */}
          <div className="block-square p-4">
            <div className="text-xs font-mono text-zinc-500 uppercase mb-3">Pattern Navigator</div>
            <div className="flex flex-wrap gap-2">
              {patterns.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentPatternIndex(i)}
                  className={`px-2 py-1 text-[10px] rounded border transition-colors ${
                    i === currentPatternIndex
                      ? "bg-white text-black border-white"
                      : "border-neutral-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  {p.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
