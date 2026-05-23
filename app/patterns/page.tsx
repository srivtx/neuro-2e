"use client";

import { useState } from "react";
import { patterns } from "@/lib/patterns";
import { problems } from "@/lib/problems/index";
import { CodeBlock } from "@/components/CodeBlock";
import { ChevronDown, ChevronUp, Layers } from "lucide-react";

const problemsByPattern = new Map<string, typeof problems>();
for (const p of problems) {
  if (!problemsByPattern.has(p.patternId)) problemsByPattern.set(p.patternId, []);
  problemsByPattern.get(p.patternId)!.push(p);
}

export default function PatternsPage() {
  const [openId, setOpenId] = useState<string | null>("hashmap");

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
                  <div className={`w-2 h-2 rounded-sm bg-${pattern.color}-500`} />
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

                  {/* Problems */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Layers size={14} className="text-zinc-500" />
                      <span className="text-xs font-mono text-zinc-500 uppercase">Training Set ({realProblems.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
