"use client";

import { useState, useEffect } from "react";

interface DayRecord {
  date: string; // YYYY-MM-DD
  completed: boolean;
}

function getLast7Days(): DayRecord[] {
  const days: DayRecord[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().split("T")[0];
    days.push({ date: iso, completed: false });
  }
  return days;
}

function loadStreak(): DayRecord[] {
  try {
    const saved = localStorage.getItem("neuro-os-streak");
    if (saved) {
      const parsed = JSON.parse(saved) as DayRecord[];
      const last7 = getLast7Days();
      // Merge saved data into the last 7 days template
      return last7.map((day) => {
        const match = parsed.find((p) => p.date === day.date);
        return match || day;
      });
    }
  } catch {
    // ignore
  }
  return getLast7Days();
}

export function saveStreakDate(dateStr?: string) {
  try {
    const iso = dateStr || new Date().toISOString().split("T")[0];
    const current = loadStreak();
    const idx = current.findIndex((d) => d.date === iso);
    if (idx >= 0) {
      current[idx].completed = true;
    } else {
      current.push({ date: iso, completed: true });
      // Keep only last 30 days
      while (current.length > 30) current.shift();
    }
    localStorage.setItem("neuro-os-streak", JSON.stringify(current));
  } catch {
    // ignore
  }
}

export default function StreakHeatmap() {
  const [days, setDays] = useState<DayRecord[]>([]);

  useEffect(() => {
    setDays(loadStreak());
  }, []);

  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const streakCount = days.filter((d) => d.completed).length;

  return (
    <div className="block-square p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-mono text-zinc-500 uppercase">Consistency</div>
        <div className="text-[10px] font-mono text-zinc-400">{streakCount} / 7</div>
      </div>
      <div className="flex items-center gap-1.5">
        {days.map((day, i) => (
          <div key={day.date} className="flex flex-col items-center gap-1">
            <div
              className={`w-4 h-4 rounded-sm transition-all duration-300 ${
                day.completed
                  ? "bg-emerald-500/80 shadow-[0_0_6px_rgba(34,197,94,0.3)]"
                  : "bg-neutral-800"
              }`}
              title={day.date}
            />
            <span className="text-[8px] text-zinc-600 font-mono">{dayLabels[i]}</span>
          </div>
        ))}
      </div>
      {streakCount === 7 && (
        <div className="mt-2 text-[10px] text-emerald-400 font-medium">Perfect week. Your procedural memory is compiling.</div>
      )}
      {streakCount === 0 && (
        <div className="mt-2 text-[10px] text-zinc-500">Start an MSMW to build your streak.</div>
      )}
    </div>
  );
}
