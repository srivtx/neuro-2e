import { migrateToTurso } from "../lib/db";

async function main() {
  console.log("Migrating schema to Turso...");
  try {
    await migrateToTurso();
    console.log("✓ Schema migrated successfully!");
    console.log("Your Turso database is ready for production use.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main();
