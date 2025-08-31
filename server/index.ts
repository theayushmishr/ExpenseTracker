import express from "express";
import logger from "./util/logger.ts";
import cors from "cors";
const app = express();

import { TransactionType } from "./type/transaction.ts";
import { TransactionFrequencyType } from "./type/transaction.ts";

import { TransactionService } from "./service/transaction.service.ts";
import { TransactionRepository } from "./repository/transaction.ts";
import { db } from "./db/db.ts";
(async () => {
  const r = new TransactionRepository(db);
  const ts = new TransactionService(r);
  await ts.init();
  await ts.addTransaction({
    name: "shopping",
    amount: 5000,
    type: TransactionType.Expense,
    date: new Date("2025-08-29"),
    frequency: TransactionFrequencyType.Monthly,
    description: "",
  });
})();
