import Database from "better-sqlite3";
import { createClient, Client } from "@libsql/client";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "neuro-os.db");

let localDb: Database.Database | null = null;
let tursoClient: Client | null = null;

// Determine which database to use
// Vercel may prefix env vars with the DB name, so check multiple variations
function getTursoEnv() {
  const url =
    process.env.TURSO_DATABASE_URL ||
    process.env.neuro_TURSO_DATABASE_URL ||
    "";
  const token =
    process.env.TURSO_AUTH_TOKEN ||
    process.env.neuro_TURSO_AUTH_TOKEN ||
    "";
  return { url, token };
}

function useTurso(): boolean {
  // On Vercel (serverless), filesystem SQLite is impossible — force Turso
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    return true;
  }
  const { url, token } = getTursoEnv();
  return !!url && !!token;
}

function getLocalDb(): Database.Database {
  if (!localDb) {
    localDb = new Database(DB_PATH);
    localDb.pragma("journal_mode = WAL");
    initLocalSchema(localDb);
  }
  return localDb;
}

function getTursoClient(): Client {
  if (!tursoClient) {
    const { url, token } = getTursoEnv();
    if (!url || !token) {
      throw new Error("Turso credentials not found in environment variables");
    }
    tursoClient = createClient({
      url,
      authToken: token,
    });
  }
  return tursoClient;
}

// Unified query interface
export interface DbQueryResult {
  rows: any[];
  lastInsertRowid?: number;
}

export async function query(sql: string, args?: any[]): Promise<DbQueryResult> {
  if (useTurso()) {
    const client = getTursoClient();
    const result = await client.execute({ sql, args: args || [] });
    return {
      rows: result.rows.map((row) => Object.fromEntries(Object.entries(row))),
      lastInsertRowid: result.lastInsertRowid ? Number(result.lastInsertRowid) : undefined,
    };
  } else {
    const db = getLocalDb();
    const stmt = db.prepare(sql);
    const rows = stmt.all(...(args || []));
    const info = (stmt as any).run ? (stmt as any).run(...(args || [])) : null;
    return {
      rows: rows as any[],
      lastInsertRowid: info?.lastInsertRowid ? Number(info.lastInsertRowid) : undefined,
    };
  }
}

export async function querySingle(sql: string, args?: any[]): Promise<any | undefined> {
  if (useTurso()) {
    const client = getTursoClient();
    const result = await client.execute({ sql, args: args || [] });
    if (result.rows.length === 0) return undefined;
    return Object.fromEntries(Object.entries(result.rows[0]));
  } else {
    const db = getLocalDb();
    const stmt = db.prepare(sql);
    return stmt.get(...(args || []));
  }
}

export async function run(sql: string, args?: any[]): Promise<{ lastInsertRowid?: number; changes?: number }> {
  if (useTurso()) {
    const client = getTursoClient();
    const result = await client.execute({ sql, args: args || [] });
    return {
      lastInsertRowid: result.lastInsertRowid ? Number(result.lastInsertRowid) : undefined,
      changes: result.rowsAffected ? Number(result.rowsAffected) : undefined,
    };
  } else {
    const db = getLocalDb();
    const stmt = db.prepare(sql);
    const info = stmt.run(...(args || []));
    return {
      lastInsertRowid: info.lastInsertRowid ? Number(info.lastInsertRowid) : undefined,
      changes: info.changes,
    };
  }
}

// Schema initialization for local SQLite
function initLocalSchema(db: Database.Database) {
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

// Migration helper: push schema to Turso
export async function migrateToTurso(): Promise<void> {
  if (!useTurso()) {
    throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set");
  }
  const client = getTursoClient();

  await client.execute(`
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
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS pattern_cycles (
      pattern_id TEXT PRIMARY KEY,
      cycles INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      started_at TEXT DEFAULT CURRENT_TIMESTAMP,
      ended_at TEXT,
      ccu_cost INTEGER DEFAULT 60,
      pattern_id TEXT,
      problem_count INTEGER DEFAULT 0,
      completed INTEGER DEFAULT 0
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS daily_checklist (
      date TEXT PRIMARY KEY,
      checked_items TEXT DEFAULT '[]',
      ccu_spent INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS ccu_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      activity TEXT NOT NULL,
      cost INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await client.execute(`
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
    )
  `);

  await client.execute(`
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
    )
  `);

  await client.execute(`CREATE INDEX IF NOT EXISTS idx_ccu_date ON ccu_log(date)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_problem_pattern ON problem_progress(pattern_id)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_derivation_problem ON derivation_logs(problem_id)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_review_date ON review_queue(next_review_date)`);
}
