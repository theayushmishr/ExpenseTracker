import sqlite3 from "sqlite3";
import path from "path";
import Logger from "../util/logger.ts";

const logger = Logger.child({ module: "db" });
const dbPath = path.join(import.meta.dir, "../data/transaction.db");

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error({
      Error: "Failed to open database",
      Message: err.message,
      Stack: err.stack,
      cause: err.cause,
    });
  } else {
    logger.info({
      Message: "SQLITE3 DB is ready",
    });
  }
});

export const execute = async (
  sql: string,
  db: sqlite3.Database,
): Promise<void> => {
  return new Promise<void>((resolve, reject): void => {
    db.exec(sql, (err: Error | null): void => {
      if (err) return reject(err);
      resolve();
    });
  });
};

export const run = async (
  sql: string,
  params: any[],
  db: sqlite3.Database,
): Promise<{ lastID: number; changes: number }> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err: Error | null): void {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};
