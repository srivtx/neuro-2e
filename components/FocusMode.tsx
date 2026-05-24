"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";

interface FocusModeProps {
  children: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
}

export default function FocusMode({ children, isActive, onToggle }: FocusModeProps) {
  // Keyboard shortcut: Ctrl/Cmd + K to toggle
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMeta = e.ctrlKey || e.metaKey;
      if (isMeta && e.key === "k") {
        e.preventDefault();
        onToggle();
      }
      if (e.key === "Escape" && isActive) {
        e.preventDefault();
        onToggle();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, onToggle]);

  return (
    <>
      {/* Focus mode toggle button — bottom-left to avoid timer pill collision */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 left-6 z-[60] hud-button !px-3 !py-2 text-[11px]"
        title={isActive ? "Exit Focus Mode (Esc)" : "Focus Mode (Ctrl+K)"}
      >
        {isActive ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        <span className="hidden sm:inline">{isActive ? "Exit Focus" : "Focus"}</span>
      </button>

      {/* Focus mode overlay indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-3 py-1.5 bg-neutral-900/90 border border-white/10 rounded-md text-[10px] font-mono text-zinc-400 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Focus Mode — Esc or Ctrl+K to exit
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
