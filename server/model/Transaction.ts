import { TransactionType } from "../type/transaction";
import type { TransactionProps } from "../type/transaction";

class Transaction implements TransactionProps {
  id: string;
  date: Date;
  amount: number;
  description: string;
  transactionType: TransactionType;
  constructor({
    id,
    date,
    amount,
    description,
    transactionType,
  }: TransactionProps) {
    this.id = id;
    this.date = new Date(date);
    this.amount = amount;
    this.description = description;
    this.transactionType = transactionType;
  }

  serialize(): TransactionProps {
    return {
      id: this.id,
      date: this.date,
      amount: this.amount,
      description: this.description,
      transactionType: this.transactionType,
    };
  }

  static deserialize(data: TransactionProps): TransactionProps {
    return new Transaction({
      id: data.id,
      date: new Date(data.date),
      amount: data.amount,
      description: data.description,
      transactionType: data.transactionType,
    });
  }
}
export default Transaction;
