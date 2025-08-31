// types
import {
  TransactionFrequencyType,
  TransactionType,
  type TransactionProps,
} from "../type/transaction";

import type { invalidField } from "../util/error";

import { TransactionRepository } from "../repository/transaction";

//utils
import { ValidationError, InternalError } from "../util/error";

import Logger from "../util/logger.ts";
const logger = Logger.child({ module: "TransactionService" });

/* FIXME : handled Non-Error Objects
 * */

export class TransactionService {
  private readonly transactionRepository: TransactionRepository;

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
          Error: "Failed to create transaction table",
          Message: err.message,
          Stack: err.stack,
          Cause: err.cause,
        });
      }
      throw new InternalError("Something went wrong", 500);
    }
  }

  async addTransaction(props: TransactionProps) {
    try {
      this.validate(props);
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
      if (err instanceof ValidationError) {
        logger.warn({
          Error: "Validation failed",
          Message: err.message,
          InvalidFields: err.metadata.invalidField,
        });
        throw err;
      }
      if (err instanceof Error) {
        logger.error({
          Error: "Failed to add transaction",
          Message: err.message,
          Stack: err.stack,
          Cause: err.cause,
        });
      }
      throw new InternalError("Something went wrong", 500);
    }
  }

  private validate(props: TransactionProps) {
    const issues: invalidField[] = [];
    if (
      typeof props.amount !== "number" ||
      !Number.isFinite(props.amount) ||
      props.amount < 0
    ) {
      issues.push({
        invalidField: "amount",
        message: "Invalid amount",
        hint: "Amount should be more than 0",
      });
    }

    if (!Object.values(TransactionType).includes(props.type)) {
      issues.push({
        invalidField: "type",
        message: "Invalid transaction type",
        hint: "Transaction type should only be 'Income' or 'Expense'",
      });
    }
    if (!Object.values(TransactionFrequencyType).includes(props.frequency)) {
      issues.push({
        invalidField: "frequency",
        message: "Invalid frequency",
        hint: "Select given frequencies",
      });
    }
    if (!props.date || isNaN(new Date(props.date).getTime())) {
      issues.push({
        invalidField: "date",
        message: "Invalid date",
        hint: "Please provide a valid date",
      });
    }

    if (issues.length > 0) {
      throw ValidationError.fromInvalidFields(issues);
    }
  }

  public async updateTransaction(id: number, transaction: TransactionProps) {
    this.validate(transaction);
  }
}
