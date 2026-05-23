"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { startSession, endSession } from "@/lib/actions";

interface SessionState {
  active: boolean;
  elapsed: number; // seconds
  patternId: string | null;
  sessionId: number | null;
  hardMode: boolean;
}

interface SessionContextType {
  active: boolean;
  elapsed: number;
  patternId: string | null;
  hardMode: boolean;
  startMSMW: (patternId: string, isHardMode?: boolean) => Promise<void>;
  stopMSMW: () => Promise<void>;
  formatElapsed: () => string;
}

const SessionContext = createContext<SessionContextType | null>(null);

const STORAGE_KEY = "neuro-os-session";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SessionState>({
    active: false,
    elapsed: 0,
    patternId: null,
    sessionId: null,
    hardMode: false,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.active && parsed.startedAt) {
          const now = Date.now();
          const elapsed = Math.floor((now - parsed.startedAt) / 1000);
          setState({
            active: true,
            elapsed,
            patternId: parsed.patternId,
            sessionId: parsed.sessionId,
            hardMode: parsed.hardMode || false,
          });
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Timer tick
  useEffect(() => {
    if (state.active) {
      intervalRef.current = setInterval(() => {
        setState((prev) => ({ ...prev, elapsed: prev.elapsed + 1 }));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.active]);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (state.active) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          active: true,
          startedAt: Date.now() - state.elapsed * 1000,
          patternId: state.patternId,
          sessionId: state.sessionId,
          hardMode: state.hardMode,
        })
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state.active, state.elapsed, state.patternId, state.sessionId, state.hardMode]);

  const startMSMW = useCallback(async (patternId: string, isHardMode = false) => {
    const sid = await startSession(patternId);
    setState({
      active: true,
      elapsed: 0,
      patternId,
      sessionId: sid as number,
      hardMode: isHardMode,
    });
  }, []);

  const stopMSMW = useCallback(async () => {
    if (state.sessionId) {
      await endSession(state.sessionId);
    }
    setState({
      active: false,
      elapsed: 0,
      patternId: null,
      sessionId: null,
      hardMode: false,
    });
  }, [state.sessionId]);

  const formatElapsed = useCallback(() => {
    const m = Math.floor(state.elapsed / 60);
    const s = state.elapsed % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, [state.elapsed]);

  return (
    <SessionContext.Provider
      value={{
        active: state.active,
        elapsed: state.elapsed,
        patternId: state.patternId,
        hardMode: state.hardMode,
        startMSMW,
        stopMSMW,
        formatElapsed,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
