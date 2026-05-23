"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { patterns } from "@/lib/patterns";
import { CodeBlock } from "@/components/CodeBlock";
import { Play, RotateCcw, Zap, TrendingUp, Clock, AlertTriangle, Skull, ChevronRight, BatteryWarning, RefreshCw } from "lucide-react";
import { getPatternCycles, getTodayCCU, addCCU } from "@/lib/actions";
import { setPatternColor } from "@/lib/theme";
import { useAnimatedNumber } from "@/lib/hooks";
import { sounds } from "@/lib/sound";
import { useSession } from "@/components/SessionProvider";
import CCUWarning from "@/components/CCUWarning";

/* ─── Skeleton helpers ─── */
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-neutral-800/50 rounded-md ${className}`} />
  );
}

/* ─── Page ─── */
export default function DashboardPage() {
  const { active: msmwActive, elapsed: msmwTime, startMSMW, stopMSMW, hardMode } = useSession();
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [todayCCU, setTodayCCU] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHardConfirm, setShowHardConfirm] = useState(false);

  const pattern = patterns[currentPatternIndex];

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [cycles, ccu] = await Promise.all([
        getPatternCycles(pattern.id),
        getTodayCCU(),
      ]);
      setCycleCount(cycles);
      setTodayCCU(ccu);
    } catch (err) {
      setError("Could not reach your cognitive data. The system may be warming up.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPatternColor(pattern.color);
    loadData();
  }, [pattern.id]);

  const animatedCycles = useAnimatedNumber(cycleCount);
  const animatedCCU = useAnimatedNumber(todayCCU);

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

  const canStartMSMW = todayCCU + 60 <= 100;
  const ccuRemaining = 100 - todayCCU;

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    emerald: { bg: "bg-emerald-900/30", text: "text-emerald-400", border: "border-emerald-800/50" },
    sky: { bg: "bg-sky-900/30", text: "text-sky-400", border: "border-sky-800/50" },
    amber: { bg: "bg-amber-900/30", text: "text-amber-400", border: "border-amber-800/50" },
    rose: { bg: "bg-rose-900/30", text: "text-rose-400", border: "border-rose-800/50" },
    violet: { bg: "bg-violet-900/30", text: "text-violet-400", border: "border-violet-800/50" },
    cyan: { bg: "bg-cyan-900/30", text: "text-cyan-400", border: "border-cyan-800/50" },
    orange: { bg: "bg-orange-900/30", text: "text-orange-400", border: "border-orange-800/50" },
    pink: { bg: "bg-pink-900/30", text: "text-pink-400", border: "border-pink-800/50" },
    teal: { bg: "bg-teal-900/30", text: "text-teal-400", border: "border-teal-800/50" },
    indigo: { bg: "bg-indigo-900/30", text: "text-indigo-400", border: "border-indigo-800/50" },
    lime: { bg: "bg-lime-900/30", text: "text-lime-400", border: "border-lime-800/50" },
    fuchsia: { bg: "bg-fuchsia-900/30", text: "text-fuchsia-400", border: "border-fuchsia-800/50" },
    yellow: { bg: "bg-yellow-900/30", text: "text-yellow-400", border: "border-yellow-800/50" },
    slate: { bg: "bg-slate-900/30", text: "text-slate-400", border: "border-slate-800/50" },
    zinc: { bg: "bg-zinc-900/30", text: "text-zinc-400", border: "border-zinc-800/50" },
  };
  const pc = colorMap[pattern.color] || colorMap.zinc;

  /* ─── Emergency Mode ─── */
  if (emergencyMode) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center"
      >
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
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <CCUWarning />

      {/* === HERO: Mission Control === */}
      <div className="relative">
        <div
          className="absolute -inset-1 rounded-xl blur-2xl pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--pattern-accent) 8%, transparent), transparent 70%)`,
            opacity: 0.6,
          }}
        />
        <div className="block-elevated p-6 lg:p-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Pattern Identity */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-10 lg:h-14 w-3/4" />
                  <Skeleton className="h-4 w-full max-w-md" />
                  <div className="mt-4 w-full max-w-md space-y-1.5">
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${pc.bg} ${pc.text} ${pc.border} font-medium uppercase tracking-wider`}>
                      {pattern.tag}
                    </span>
                <span className="text-[10px] font-mono text-zinc-600">
                  {loading ? "..." : `${animatedCycles} / 100 cycles · ${cycleStage}`}
                </span>
                  </div>
                  <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-3 leading-none">{pattern.name}</h1>
                  <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">{pattern.trigger}</p>

                  <div className="mt-5 w-full max-w-md">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Pattern Mastery</span>
                      <span className="text-[10px] font-mono text-zinc-400">{cycleStage}</span>
                    </div>
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                  <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{
                      width: `${Math.min((cycleCount / 100) * 100, 100)}%`,
                      backgroundColor: "var(--pattern-accent)",
                    }}
                  />
                </div>
                  </div>
                </>
              )}
            </div>

            {/* Right: Action Panel */}
            <div className="flex flex-col gap-3 lg:min-w-[260px]">
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-full rounded-lg" />
                  <div className="flex gap-2">
                    <Skeleton className="flex-1 h-9 rounded-md" />
                    <Skeleton className="flex-1 h-9 rounded-md" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="flex-1 h-9 rounded-md" />
                    <Skeleton className="h-9 w-12 rounded-md" />
                  </div>
                </div>
              ) : error ? (
                <div className="p-4 border border-amber-900/40 bg-amber-950/20 rounded-lg space-y-3">
                  <div className="text-xs text-amber-300 font-medium">System warming up</div>
                  <p className="text-[11px] text-amber-400/70 leading-relaxed">{error}</p>
                  <button
                    onClick={loadData}
                    className="w-full py-2 text-xs font-medium rounded-md border border-amber-800 text-amber-400 hover:bg-amber-900/30 hover:border-amber-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={14} /> Retry
                  </button>
                </div>
              ) : !msmwActive ? (
                canStartMSMW ? (
                  <button
                    onClick={async () => {
                      await startMSMW(pattern.id);
                      setTodayCCU((c) => c + 60);
                      await addCCU("Started MSMW Session", 60);
                      setShowHardConfirm(false);
                    }}
                    className="w-full py-3.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/5 active:translate-y-0 active:shadow-none"
                  >
                    <Play size={16} fill="currentColor" /> Start Deep Work
                    <span className="text-[10px] font-normal opacity-60 ml-1">—60 CCU</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-800 bg-neutral-950/50">
                      <BatteryWarning size={18} className="text-amber-500 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-zinc-300 font-medium">Low on cognitive budget</div>
                        <div className="text-[10px] text-zinc-500">
                          You have {ccuRemaining} CCU. A session needs 60.
                        </div>
                      </div>
                    </div>

                    {!showHardConfirm ? (
                      <button
                        onClick={() => setShowHardConfirm(true)}
                        className="w-full py-3.5 text-sm font-semibold rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 border-rose-800/60 bg-rose-950/20 text-rose-300 hover:bg-rose-900/30 hover:border-rose-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-900/10 active:translate-y-0 active:shadow-none"
                      >
                        <Skull size={16} /> Hard Mode
                      </button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={async () => {
                            sounds.hardMode();
                            await startMSMW(pattern.id, true);
                            setTodayCCU((c) => c + 60);
                            await addCCU("Started MSMW Session (HARD MODE)", 60);
                            setShowHardConfirm(false);
                          }}
                          className="w-full py-3.5 text-sm font-semibold rounded-lg bg-rose-500 text-black transition-all duration-200 flex items-center justify-center gap-2 hover:bg-rose-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-500/10 active:translate-y-0 active:shadow-none"
                        >
                          <Skull size={16} /> Confirm — Start Hard Mode
                        </button>
                        <button
                          onClick={() => setShowHardConfirm(false)}
                          className="w-full py-2 text-[11px] text-zinc-500 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div className="space-y-3">
                  <div className="text-center py-2 relative">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hardMode ? "bg-rose-400" : "bg-emerald-400"}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${hardMode ? "bg-rose-500" : "bg-emerald-500"}`}></span>
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${hardMode ? "text-rose-400" : "text-emerald-400"}`}>
                        {hardMode ? "Hard Mode Active" : "Simulation Live"}
                      </span>
                    </div>
                    <div className="text-4xl font-mono font-bold tracking-tighter tabular-nums">{formatTime(msmwTime)}</div>
                  </div>
                  <button
                    onClick={async () => {
                      await stopMSMW();
                      setTodayCCU((c) => Math.max(0, c - 60));
                      setShowHardConfirm(false);
                    }}
                    className={`w-full py-3 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-white hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-none ${
                      hardMode
                        ? "bg-rose-900 hover:bg-rose-800 hover:shadow-rose-900/10"
                        : "bg-neutral-800 hover:bg-neutral-700 hover:shadow-black/20"
                    }`}
                  >
                    <RotateCcw size={16} /> Stop Session
                  </button>
                </div>
              )}

              {/* Quick Links */}
              {!loading && !error && (
                <div className="flex gap-2 pt-1">
                  <Link
                    href="/practice"
                    className="flex-1 py-2.5 text-[11px] text-center text-black bg-white font-semibold rounded-md hover:bg-zinc-200 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-1"
                  >
                    Code <ChevronRight size={12} />
                  </Link>
                  <Link
                    href="/daily"
                    className="flex-1 py-2.5 text-[11px] text-center text-zinc-400 border border-neutral-800 rounded-md hover:border-zinc-600 hover:text-white transition-all duration-200 flex items-center justify-center"
                  >
                    Daily
                  </Link>
                  <button
                    onClick={() => setEmergencyMode(true)}
                    className="px-3 py-2.5 text-amber-400 border border-amber-900 rounded-md hover:bg-amber-950/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                    title="Word-Blur Emergency"
                  >
                    <AlertTriangle size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Pattern Details */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-9 w-full" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>
            </div>
          ) : (
            <>
              <CodeBlock code={pattern.template} filename={`${pattern.id}.template.js`} />

              <button
                onClick={() => setShowInfo(!showInfo)}
                className="w-full py-2 text-xs text-zinc-500 border border-neutral-800 rounded-md hover:border-zinc-600 hover:text-white transition-colors"
              >
                {showInfo ? "Hide" : "Show"} Trigger & Invariant
              </button>

              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="block-square p-4 space-y-3">
                      <div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Trigger</div>
                        <p className="text-sm text-zinc-300">{pattern.trigger}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Invariant</div>
                        <p className="text-sm text-zinc-300">{pattern.invariant}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Complexity</div>
                        <p className="text-sm text-zinc-300 font-mono">{pattern.complexity}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={14} className="text-zinc-500" />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Architecture Set</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pattern.problems.map((p, i) => (
                    <div
                      key={i}
                      className="block p-3 bg-neutral-950 border border-neutral-800 rounded-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">{p.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                          p.difficulty === "Easy" ? "bg-emerald-950/50 text-emerald-400 border-emerald-900" :
                          p.difficulty === "Medium" ? "bg-amber-950/50 text-amber-400 border-amber-900" :
                          "bg-rose-950/50 text-rose-400 border-rose-900"
                        }`}>{p.difficulty}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 truncate">{p.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-4">
          {msmwActive && (
            <div className="block-elevated p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} className="text-zinc-400" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Session Timer</span>
              </div>
              <div className="text-2xl font-mono font-bold tracking-tight">{formatTime(msmwTime)}</div>
              {msmwTime > 0 && msmwTime % 1200 === 0 && (
                <div className="mt-3 p-2.5 bg-amber-950/50 border border-amber-900 rounded-md text-[11px] text-amber-300">
                  <span className="font-semibold">Pause & Render</span> — 20 min elapsed. Close eyes. Render the structure.
                </div>
              )}
            </div>
          )}

          {loading ? (
            <div className="space-y-4">
              <div className="block-square p-4 space-y-3">
                <Skeleton className="h-3 w-32" />
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-10" />
                  ))}
                </div>
              </div>
              <div className="block-square p-4 space-y-3">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ) : (
            <>
              <div className="block-square p-4">
                <div className="text-[10px] font-mono text-zinc-500 uppercase mb-3">Pattern Navigator</div>
                <div className="flex flex-wrap gap-1.5">
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

              <div className="block-square p-4 space-y-3">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Today&apos;s Stats</div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">CCU Spent</span>
                  <span className="font-mono text-white">{animatedCCU} / 100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Pattern Stage</span>
                  <span className="font-mono text-white">{cycleStage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Cycles</span>
                  <span className="font-mono text-white">{animatedCycles}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
