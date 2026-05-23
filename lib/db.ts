import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "neuro-os.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
  }
  initSchema(db);
  return db;
}

function initSchema(db: Database.Database) {
  // Schema migrations: add missing columns to existing tables
  try {
    db.prepare("SELECT is_draft FROM derivation_logs LIMIT 1").get();
  } catch {
    db.exec("ALTER TABLE derivation_logs ADD COLUMN is_draft INTEGER DEFAULT 1");
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS problem_progress (
      id TEXT PRIMARY KEY,
      pattern_id TEXT NOT NULL,
      name TEXT NOT NULL,
      number INTEGER NOT NULL,
      difficulty TEXT NOT NULL,
      solved INTEGER DEFAULT 0,
      derivation_log TEXT,
      time_to_derive INTEGER,
      time_to_code INTEGER,
      mental_image_clarity INTEGER,
      derivation_confidence INTEGER,
      last_solved_at TEXT,
      cycles INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS pattern_cycles (
      pattern_id TEXT PRIMARY KEY,
      cycles INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      started_at TEXT DEFAULT CURRENT_TIMESTAMP,
      ended_at TEXT,
      ccu_cost INTEGER DEFAULT 60,
      pattern_id TEXT,
      problem_count INTEGER DEFAULT 0,
      completed INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS daily_checklist (
      date TEXT PRIMARY KEY,
      checked_items TEXT DEFAULT '[]',
      ccu_spent INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS ccu_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      activity TEXT NOT NULL,
      cost INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS derivation_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      problem_id TEXT NOT NULL,
      pattern_id TEXT NOT NULL,
      structural_necessity TEXT DEFAULT '' NOT NULL,
      invariant_identification TEXT DEFAULT '' NOT NULL,
      failure_modes TEXT DEFAULT '' NOT NULL,
      alternatives_rejected TEXT DEFAULT '' NOT NULL,
      mental_image_clarity INTEGER DEFAULT 0 NOT NULL,
      derivation_confidence INTEGER DEFAULT 0 NOT NULL,
      time_to_derive INTEGER DEFAULT 0,
      time_to_code INTEGER DEFAULT 0,
      is_draft INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(problem_id)
    );

    CREATE TABLE IF NOT EXISTS review_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      problem_id TEXT NOT NULL,
      pattern_id TEXT NOT NULL,
      next_review_date TEXT NOT NULL,
      interval_days INTEGER DEFAULT 1,
      ease_factor REAL DEFAULT 2.5,
      repetitions INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(problem_id)
    );

    CREATE INDEX IF NOT EXISTS idx_ccu_date ON ccu_log(date);
    CREATE INDEX IF NOT EXISTS idx_problem_pattern ON problem_progress(pattern_id);
    CREATE INDEX IF NOT EXISTS idx_derivation_problem ON derivation_logs(problem_id);
    CREATE INDEX IF NOT EXISTS idx_review_date ON review_queue(next_review_date);
  `);
}
