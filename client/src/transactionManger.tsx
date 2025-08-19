import Transaction from "./transaction";
class TransactionManager {
    transactions: Transaction[]

    constructor() {
        this.transactions = []
    }
    addTransaction(name: string, amount: number, type: string, paymentMethod: string, frequency: string, note: string) {
        const id = this.transactions.length
        const transaction = new Transaction(id, name, amount, type, paymentMethod, frequency, note)
        this.transactions.push(transaction)
    }
    getTransactions() {
        return [...this.transactions]
    }
    getExpenses() {
        return this.transactions.filter(arr => arr.type === "Expense")
            .reduce((sum, arr) => sum + arr.amount, 0)
    }
    getIncomes() {
        return this.transactions.filter(arr => arr.type === "Income")
            .reduce((sum, arr) => sum + arr.amount, 0)
    }
    getBalance() {
        return this.getIncomes() - this.getExpenses()
    }
}
const TRANSACTIONS = new TransactionManager()
export default TRANSACTIONS