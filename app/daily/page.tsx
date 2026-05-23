"use client";

import { useState } from "react";
import { Check, Clock, Moon, Sun, Coffee, Brain, AlertTriangle } from "lucide-react";

interface CheckItem {
  id: string;
  label: string;
  category: "pre" | "msmw" | "post" | "metabolic";
}

const checklistItems: CheckItem[] = [
  { id: "p1", label: "No meetings for next 120 minutes", category: "pre" },
  { id: "p2", label: "Phone in another room, DND on", category: "pre" },
  { id: "p3", label: "All notifications disabled", category: "pre" },
  { id: "p4", label: "Noise-canceling + brown noise ready", category: "pre" },
  { id: "p5", label: "Workspace is clear (Sensory Faraday Cage)", category: "pre" },
  { id: "p6", label: "Pre-MSMW meal consumed 30-45 min ago", category: "pre" },
  { id: "p7", label: "Single architectural objective written down", category: "pre" },
  { id: "m1", label: "Syntax Sandbox warm-up (3 template passes)", category: "msmw" },
  { id: "m2", label: "Onion-Layer read: Skeleton → Trigger → Flesh", category: "msmw" },
  { id: "m3", label: "Pause-and-Render at 20 min mark", category: "msmw" },
  { id: "m4", label: "Pause-and-Render at 40 min mark", category: "msmw" },
  { id: "m5", label: "Pause-and-Render at 60 min mark", category: "msmw" },
  { id: "m6", label: "Derivation log written for each problem", category: "msmw" },
  { id: "po1", label: "No context switching for 45-60 minutes", category: "post" },
  { id: "po2", label: "No screens (walk, stretch, or lie down)", category: "post" },
  { id: "po3", label: "Hydration", category: "post" },
  { id: "me1", label: "7.5+ hours sleep last night", category: "metabolic" },
  { id: "me2", label: "No caffeine after 2 PM", category: "metabolic" },
  { id: "me3", label: "Exercise today (Zone 2 or resistance)", category: "metabolic" },
];

const categoryLabels: Record<string, { label: string; icon: React.ReactNode }> = {
  pre: { label: "Pre-Flight", icon: <Sun size={14} /> },
  msmw: { label: "In-Flight", icon: <Brain size={14} /> },
  post: { label: "Post-Flight", icon: <Coffee size={14} /> },
  metabolic: { label: "Metabolic", icon: <Moon size={14} /> },
};

export default function DailyPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [ccuSpent, setCcuSpent] = useState(40);

  const toggle = (id: string) => {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setChecked(next);
  };

  const categories = ["pre", "msmw", "post", "metabolic"] as const;
  const completedCount = checked.size;
  const totalCount = checklistItems.length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Daily OS</div>
        <h1 className="text-2xl font-bold tracking-tight">Monolithic Simulation OS</h1>
      </div>

      {/* CCU Budget */}
      <div className="block-elevated p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-zinc-400" />
            <span className="text-xs font-mono text-zinc-400 uppercase">Cognitive Currency Units (CCU)</span>
          </div>
          <div className="text-xs font-mono text-zinc-500">Budget: 100 / Spent: {ccuSpent}</div>
        </div>
        <input
          type="range"
          min={0}
          max={120}
          value={ccuSpent}
          onChange={(e) => setCcuSpent(Number(e.target.value))}
          className="w-full h-2 bg-neutral-900 rounded-full appearance-none cursor-pointer accent-white"
        />
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-zinc-600">0</span>
          <span className="text-[10px] text-zinc-600">60 (Safe)</span>
          <span className="text-[10px] text-amber-500">80 (Caution)</span>
          <span className="text-[10px] text-rose-500">100+ (Debt)</span>
        </div>
        {ccuSpent > 100 && (
          <div className="mt-3 p-2.5 bg-rose-950/30 border border-rose-900 rounded-md text-xs text-rose-300 flex items-center gap-2">
            <AlertTriangle size={14} /> You are in metabolic debt. Schedule recovery tomorrow.
          </div>
        )}
      </div>

      {/* Checklist */}
      <div className="block-elevated p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono text-zinc-400 uppercase">Protocol Checklist</div>
          <div className="text-xs font-mono text-zinc-500">{completedCount} / {totalCount}</div>
        </div>

        <div className="space-y-6">
          {categories.map((cat) => {
            const items = checklistItems.filter((i) => i.category === cat);
            const done = items.filter((i) => checked.has(i.id)).length;
            const { label, icon } = categoryLabels[cat];

            return (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-zinc-500">{icon}</span>
                  <span className="text-xs font-medium text-zinc-400 uppercase">{label}</span>
                  <span className="text-xs text-zinc-600">({done}/{items.length})</span>
                </div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-md border text-left transition-all ${
                        checked.has(item.id)
                          ? "bg-emerald-950/20 border-emerald-900/40"
                          : "bg-neutral-900/20 border-neutral-800 hover:border-zinc-600"
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        checked.has(item.id) ? "bg-emerald-500 border-emerald-500" : "border-zinc-600"
                      }`}>
                        {checked.has(item.id) && <Check size={12} className="text-black" />}
                      </div>
                      <span className={`text-sm ${checked.has(item.id) ? "text-emerald-300" : "text-zinc-300"}`}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recovery Protocol Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="block-square p-4">
          <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Immediate</div>
          <div className="text-sm font-medium">Hard Stop</div>
          <div className="text-xs text-zinc-500 mt-1">Close problem. Do not re-read.</div>
        </div>
        <div className="block-square p-4">
          <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">1-3 Days</div>
          <div className="text-sm font-medium">Light Review Only</div>
          <div className="text-xs text-zinc-500 mt-1">Read LTS. No new problems.</div>
        </div>
        <div className="block-square p-4">
          <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">1 Week</div>
          <div className="text-sm font-medium">Re-evaluate Structure</div>
          <div className="text-xs text-zinc-500 mt-1">Audit MSMW length & frequency.</div>
        </div>
      </div>
    </div>
  );
}
