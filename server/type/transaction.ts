export enum TransactionType {
  Income = "Income",
  Expense = "Expense",
}

export enum TransactionFrequencyType {
  Once = "Once",
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  HalfYearly = "HalfYearly",
  Yearly = "Yearly",
}

export interface TransactionProps {
  name: string;
  amount: number;
  type: TransactionType;
  frequency: TransactionFrequencyType;
  category: string;
  description: string;
}
