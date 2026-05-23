"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fullRoadmap } from "@/lib/roadmap";
import { patterns } from "@/lib/patterns";
import { getPatternCycles, getSolvedCountByPattern } from "@/lib/actions";
import { Check, ChevronDown, ChevronUp, Target, TrendingUp, BookOpen } from "lucide-react";

interface PatternStats {
  cycles: number;
  solved: number;
}

export default function RoadmapPage() {
  const [openWeek, setOpenWeek] = useState<number | null>(1);
  const [activePhase, setActivePhase] = useState<1 | 2>(1);
  const [patternStats, setPatternStats] = useState<Record<string, PatternStats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const stats: Record<string, PatternStats> = {};
      for (const p of patterns) {
        const [cycles, solved] = await Promise.all([
          getPatternCycles(p.id),
          getSolvedCountByPattern(p.id),
        ]);
        stats[p.id] = { cycles, solved };
      }
      setPatternStats(stats);
      setLoading(false);
    }
    load();
  }, []);

  const phase1Weeks = fullRoadmap.filter((w) => w.week <= 8);
  const phase2Weeks = fullRoadmap.filter((w) => w.week > 8);
  const displayedWeeks = activePhase === 1 ? phase1Weeks : phase2Weeks;

  const getStage = (cycles: number) => {
    if (cycles < 5) return { label: "Discovery", color: "text-zinc-500" };
    if (cycles < 15) return { label: "Structuring", color: "text-sky-400" };
    if (cycles < 30) return { label: "Compiling", color: "text-violet-400" };
    if (cycles < 50) return { label: "Associating", color: "text-amber-400" };
    if (cycles < 75) return { label: "Consolidating", color: "text-emerald-400" };
    if (cycles < 100) return { label: "Snapping", color: "text-rose-400" };
    return { label: "Mastery", color: "text-white" };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
            {activePhase === 1 ? "Phase 1: Foundation" : "Phase 2: Advanced"}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{activePhase === 1 ? "8-Week Roadmap" : "8-Week Roadmap"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActivePhase(1); setOpenWeek(1); }}
            className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
              activePhase === 1 ? "bg-white text-black border-white" : "border-neutral-800 text-zinc-400 hover:text-white"
            }`}
          >
            Phase 1 (Weeks 1-8)
          </button>
          <button
            onClick={() => { setActivePhase(2); setOpenWeek(9); }}
            className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
              activePhase === 2 ? "bg-white text-black border-white" : "border-neutral-800 text-zinc-400 hover:text-white"
            }`}
          >
            Phase 2 (Weeks 9-16)
          </button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="block-elevated p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-zinc-400" />
          <span className="text-xs font-mono text-zinc-400 uppercase">Pattern Progress</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {patterns.map((p) => {
            const stats = patternStats[p.id] ?? { cycles: 0, solved: 0 };
            const stage = getStage(stats.cycles);
            return (
              <div key={p.id} className="block-square p-3">
                <div className="text-xs font-medium text-zinc-300">{p.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-[10px] ${stage.color}`}>{stage.label}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-zinc-600">{stats.solved} solved</span>
                  <span className="text-[10px] text-zinc-600">{stats.cycles}/100 cycles</span>
                </div>
                <div className="w-full h-1 bg-neutral-900 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-white transition-all" style={{ width: `${Math.min((stats.cycles / 100) * 100, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weeks */}
      <div className="space-y-3">
        {displayedWeeks.map((week) => {
          const isOpen = openWeek === week.week;
          const stats = patternStats[week.patternId] ?? { cycles: 0, solved: 0 };
          const stage = getStage(stats.cycles);
          const isReview = week.patternId === "review";

          return (
            <div
              key={week.week}
              className={`block-square overflow-hidden transition-colors ${isOpen ? "border-zinc-600" : ""}`}
            >
              <button
                onClick={() => setOpenWeek(isOpen ? null : week.week)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-900/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-[10px] font-bold ${
                    stats.cycles >= 100 ? "bg-emerald-900/50 text-emerald-400 border border-emerald-900" :
                    stats.cycles >= 50 ? "bg-amber-900/50 text-amber-400 border border-amber-900" :
                    "bg-neutral-800 text-zinc-400 border border-neutral-700"
                  }`}>
                    {stats.cycles >= 100 ? <Check size={14} /> : week.week}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{week.patternName}</div>
                    <div className="text-xs text-zinc-500">
                      {week.newProblems > 0 ? `${week.newProblems} new` : "Review week"} 
                      {week.reviewProblems > 0 && ` + ${week.reviewProblems} review`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isReview && (
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${stage.color} border-current opacity-50`}>
                      {stage.label}
                    </span>
                  )}
                  {isOpen ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-neutral-800 p-4 space-y-4">
                  {/* Objective */}
                  <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-md">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Objective</div>
                    <div className="text-sm text-zinc-300">{week.objective}</div>
                  </div>

                  {/* Structural Necessity */}
                  <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-md">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Why This Pattern</div>
                    <div className="text-sm text-zinc-400">{week.structuralNecessity}</div>
                  </div>

                  {/* Problems */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target size={14} className="text-zinc-500" />
                      <span className="text-xs font-mono text-zinc-500 uppercase">Problems</span>
                    </div>
                    <div className="space-y-2">
                      {week.problems.map((problem, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 border border-neutral-800 rounded-md bg-neutral-900/30 hover:border-zinc-600 transition-colors">
                          <div className="mt-0.5">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${
                              problem.difficulty === "Easy" ? "bg-emerald-950/50 text-emerald-400 border-emerald-900" :
                              problem.difficulty === "Medium" ? "bg-amber-950/50 text-amber-400 border-amber-900" :
                              "bg-rose-950/50 text-rose-400 border-rose-900"
                            }`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {problem.number ? `${problem.number}. ` : ""}{problem.name}
                            </div>
                            <div className="text-xs text-zinc-500 mt-0.5">{problem.insight}</div>
                            <div className="text-[10px] text-zinc-600 mt-1">{problem.day}</div>
                          </div>
                          {problem.number && (
                            <Link
                              href={`/practice?problem=${problem.name.toLowerCase().replace(/\s+/g, "-")}`}
                              className="text-[10px] text-zinc-500 hover:text-white border border-neutral-800 hover:border-zinc-600 px-2 py-1 rounded transition-colors"
                            >
                              Practice
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={14} className="text-zinc-500" />
                      <span className="text-xs font-mono text-zinc-500 uppercase">Deliverables</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1">
                      {week.deliverables.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
