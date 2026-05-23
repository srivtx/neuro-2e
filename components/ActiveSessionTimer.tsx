"use client";

import { useState, useEffect } from "react";
import { useSession } from "./SessionProvider";

export default function ActiveSessionTimer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { active, elapsed, patternId, hardMode } = useSession();

  const m = Math.floor(elapsed / 60);
  const h = Math.floor(m / 60);
  const displayM = m % 60;
  const timeStr = h > 0
    ? `${h}:${displayM.toString().padStart(2, "0")}:${(elapsed % 60).toString().padStart(2, "0")}`
    : `${displayM}:${(elapsed % 60).toString().padStart(2, "0")}`;

  const progressPct = Math.min((elapsed / 7200) * 100, 100);
  const showBreak = elapsed > 0 && elapsed % 1200 < 60;

  // ALWAYS render a stable wrapper <div> — never return null.
  // React must see the same top-level node on every render to avoid
  // NotFoundError when the tree shape changes during reconciliation.
  return (
    <div suppressHydrationWarning aria-hidden="true" style={{ display: "contents" }}>
      {mounted && active && (
        <>
          {/* Thin ambient progress line at top edge of viewport */}
          <a
            href="/"
            className="fixed top-0 left-0 right-0 z-[60] h-[2px] group block"
            title="Click to return to Dashboard"
          >
            <div
              className={`h-full transition-all duration-1000 ${
                hardMode ? "bg-rose-500" : elapsed >= 7200 ? "bg-amber-500" : "bg-emerald-500"
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </a>

          {/* Compact pill */}
          <a
            href="/"
            className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 px-2 py-1 rounded-full border text-[10px] font-mono opacity-60 hover:opacity-100 transition-opacity backdrop-blur no-underline"
            style={{
              borderColor: hardMode ? "rgba(244,63,94,0.3)" : "rgba(255,255,255,0.08)",
              backgroundColor: hardMode ? "rgba(63,0,0,0.6)" : "rgba(0,0,0,0.6)",
              color: hardMode ? "#fda4af" : "#a1a1aa",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse inline-block"
              style={{ backgroundColor: elapsed >= 7200 ? "#f59e0b" : hardMode ? "#f43f5e" : "#10b981" }}
            />
            <span>{timeStr}</span>
            <span className="text-zinc-600 hidden sm:inline">{patternId}</span>
          </a>

          {/* Break reminder */}
          {showBreak && (
            <div className="fixed bottom-12 right-5 z-50 px-2 py-1 rounded border border-amber-900/50 bg-amber-950/80 text-[10px] text-amber-300">
              20 min — pause & render
            </div>
          )}
        </>
      )}
    </div>
  );
}
