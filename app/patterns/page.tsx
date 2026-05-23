"use client";

import { useState } from "react";
import { patterns } from "@/lib/patterns";
import { problems } from "@/lib/problems/index";
import { CodeBlock } from "@/components/CodeBlock";
import { ChevronDown, ChevronUp, List } from "lucide-react";

const problemsByPattern = new Map<string, typeof problems>();
for (const p of problems) {
  if (!problemsByPattern.has(p.patternId)) problemsByPattern.set(p.patternId, []);
  problemsByPattern.get(p.patternId)!.push(p);
}

// Tailwind JIT cannot parse dynamic classes — explicit map required
const colorDotMap: Record<string, string> = {
  emerald: "bg-emerald-500",
  sky: "bg-sky-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
  cyan: "bg-cyan-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
  indigo: "bg-indigo-500",
  lime: "bg-lime-500",
  fuchsia: "bg-fuchsia-500",
  yellow: "bg-yellow-500",
  slate: "bg-slate-500",
  zinc: "bg-zinc-500",
};

export default function PatternsPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [expandedSets, setExpandedSets] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Library</div>
          <h1 className="text-2xl font-bold tracking-tight">Pattern Library</h1>
        </div>
        <div className="text-xs text-zinc-500">{patterns.length} patterns · {problems.length} problems</div>
      </div>

      <div className="space-y-3">
        {patterns.map((pattern) => {
          const isOpen = openId === pattern.id;
          const realProblems = problemsByPattern.get(pattern.id) || [];
          return (
            <div
              key={pattern.id}
              className={`block-square overflow-hidden transition-colors ${
                isOpen ? "border-zinc-600" : ""
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : pattern.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-900/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-sm ${colorDotMap[pattern.color] || "bg-zinc-500"}`} />
                  <div>
                    <div className="font-medium text-sm">{pattern.name}</div>
                    <div className="text-xs text-zinc-500">{pattern.tag}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-600">{realProblems.length} problems</span>
                  {isOpen ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-neutral-800 p-4 space-y-4">
                  {/* Trigger + Invariant */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-md">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Trigger</div>
                      <div className="text-sm text-zinc-300">{pattern.trigger}</div>
                    </div>
                    <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-md">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Invariant</div>
                      <div className="text-sm text-zinc-300">{pattern.invariant}</div>
                    </div>
                  </div>

                  {/* Template Code */}
                  <CodeBlock code={pattern.template} filename={`${pattern.id}.js`} />

                  {/* Problems — Collapsed by default */}
                  <div className="border-t border-neutral-800 pt-3">
                    <button
                      onClick={() => {
                        setExpandedSets((prev) => {
                          const next = new Set(prev);
                          if (next.has(pattern.id)) next.delete(pattern.id);
                          else next.add(pattern.id);
                          return next;
                        });
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-md hover:bg-neutral-900/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <List size={14} className="text-zinc-500" />
                        <span className="text-xs font-mono text-zinc-500 uppercase">Training Set ({realProblems.length})</span>
                      </div>
                      {expandedSets.has(pattern.id) ? (
                        <ChevronUp size={14} className="text-zinc-500" />
                      ) : (
                        <ChevronDown size={14} className="text-zinc-500" />
                      )}
                    </button>

                    {expandedSets.has(pattern.id) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {realProblems.map((p) => (
                          <div key={p.id} className="flex items-start gap-3 p-3 border border-neutral-800 rounded-md bg-neutral-900/30 hover:border-zinc-600 transition-colors">
                            <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              p.difficulty === "Easy" ? "bg-emerald-500" :
                              p.difficulty === "Medium" ? "bg-amber-500" : "bg-rose-500"
                            }`} />
                            <div>
                              <div className="text-sm font-medium">{p.name}</div>
                              <div className="text-xs text-zinc-500 mt-0.5">{p.why}</div>
                              <div className="text-[10px] text-zinc-600 mt-1 font-mono">#{p.number} · {p.difficulty}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
