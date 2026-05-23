"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Clock, Brain, Zap, ArrowRight, RotateCcw, Home } from "lucide-react";

interface VictoryOverlayProps {
  show: boolean;
  problemName: string;
  timeToDerive: number;
  timeToCode: number;
  mentalClarity: number;
  derivationConfidence: number;
  onNext: () => void;
  onReview: () => void;
  onDashboard: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VictoryOverlay({
  show,
  problemName,
  timeToDerive,
  timeToCode,
  mentalClarity,
  derivationConfidence,
  onNext,
  onReview,
  onDashboard,
}: VictoryOverlayProps) {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      // Small delay for mount before animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
    } else {
      setAnimateIn(false);
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (!visible) return null;

  const totalTime = timeToDerive + timeToCode;
  const derivePct = totalTime > 0 ? Math.round((timeToDerive / totalTime) * 100) : 0;
  const codePct = totalTime > 0 ? Math.round((timeToCode / totalTime) * 100) : 0;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        animateIn ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
    >
      <div
        className={`w-full max-w-md mx-4 transition-all duration-500 ${
          animateIn ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-800 mb-4">
            <CheckCircle size={32} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Problem Solved</h2>
          <p className="text-sm text-zinc-400">{problemName}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-md text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Brain size={14} className="text-amber-400" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Derive</span>
            </div>
            <div className="text-lg font-mono font-bold text-white">{formatTime(timeToDerive)}</div>
            <div className="text-[10px] text-zinc-600">{derivePct}% of total</div>
          </div>
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-md text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Zap size={14} className="text-sky-400" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Code</span>
            </div>
            <div className="text-lg font-mono font-bold text-white">{formatTime(timeToCode)}</div>
            <div className="text-[10px] text-zinc-600">{codePct}% of total</div>
          </div>
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-md text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Clock size={14} className="text-zinc-500" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Total</span>
            </div>
            <div className="text-lg font-mono font-bold text-white">{formatTime(totalTime)}</div>
            <div className="text-[10px] text-zinc-600">time elapsed</div>
          </div>
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-md text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Brain size={14} className="text-violet-400" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Clarity</span>
            </div>
            <div className="text-lg font-mono font-bold text-white">{mentalClarity}/5</div>
            <div className="text-[10px] text-zinc-600">mental image</div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="mb-8 p-4 bg-neutral-950 border border-neutral-800 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400">Derivation Confidence</span>
            <span className="text-xs font-mono text-white">{derivationConfidence}/5</span>
          </div>
          <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-1000"
              style={{ width: animateIn ? `${(derivationConfidence / 5) * 100}%` : "0%" }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={onNext}
            className="w-full py-3 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowRight size={16} /> Next Problem
          </button>
          <div className="flex gap-2">
            <button
              onClick={onReview}
              className="flex-1 py-2.5 border border-neutral-800 text-zinc-400 text-xs rounded-md hover:border-zinc-600 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} /> Review Solution
            </button>
            <button
              onClick={onDashboard}
              className="flex-1 py-2.5 border border-neutral-800 text-zinc-400 text-xs rounded-md hover:border-zinc-600 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <Home size={14} /> Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
