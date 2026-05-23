"use client";

import { useState, useEffect } from "react";
import { Check, Clock, Moon, Sun, Coffee, Brain, AlertTriangle, List, RefreshCw } from "lucide-react";
import { getTodayCCU, getCCULog, addCCU, getTodayChecklist, setTodayChecklist } from "@/lib/actions";

/* ─── Skeleton helpers ─── */
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-neutral-800/50 rounded-md ${className}`} />;
}

interface CheckItem {
  id: string;
  label: string;
  category: "pre" | "msmw" | "post" | "metabolic";
  ccu?: number;
}

const checklistItems: CheckItem[] = [
  { id: "p1", label: "No meetings for next 120 minutes", category: "pre" },
  { id: "p2", label: "Phone in another room, DND on", category: "pre" },
  { id: "p3", label: "All notifications disabled", category: "pre" },
  { id: "p4", label: "Noise-canceling + brown noise ready", category: "pre" },
  { id: "p5", label: "Workspace is clear (Sensory Faraday Cage)", category: "pre" },
  { id: "p6", label: "Pre-MSMW meal consumed 30-45 min ago", category: "pre" },
  { id: "p7", label: "Single architectural objective written down", category: "pre" },
  { id: "m1", label: "Syntax Sandbox warm-up (3 template passes)", category: "msmw", ccu: 5 },
  { id: "m2", label: "Onion-Layer read: Skeleton → Trigger → Flesh", category: "msmw", ccu: 5 },
  { id: "m3", label: "Pause-and-Render at 20 min mark", category: "msmw" },
  { id: "m4", label: "Pause-and-Render at 40 min mark", category: "msmw" },
  { id: "m5", label: "Pause-and-Render at 60 min mark", category: "msmw" },
  { id: "m6", label: "Derivation log written for each problem", category: "msmw", ccu: 10 },
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
  const [ccuSpent, setCcuSpent] = useState(0);
  const [ccuLog, setCcuLog] = useState<{ activity: string; cost: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState<"pre" | "msmw" | "post" | "metabolic">("pre");

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [savedChecked, spent, log] = await Promise.all([
        getTodayChecklist(),
        getTodayCCU(),
        getCCULog(),
      ]);
      setChecked(new Set(savedChecked));
      setCcuSpent(spent);
      setCcuLog(log.map((l) => ({ activity: l.activity, cost: l.cost })));
    } catch {
      setError("Could not load your daily data. The system may be warming up.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const toggle = async (id: string) => {
    const next = new Set(checked);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      const item = checklistItems.find((i) => i.id === id);
      if (item?.ccu) {
        await addCCU(item.label, item.ccu);
        setCcuSpent((s) => s + item.ccu!);
        setCcuLog((log) => [{ activity: item.label, cost: item.ccu! }, ...log]);
      }
    }
    setChecked(next);
    await setTodayChecklist(Array.from(next));
  };

  const categories = ["pre", "msmw", "post", "metabolic"] as const;
  const completedCount = checked.size;
  const totalCount = checklistItems.length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Daily OS</div>
        <h1 className="text-2xl font-bold tracking-tight">Monolithic Simulation OS</h1>
      </div>

      {/* CCU Budget */}
      <div className="block-elevated p-5">
        {loading ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ) : error ? (
          <div className="p-3 border border-amber-900/40 bg-amber-950/20 rounded-md space-y-2">
            <div className="text-xs text-amber-300 font-medium">System warming up</div>
            <p className="text-[11px] text-amber-400/70">{error}</p>
            <button
              onClick={loadData}
              className="px-3 py-1.5 text-[11px] font-medium rounded-md border border-amber-800 text-amber-400 hover:bg-amber-900/30 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-zinc-400" />
                <span className="text-xs font-mono text-zinc-400 uppercase">Cognitive Currency Units (CCU)</span>
              </div>
              <div className="text-xs font-mono text-zinc-500">Budget: 100 / Spent: {ccuSpent}</div>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${Math.min((ccuSpent / 100) * 100, 100)}%`,
                  backgroundColor: ccuSpent >= 100 ? "#fb7185" : ccuSpent >= 80 ? "#fbbf24" : "var(--pattern-accent, #fff)",
                }}
              />
            </div>
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

            {ccuLog.length > 0 && (
              <div className="mt-4 pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2 mb-2">
                  <List size={14} className="text-zinc-500" />
                  <span className="text-xs font-mono text-zinc-500 uppercase">Today&apos;s Spend</span>
                </div>
                <div className="space-y-1">
                  {ccuLog.map((log, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-zinc-400">{log.activity}</span>
                      <span className="text-zinc-500 font-mono">+{log.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Checklist */}
      <div className="block-elevated p-5">
        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="flex-1 h-9" />
              ))}
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
        ) : error ? null : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono text-zinc-400 uppercase">Protocol Checklist</div>
              <div className="text-xs font-mono text-zinc-500">{completedCount} / {totalCount}</div>
            </div>

            {/* Phase Tabs */}
            <div className="flex gap-1 mb-4">
              {categories.map((cat) => {
                const items = checklistItems.filter((i) => i.category === cat);
                const done = items.filter((i) => checked.has(i.id)).length;
                const { label, icon } = categoryLabels[cat];
                const isActive = activePhase === cat;
                const isComplete = done === items.length;

                return (
                  <button
                    key={cat}
                    onClick={() => setActivePhase(cat)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium rounded-md border transition-all ${
                      isActive
                        ? "bg-white text-black border-white"
                        : isComplete
                        ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-400"
                        : "border-neutral-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
                    }`}
                  >
                    {icon}
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{label.split("-")[0]}</span>
                    <span className={`text-[10px] ${isActive ? "text-zinc-500" : "text-zinc-600"}`}>
                      ({done}/{items.length})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Phase Items */}
            <div className="space-y-2">
              {(() => {
                const items = checklistItems.filter((i) => i.category === activePhase);
                const { label } = categoryLabels[activePhase];
                return (
                  <>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">{label} Checklist</div>
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
                        {item.ccu && (
                          <span className="ml-auto text-[10px] text-zinc-600 font-mono">+{item.ccu}</span>
                        )}
                      </button>
                    ))}
                  </>
                );
              })()}
            </div>

            {/* Phase Navigation */}
            <div className="flex justify-between mt-4 pt-4 border-t border-neutral-800">
              <button
                onClick={() => {
                  const idx = categories.indexOf(activePhase);
                  if (idx > 0) setActivePhase(categories[idx - 1]);
                }}
                disabled={activePhase === "pre"}
                className="px-3 py-1.5 text-[11px] text-zinc-400 border border-neutral-800 rounded-md hover:border-zinc-600 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous Phase
              </button>
              <button
                onClick={() => {
                  const idx = categories.indexOf(activePhase);
                  if (idx < categories.length - 1) setActivePhase(categories[idx + 1]);
                }}
                disabled={activePhase === "metabolic"}
                className="px-3 py-1.5 text-[11px] text-black bg-white rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next Phase →
              </button>
            </div>
          </>
        )}
      </div>

      {/* Recovery Protocol */}
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
