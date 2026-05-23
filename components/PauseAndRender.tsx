"use client";

import { useState, useEffect, useCallback } from "react";
import { Pause, Play, Brain } from "lucide-react";

const MSMW_DURATION = 20 * 60; // 20 minutes in seconds
const BREAK_DURATION = 60; // 60 seconds enforced break

interface PauseAndRenderProps {
  isActive: boolean; // true when user is working (derivation or coding)
  onBreakStart?: () => void;
  onBreakEnd?: () => void;
}

export default function PauseAndRender({ isActive, onBreakStart, onBreakEnd }: PauseAndRenderProps) {
  const [elapsed, setElapsed] = useState(0);
  const [showBreak, setShowBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(0);
  const [breakComplete, setBreakComplete] = useState(false);

  // Main session timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && !showBreak) {
      interval = setInterval(() => {
        setElapsed((t) => {
          if (t + 1 >= MSMW_DURATION) {
            setShowBreak(true);
            setBreakTime(0);
            setBreakComplete(false);
            onBreakStart?.();
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, showBreak, onBreakStart]);

  // Break countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (showBreak && breakTime < BREAK_DURATION) {
      interval = setInterval(() => {
        setBreakTime((t) => {
          if (t + 1 >= BREAK_DURATION) {
            setBreakComplete(true);
            return BREAK_DURATION;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showBreak, breakTime]);

  const resume = useCallback(() => {
    setShowBreak(false);
    setElapsed(0);
    setBreakTime(0);
    setBreakComplete(false);
    onBreakEnd?.();
  }, [onBreakEnd]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const remaining = MSMW_DURATION - elapsed;
  const isWarning = remaining <= 120; // last 2 minutes

  return (
    <>
      {/* Floating timer */}
      {isActive && !showBreak && (
        <div className={`fixed bottom-4 right-4 z-40 px-3 py-2 rounded-md border text-xs font-mono flex items-center gap-2 shadow-lg backdrop-blur ${
          isWarning ? "bg-amber-950/80 border-amber-800 text-amber-300" : "bg-neutral-900/80 border-neutral-700 text-zinc-400"
        }`}>
          <Pause size={12} />
          <span>{formatTime(remaining)}</span>
          {isWarning && <span className="text-[10px]">until break</span>}
        </div>
      )}

      {/* Full-screen break overlay */}
      {showBreak && (
        <div className="fixed inset-0 z-50 bg-neutral-950 flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-950/50 border border-amber-900 flex items-center justify-center mx-auto">
              <Brain size={32} className="text-amber-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-100">Pause & Render</h2>
              <p className="text-sm text-zinc-400 mt-2">
                20-minute block complete. Your prefrontal cortex needs glymphatic clearance.
                Do not context-switch. Stare at a wall, breathe, or walk slowly.
              </p>
            </div>

            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-md">
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Enforced Break</div>
              <div className="text-3xl font-mono font-bold text-zinc-200">{formatTime(BREAK_DURATION - breakTime)}</div>
              <div className="mt-2 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all"
                  style={{ width: `${(breakTime / BREAK_DURATION) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={resume}
              disabled={!breakComplete}
              className={`w-full py-3 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                breakComplete
                  ? "bg-white text-black hover:bg-zinc-200"
                  : "bg-neutral-800 text-zinc-500 cursor-not-allowed"
              }`}
            >
              <Play size={16} />
              {breakComplete ? "Resume Session" : "Break in progress..."}
            </button>

            <p className="text-[10px] text-zinc-600">
              Protocol: 20 min work → 60 sec minimum break. No screens, no input, no context loading.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
