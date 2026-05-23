"use server";

import { run, querySingle, query } from "./db";

const today = () => new Date().toISOString().split("T")[0];

// ===== CCU Tracking =====
export async function getTodayCCU(): Promise<number> {
  const result = await querySingle("SELECT SUM(cost) as total FROM ccu_log WHERE date = ?", [today()]);
  return result?.total ?? 0;
}

export async function addCCU(activity: string, cost: number) {
  await run("INSERT INTO ccu_log (date, activity, cost) VALUES (?, ?, ?)", [today(), activity, cost]);
}

export async function getCCULog() {
  const result = await query("SELECT * FROM ccu_log WHERE date = ? ORDER BY created_at DESC", [today()]);
  return result.rows as {
    id: number;
    date: string;
    activity: string;
    cost: number;
    created_at: string;
  }[];
}

// ===== Daily Checklist =====
export async function getTodayChecklist(): Promise<string[]> {
  const result = await querySingle("SELECT checked_items FROM daily_checklist WHERE date = ?", [today()]);
  return result ? JSON.parse(result.checked_items) : [];
}

export async function setTodayChecklist(items: string[]) {
  const result = await querySingle("SELECT 1 FROM daily_checklist WHERE date = ?", [today()]);
  if (result) {
    await run("UPDATE daily_checklist SET checked_items = ? WHERE date = ?", [JSON.stringify(items), today()]);
  } else {
    await run("INSERT INTO daily_checklist (date, checked_items) VALUES (?, ?)", [today(), JSON.stringify(items)]);
  }
}

// ===== Pattern Cycles =====
export async function getPatternCycles(patternId: string): Promise<number> {
  const result = await querySingle("SELECT cycles FROM pattern_cycles WHERE pattern_id = ?", [patternId]);
  return result?.cycles ?? 0;
}

export async function incrementPatternCycle(patternId: string) {
  const result = await querySingle("SELECT 1 FROM pattern_cycles WHERE pattern_id = ?", [patternId]);
  if (result) {
    await run("UPDATE pattern_cycles SET cycles = cycles + 1, updated_at = CURRENT_TIMESTAMP WHERE pattern_id = ?", [patternId]);
  } else {
    await run("INSERT INTO pattern_cycles (pattern_id, cycles) VALUES (?, 1)", [patternId]);
  }
}

// ===== Problem Progress =====
export async function getProblemProgress(problemId: string) {
  const result = await querySingle("SELECT * FROM problem_progress WHERE id = ?", [problemId]);
  return result as {
    id: string;
    pattern_id: string;
    solved: number;
    cycles: number;
    last_solved_at: string;
  } | undefined;
}

export async function markProblemSolved(problemId: string, patternId: string, name: string, number: number, difficulty: string) {
  const exists = await querySingle("SELECT 1 FROM problem_progress WHERE id = ?", [problemId]);
  if (exists) {
    await run("UPDATE problem_progress SET solved = 1, cycles = cycles + 1, last_solved_at = CURRENT_TIMESTAMP WHERE id = ?", [problemId]);
  } else {
    await run(
      "INSERT INTO problem_progress (id, pattern_id, name, number, difficulty, solved, cycles, last_solved_at) VALUES (?, ?, ?, ?, ?, 1, 1, CURRENT_TIMESTAMP)",
      [problemId, patternId, name, number, difficulty]
    );
  }
  // Also increment pattern cycle
  await incrementPatternCycle(patternId);
  // Add CCU for solving a problem
  await addCCU(`Solved: ${name}`, 15);
}

// ===== Solved Problems Count =====
export async function getSolvedCountByPattern(patternId: string): Promise<number> {
  const result = await querySingle("SELECT COUNT(*) as count FROM problem_progress WHERE pattern_id = ? AND solved = 1", [patternId]);
  return result?.count ?? 0;
}

// ===== Derivation Logs =====
export interface DerivationLog {
  structural_necessity: string;
  invariant_identification: string;
  failure_modes: string;
  alternatives_rejected: string;
  mental_image_clarity: number;
  derivation_confidence: number;
  time_to_derive: number;
  time_to_code: number;
  is_draft?: number;
}

export async function getDerivationLog(problemId: string): Promise<DerivationLog | null> {
  const result = await querySingle("SELECT * FROM derivation_logs WHERE problem_id = ?", [problemId]);
  return result as DerivationLog | undefined ?? null;
}

export async function saveDerivationLogDraft(
  problemId: string,
  patternId: string,
  log: DerivationLog
) {
  const exists = await querySingle("SELECT 1 FROM derivation_logs WHERE problem_id = ?", [problemId]);
  if (exists) {
    await run(
      `UPDATE derivation_logs SET
        structural_necessity = ?,
        invariant_identification = ?,
        failure_modes = ?,
        alternatives_rejected = ?,
        mental_image_clarity = ?,
        derivation_confidence = ?,
        time_to_derive = ?,
        time_to_code = ?,
        is_draft = 1
      WHERE problem_id = ?`,
      [
        log.structural_necessity,
        log.invariant_identification,
        log.failure_modes,
        log.alternatives_rejected,
        log.mental_image_clarity,
        log.derivation_confidence,
        log.time_to_derive,
        log.time_to_code,
        problemId,
      ]
    );
  } else {
    await run(
      `INSERT INTO derivation_logs 
      (problem_id, pattern_id, structural_necessity, invariant_identification, failure_modes, alternatives_rejected, mental_image_clarity, derivation_confidence, time_to_derive, time_to_code, is_draft)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        problemId,
        patternId,
        log.structural_necessity,
        log.invariant_identification,
        log.failure_modes,
        log.alternatives_rejected,
        log.mental_image_clarity,
        log.derivation_confidence,
        log.time_to_derive,
        log.time_to_code,
      ]
    );
  }
}

export async function saveDerivationLog(
  problemId: string,
  patternId: string,
  log: DerivationLog
) {
  const exists = await querySingle("SELECT 1 FROM derivation_logs WHERE problem_id = ?", [problemId]);
  if (exists) {
    await run(
      `UPDATE derivation_logs SET
        structural_necessity = ?,
        invariant_identification = ?,
        failure_modes = ?,
        alternatives_rejected = ?,
        mental_image_clarity = ?,
        derivation_confidence = ?,
        time_to_derive = ?,
        time_to_code = ?,
        is_draft = 0
      WHERE problem_id = ?`,
      [
        log.structural_necessity,
        log.invariant_identification,
        log.failure_modes,
        log.alternatives_rejected,
        log.mental_image_clarity,
        log.derivation_confidence,
        log.time_to_derive,
        log.time_to_code,
        problemId,
      ]
    );
  } else {
    await run(
      `INSERT INTO derivation_logs 
      (problem_id, pattern_id, structural_necessity, invariant_identification, failure_modes, alternatives_rejected, mental_image_clarity, derivation_confidence, time_to_derive, time_to_code, is_draft)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        problemId,
        patternId,
        log.structural_necessity,
        log.invariant_identification,
        log.failure_modes,
        log.alternatives_rejected,
        log.mental_image_clarity,
        log.derivation_confidence,
        log.time_to_derive,
        log.time_to_code,
      ]
    );
  }
}

// ===== Sessions =====
export async function startSession(patternId?: string) {
  const result = await run("INSERT INTO sessions (pattern_id, ccu_cost) VALUES (?, 60)", [patternId ?? null]);
  await addCCU("Started MSMW Session", 60);
  return result.lastInsertRowid as number;
}

export async function endSession(sessionId: number) {
  await run("UPDATE sessions SET ended_at = CURRENT_TIMESTAMP, completed = 1 WHERE id = ?", [sessionId]);
}

// ===== Review Queue (Spaced Repetition) =====
const INTERVALS = [1, 3, 7, 14, 30, 60, 90]; // days

function nextReviewDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export async function getReviewQueue(): Promise<{
  problem_id: string;
  pattern_id: string;
  name: string;
  number: number;
  difficulty: string;
  next_review_date: string;
  interval_days: number;
  repetitions: number;
}[]> {
  const today = new Date().toISOString().split("T")[0];
  const result = await query(
    `SELECT rq.problem_id, rq.pattern_id, pp.name, pp.number, pp.difficulty,
           rq.next_review_date, rq.interval_days, rq.repetitions
     FROM review_queue rq
     JOIN problem_progress pp ON rq.problem_id = pp.id
     WHERE rq.next_review_date <= ?
     ORDER BY rq.repetitions ASC, rq.next_review_date ASC`,
    [today]
  );
  return result.rows as any[];
}

export async function getUpcomingReviews(): Promise<{
  problem_id: string;
  pattern_id: string;
  name: string;
  next_review_date: string;
  interval_days: number;
}[]> {
  const today = new Date().toISOString().split("T")[0];
  const result = await query(
    `SELECT rq.problem_id, rq.pattern_id, pp.name, rq.next_review_date, rq.interval_days
     FROM review_queue rq
     JOIN problem_progress pp ON rq.problem_id = pp.id
     WHERE rq.next_review_date > ?
     ORDER BY rq.next_review_date ASC
     LIMIT 20`,
    [today]
  );
  return result.rows as any[];
}

export async function scheduleReview(problemId: string, patternId: string, success: boolean = true) {
  const row = await querySingle("SELECT * FROM review_queue WHERE problem_id = ?", [problemId]);

  if (row) {
    const newReps = success ? row.repetitions + 1 : Math.max(0, row.repetitions - 1);
    const intervalIdx = Math.min(newReps, INTERVALS.length - 1);
    const newInterval = INTERVALS[intervalIdx];
    const nextDate = nextReviewDate(newInterval);

    await run(
      `UPDATE review_queue SET
        next_review_date = ?,
        interval_days = ?,
        repetitions = ?,
        ease_factor = ?
      WHERE problem_id = ?`,
      [nextDate, newInterval, newReps, row.ease_factor, problemId]
    );
  } else {
    // First time scheduling
    await run(
      `INSERT INTO review_queue (problem_id, pattern_id, next_review_date, interval_days, repetitions, ease_factor)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [problemId, patternId, nextReviewDate(1), 1, 0, 2.5]
    );
  }
}

export async function getReviewStats(): Promise<{
  dueToday: number;
  upcoming: number;
  totalScheduled: number;
}> {
  const today = new Date().toISOString().split("T")[0];
  const dueToday = await querySingle("SELECT COUNT(*) as count FROM review_queue WHERE next_review_date <= ?", [today]);
  const upcoming = await querySingle("SELECT COUNT(*) as count FROM review_queue WHERE next_review_date > ?", [today]);
  const totalScheduled = await querySingle("SELECT COUNT(*) as count FROM review_queue");
  return {
    dueToday: dueToday?.count ?? 0,
    upcoming: upcoming?.count ?? 0,
    totalScheduled: totalScheduled?.count ?? 0,
  };
}
