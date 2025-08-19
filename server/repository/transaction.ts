// types
import type { Database } from "sqlite3";
import type { TransactionProps } from "../type/transaction";

//Database access layer
import { execute, run } from "../db/db.ts";

//utils
import { InternalError } from "../util/error.ts";
import Logger from "../util/logger.ts";

const logger = Logger.child({ module: "transaction.Repository" });

/*
 * TODO : Implement Update
 * TODO : Implement Soft Delete;
 */

export class TransactionRepository {
  db: Database;
  constructor(db: Database) {
    this.db = db;
  }

  /*Create Transaction Table*/
  async createTransactionTable() {
    try {
      await execute(
        `CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    type TEXT NOT NULL CHECK (type IN ('Income', 'Expense')),
    frequency TEXT NOT NULL CHECK (
        frequency IN ('Once', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'HalfYearly', 'Yearly')
    ),
    category TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`,
        this.db,
      );
      logger.info({
        Message: "Transaction Table Created Successfully",
      });
    } catch (err) {
      if (err instanceof Error) {
        logger.error({
          Error: "Unable to Create Transaction Table",
          Message: err.message,
          Stack: err.stack,
          Cause: err.cause,
        });
        throw new InternalError("Something went wrong..", 500);
      }
    }
  }

  /*Add Transaction*/
  async insertTransaction({
    name,
    amount,
    type,
    frequency,
    category,
    description,
  }: TransactionProps): Promise<number> {
    try {
      const { lastID, changes } = await run(
        `INSERT INTO transactions(name,amount,type,frequency,category,description) VALUES(?,?,?,?,?,?)`,
        [name, amount, type, frequency, category, description],
        this.db,
      );
      if (!changes) {
        logger.error({
          Error: "Transaction insertion failed: no rows affected",
          Payload: { name, amount, type, frequency, category },
        });

        throw new InternalError("Something went wrong", 404);
      }

      logger.info({
        Message: "Transaction inserted successfully",
        TransactionID: lastID,
      });

      return lastID;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error({
          Error: "Transaction Insertion Failed",
          Message: err.message,
          Stack: err.stack,
          Cause: err.cause,
          Payload: { name, amount, type, frequency, category },
        });
      }

      throw new InternalError("Something went wrong", 500);
    }
  }

  /*TODO: Implement soft delete */
  async deleteTransaction(id: number): Promise<number> {
    try {
      const { lastID, changes } = await run(
        `DELETE FROM Transaction WHERE id = ?`,
        [id],
        this.db,
      );
      if (!changes) {
        logger.error({
          Error: "Transaction ID is not found",
        });
        throw new InternalError("Something went wrong", 500);
      }
      return lastID;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error({
          Error: "Transaction Insertion Failed",
          Message: err.message,
          Stack: err.stack,
          Cause: err.cause,
          id: id,
        });
      }
      throw new InternalError("Something went wrong", 500);
    }
  }
}
