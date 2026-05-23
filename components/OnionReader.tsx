"use client";

import { useState, useEffect, useCallback } from "react";
import { Problem } from "@/lib/problems";
import { Pattern } from "@/lib/patterns";
import { ChevronRight, Clock, Eye, Layers } from "lucide-react";

interface OnionReaderProps {
  problem: Problem;
  pattern?: Pattern;
  onComplete: () => void;
}

const LAYER_MIN_SECONDS = 15; // minimum seconds per layer

export default function OnionReader({ problem, pattern, onComplete }: OnionReaderProps) {
  const [layer, setLayer] = useState(0); // 0-2 (3 layers)
  const [elapsed, setElapsed] = useState(0);
  const [layerStartTime, setLayerStartTime] = useState(Date.now());
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setElapsed(0);
    setLayerStartTime(Date.now());
  }, [layer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - layerStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [layerStartTime]);

  const canAdvance = elapsed >= LAYER_MIN_SECONDS;

  const advance = useCallback(() => {
    if (!canAdvance) return;
    if (layer < 2) {
      setLayer(layer + 1);
    } else {
      setCompleted(true);
      onComplete();
    }
  }, [layer, canAdvance, onComplete]);

  if (completed) return null;

  const progressPct = ((layer + 1) / 3) * 100;

  return (
    <div className="block-elevated p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-zinc-400" />
          <span className="text-xs font-mono text-zinc-400 uppercase">Onion-Layer Reading</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500">Layer {layer + 1} / 3</span>
          <div className="w-20 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-500 transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      {/* Dwell time indicator */}
      <div className="flex items-center gap-2 p-2 bg-neutral-900/50 border border-neutral-800 rounded-md">
        <Clock size={14} className={canAdvance ? "text-emerald-400" : "text-amber-400"} />
        <span className={`text-xs ${canAdvance ? "text-emerald-400" : "text-amber-400"}`}>
          {canAdvance ? "Minimum dwell time met. You may advance." : `Read for ${LAYER_MIN_SECONDS - elapsed}s more before advancing.`}
        </span>
      </div>

      {/* Layer content */}
      <div className="space-y-4">
        {/* Layer 1: Title + Description + Pattern */}
        <div className={`p-4 rounded-md border ${layer === 0 ? "bg-neutral-900/50 border-neutral-700" : "bg-neutral-950/30 border-neutral-800 opacity-50"}`}>
          <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Layer 1 — Problem Statement</div>
          <h2 className="text-xl font-bold">{problem.name}</h2>
          <div className="flex items-center gap-2 mt-1 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded border font-medium ${
              problem.difficulty === "Easy" ? "bg-emerald-950/50 text-emerald-400 border-emerald-900" :
              problem.difficulty === "Medium" ? "bg-amber-950/50 text-amber-400 border-amber-900" :
              "bg-rose-950/50 text-rose-400 border-rose-900"
            }`}>
              {problem.difficulty}
            </span>
            <span className="text-xs text-zinc-500">LeetCode #{problem.number}</span>
            {pattern && <span className="text-xs text-zinc-500">· {pattern.name}</span>}
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{problem.description}</p>
          {layer === 0 && (
            <div className="mt-3 text-xs text-zinc-400 border-t border-neutral-800 pt-2">
              Before advancing: What structural signals in this description suggest the pattern family?
            </div>
          )}
        </div>

        {/* Layer 2: Constraints */}
        <div className={`p-4 rounded-md border ${layer === 1 ? "bg-neutral-900/50 border-neutral-700" : layer < 1 ? "hidden" : "bg-neutral-950/30 border-neutral-800 opacity-50"}`}>
          <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Layer 2 — Constraints & Bounds</div>
          <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
            {problem.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          {layer === 1 && (
            <div className="mt-3 text-xs text-zinc-400">
              What complexity class do these constraints force? What data structures are ruled in or out?
            </div>
          )}
        </div>

        {/* Layer 3: Examples */}
        <div className={`p-4 rounded-md border ${layer === 2 ? "bg-neutral-900/50 border-neutral-700" : layer < 2 ? "hidden" : "bg-neutral-950/30 border-neutral-800 opacity-50"}`}>
          <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Layer 3 — Examples & Edge Cases</div>
          <div className="space-y-3">
            {problem.examples.map((ex, i) => (
              <div key={i} className="p-2 bg-neutral-950/50 rounded-md">
                <div className="text-xs font-mono text-zinc-300"><span className="text-zinc-500">Input:</span> {ex.input}</div>
                <div className="text-xs font-mono text-zinc-300"><span className="text-zinc-500">Output:</span> {ex.output}</div>
                {ex.explanation && <div className="text-xs text-zinc-400 mt-1">{ex.explanation}</div>}
              </div>
            ))}
          </div>
          {layer === 2 && (
            <div className="mt-3 text-xs text-zinc-400">
              Trace through the examples manually. What operations happen step by step?
            </div>
          )}
        </div>

      </div>

      {/* Advance button */}
      <button
        onClick={advance}
        disabled={!canAdvance}
        className={`w-full py-2.5 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-colors ${
          canAdvance
            ? "bg-white text-black hover:bg-zinc-200"
            : "bg-neutral-800 text-zinc-500 cursor-not-allowed"
        }`}
      >
        {layer < 2 ? (
          <>
            Next Layer <ChevronRight size={14} />
          </>
        ) : (
          <>
            <Eye size={14} /> Reveal Full Problem & Begin Derivation
          </>
        )}
      </button>
    </div>
  );
}
