// types
import type { Database } from "sqlite3";
import type {
  TransactionType,
  TransactionFrequencyType,
  TransactionProps,
} from "../type/transaction";
import type { TransactionRepository } from "../repository/transaction";

//utils
import { ValidationError, NotFoundError, InternalError } from "../util/error";
import Logger from "../util/logger.ts";
const logger = Logger.child({ module: "TransactionService" });

export class TransactionService {
  transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async init() {
    try {
      await this.transactionRepository.createTransactionTable();
      logger.info({
        Message: "Transaction Table created successfully",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error({
          Error: "Failed to add transaction",
          Message: err.message,
          Stack: err.stack,
          Cause: err.cause,
        });
      }
      throw new InternalError("Somethine went wrong", 500);
    }
  }
  async addTransaction(props: TransactionProps) {
    try {
      const transaction_id =
        await this.transactionRepository.insertTransaction(props);
      logger.info({
        Message: "Transaction added successfully",
      });
      return {
        id: transaction_id,
        ...props,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error({
          Error: "Failed to add transaction",
          Message: err.message,
          Stack: err.stack,
          Cause: err.cause,
        });
      }
      throw new InternalError("Somethine went wrong", 500);
    }
  }

  async validate(props: TransactionProps) {
    const invalidFields = [];
    if (props.amount < 0) {
    }
  }
}
