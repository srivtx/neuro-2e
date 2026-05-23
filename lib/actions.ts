"use server";

import { getDb } from "./db";

const today = () => new Date().toISOString().split("T")[0];

// ===== CCU Tracking =====
export async function getTodayCCU(): Promise<number> {
  const db = getDb();
  const row = db.prepare("SELECT SUM(cost) as total FROM ccu_log WHERE date = ?").get(today()) as { total: number } | undefined;
  return row?.total ?? 0;
}

export async function addCCU(activity: string, cost: number) {
  const db = getDb();
  db.prepare("INSERT INTO ccu_log (date, activity, cost) VALUES (?, ?, ?)").run(today(), activity, cost);
}

export async function getCCULog() {
  const db = getDb();
  return db.prepare("SELECT * FROM ccu_log WHERE date = ? ORDER BY created_at DESC").all(today()) as {
    id: number;
    date: string;
    activity: string;
    cost: number;
    created_at: string;
  }[];
}

// ===== Daily Checklist =====
export async function getTodayChecklist(): Promise<string[]> {
  const db = getDb();
  const row = db.prepare("SELECT checked_items FROM daily_checklist WHERE date = ?").get(today()) as { checked_items: string } | undefined;
  return row ? JSON.parse(row.checked_items) : [];
}

export async function setTodayChecklist(items: string[]) {
  const db = getDb();
  const exists = db.prepare("SELECT 1 FROM daily_checklist WHERE date = ?").get(today());
  if (exists) {
    db.prepare("UPDATE daily_checklist SET checked_items = ? WHERE date = ?").run(JSON.stringify(items), today());
  } else {
    db.prepare("INSERT INTO daily_checklist (date, checked_items) VALUES (?, ?)").run(today(), JSON.stringify(items));
  }
}

// ===== Pattern Cycles =====
export async function getPatternCycles(patternId: string): Promise<number> {
  const db = getDb();
  const row = db.prepare("SELECT cycles FROM pattern_cycles WHERE pattern_id = ?").get(patternId) as { cycles: number } | undefined;
  return row?.cycles ?? 0;
}

export async function incrementPatternCycle(patternId: string) {
  const db = getDb();
  const exists = db.prepare("SELECT 1 FROM pattern_cycles WHERE pattern_id = ?").get(patternId);
  if (exists) {
    db.prepare("UPDATE pattern_cycles SET cycles = cycles + 1, updated_at = CURRENT_TIMESTAMP WHERE pattern_id = ?").run(patternId);
  } else {
    db.prepare("INSERT INTO pattern_cycles (pattern_id, cycles) VALUES (?, 1)").run(patternId);
  }
}

// ===== Problem Progress =====
export async function getProblemProgress(problemId: string) {
  const db = getDb();
  return db.prepare("SELECT * FROM problem_progress WHERE id = ?").get(problemId) as {
    id: string;
    pattern_id: string;
    solved: number;
    cycles: number;
    last_solved_at: string;
  } | undefined;
}

export async function markProblemSolved(problemId: string, patternId: string, name: string, number: number, difficulty: string) {
  const db = getDb();
  const exists = db.prepare("SELECT 1 FROM problem_progress WHERE id = ?").get(problemId);
  if (exists) {
    db.prepare("UPDATE problem_progress SET solved = 1, cycles = cycles + 1, last_solved_at = CURRENT_TIMESTAMP WHERE id = ?").run(problemId);
  } else {
    db.prepare("INSERT INTO problem_progress (id, pattern_id, name, number, difficulty, solved, cycles, last_solved_at) VALUES (?, ?, ?, ?, ?, 1, 1, CURRENT_TIMESTAMP)").run(problemId, patternId, name, number, difficulty);
  }
  // Also increment pattern cycle
  await incrementPatternCycle(patternId);
  // Add CCU for solving a problem
  await addCCU(`Solved: ${name}`, 15);
}

// ===== Solved Problems Count =====
export async function getSolvedCountByPattern(patternId: string): Promise<number> {
  const db = getDb();
  const row = db.prepare("SELECT COUNT(*) as count FROM problem_progress WHERE pattern_id = ? AND solved = 1").get(patternId) as { count: number } | undefined;
  return row?.count ?? 0;
}

// ===== Sessions =====
export async function startSession(patternId?: string) {
  const db = getDb();
  const result = db.prepare("INSERT INTO sessions (pattern_id, ccu_cost) VALUES (?, 60)").run(patternId ?? null);
  await addCCU("Started MSMW Session", 60);
  return result.lastInsertRowid as number;
}

export async function endSession(sessionId: number) {
  const db = getDb();
  db.prepare("UPDATE sessions SET ended_at = CURRENT_TIMESTAMP, completed = 1 WHERE id = ?").run(sessionId);
}
