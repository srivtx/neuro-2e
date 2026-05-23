"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getReviewQueue, getUpcomingReviews, getReviewStats } from "@/lib/actions";
import { RotateCcw, Calendar, ChevronRight, Brain } from "lucide-react";

export default function ReviewPage() {
  const [dueProblems, setDueProblems] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [stats, setStats] = useState({ dueToday: 0, upcoming: 0, totalScheduled: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [due, up, st] = await Promise.all([
        getReviewQueue(),
        getUpcomingReviews(),
        getReviewStats(),
      ]);
      setDueProblems(due);
      setUpcoming(up);
      setStats(st);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="text-xs text-zinc-500">Loading review queue...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Review Queue</h1>
        <p className="text-sm text-zinc-500 mt-1">Spaced repetition for algorithmic patterns. Review problems before they decay.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="block-elevated p-4">
          <div className="text-[10px] font-mono text-zinc-500 uppercase">Due Today</div>
          <div className="text-2xl font-bold mt-1">{stats.dueToday}</div>
        </div>
        <div className="block-elevated p-4">
          <div className="text-[10px] font-mono text-zinc-500 uppercase">Upcoming</div>
          <div className="text-2xl font-bold mt-1">{stats.upcoming}</div>
        </div>
        <div className="block-elevated p-4">
          <div className="text-[10px] font-mono text-zinc-500 uppercase">Total Scheduled</div>
          <div className="text-2xl font-bold mt-1">{stats.totalScheduled}</div>
        </div>
      </div>

      {/* Due Today */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <RotateCcw size={16} className="text-zinc-400" />
          <h2 className="text-sm font-semibold">Due for Review</h2>
          {dueProblems.length > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/50 text-amber-400 border border-amber-900">{dueProblems.length} problems</span>
          )}
        </div>

        {dueProblems.length === 0 ? (
          <div className="block-elevated p-6 text-center">
            <Brain size={24} className="text-zinc-600 mx-auto mb-2" />
            <div className="text-sm text-zinc-400">No reviews due today.</div>
            <div className="text-xs text-zinc-600 mt-1">Solve problems to build your review queue.</div>
          </div>
        ) : (
          <div className="space-y-2">
            {dueProblems.map((p) => (
              <Link
                key={p.problem_id}
                href={`/practice?problem=${p.problem_id}`}
                className="block-elevated p-4 flex items-center justify-between hover:border-zinc-600 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    p.difficulty === "Easy" ? "bg-emerald-400" :
                    p.difficulty === "Medium" ? "bg-amber-400" :
                    "bg-rose-400"
                  }`} />
                  <div>
                    <div className="text-sm font-medium group-hover:text-white transition-colors">{p.name}</div>
                    <div className="text-xs text-zinc-500">LeetCode #{p.number} · Rep {p.repetitions} · Interval {p.interval_days}d</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-zinc-400" />
            <h2 className="text-sm font-semibold">Upcoming Reviews</h2>
          </div>
          <div className="space-y-2">
            {upcoming.slice(0, 10).map((p) => (
              <div key={p.problem_id} className="block-elevated p-4 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-3">
                  <div className="text-xs text-zinc-500">{p.next_review_date}</div>
                  <div className="text-sm">{p.name}</div>
                </div>
                <div className="text-xs text-zinc-500">{p.interval_days}d interval</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
