// Icons
import { Eclipse, Search, Plus } from "lucide-react"
// Components
// import TransactionsDetailsItem from "../components/transactionItem"
import { useState } from "react"
import Dropdown from "../components/dropDown"
import TRANSACTIONS from "../transactionManger"

const Dashboard = () => {
    return (
        <section className=" grow flex flex-col rounded-2xl p-4 border-neutral-800 border-1 gap-4">
            <DashboardNav />
            <DashboardMain />
        </section>
    )
}
const DashboardNav = () => {
    return (
        <nav className="flex justify-end">
            <ul className="flex gap-2">
                <li><Search size={18} /></li>
                <li><Eclipse size={18} /></li>
            </ul>
        </nav>
    )
}
const DashboardMain = () => {
    const [transactions, setTransactions] = useState(TRANSACTIONS.getTransactions());

    const handleNewTransaction = () => {
        // Refresh transactions data after adding new entry
        setTransactions([...TRANSACTIONS.getTransactions()]);
    };

    return (
        <div className="grow bg-[#0f0f0f] rounded-2xl p-4 grid grid-cols-3 grid-rows-4 gap-4 min-h-0">
            <TotalIncomePanel />
            <BalancePanel />
            <ExpensesPanel />
            <TransactionDetails transactions={transactions} />
            <Statistics />
            <CreatePanel onAddTransaction={handleNewTransaction} />
        </div>
    )
}

const TotalIncomePanel = () => {
    return (
        <div className="border-1 border-neutral-800 p-4 rounded-[0.5rem]">
            <h3 className="text-2xl">Total Income</h3>
            <h2 className="text-4xl">
                <span className="text-neutral-700">Rs. </span>
                {TRANSACTIONS.getIncomes()}
            </h2>
        </div>
    )
}
const BalancePanel = () => {
    return (
        <div className="border-1  border-neutral-800 p-4 rounded-[0.5rem] row-start-2 ">
            <h3 className="text-2xl">Balance</h3>
            <h2 className="text-4xl">
                <span className="text-neutral-700">Rs. </span>
                {TRANSACTIONS.getBalance()}
            </h2>
        </div>
    )
}
const ExpensesPanel = () => {
    return (
        <div className="border-1 border-neutral-800 p-4 rounded-[0.5rem] row-span-2 justify-between flex flex-col">
            <div>
                <h3 className="text-2xl">Total Expenses</h3>
                <h2 className="text-4xl">
                    <span className="text-neutral-700">Rs. </span>
                    {TRANSACTIONS.getExpenses()}
                </h2>
            </div>
            <div>
                <div className="">
                    <h5 className="text-1xl text-neutral-400">Biggest Expenses</h5>
                    {/* //TODO: Here Will be filters Montly/Weekly/Todays */}

                    <ul className="">
                        <li className="flex justify-between">
                            <p className="text-[0.875rem]">Rent</p>
                            <p className="text-[0.875rem]"><span className="text-neutral-700">Rs. </span>6000</p>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

const TransactionDetails = ({ transactions }) => {
    transactions.map((transaction) => (
        console.log(transaction.name)
    ))
    console.log(transactions)
    return (
        <div className="border-1 border-neutral-800 p-4 rounded-[0.5rem] row-start-3 row-span-2 overflow-y-scroll">
            <h3 className="text-2xl ">Transaction Details</h3>


            {/* //TODO: Here Will be filters */}
            {/* //!Change it to map and useeffect to render @TransactionDetails */}
            <ul className="py-3 flex flex-col-reverse gap-2">
                {
                    transactions.map((transaction) => {
                        return (
                            <li key={transaction.id} className="list-none border-1 border-neutral-700 p-2 rounded-[0.25rem] bg-neutral-900">
                                <div className="flex justify-between">
                                    <h3 className="text-xl capitalize">{transaction.name}</h3>
                                    <h3 className="text-xl">
                                        <span className="text-neutral-600">Rs. </span>
                                        {transaction.amount}</h3>
                                </div>
                                <div className="flex justify-between text-[0.675rem]">
                                    <div className="flex gap-2">
                                        <p className="text-neutral-500">{transaction.date}</p>
                                    </div>
                                    <p className="">{transaction.type}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
const Statistics = () => {
    return (
        <div className="col-start-2 border-1 border-neutral-700 row-span-2 p-4 rounded-[0.5rem]">
            <h3 className="text-2xl">Statistics</h3>

        </div>
    )
}

const CreatePanel = ({ onAddTransaction }) => {
    const [name, setName] = useState<string>("")
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedFrequency, setSelectedFrequency] = useState<string>("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
    const [amount, setAmount] = useState<string>("") // it will get converted to number later it just for typescript <setStateAction>
    const [note, setNote] = useState<string>("")
    const [transactionAdded, setTransactionAdded] = useState<number>(0);

    const add = () => {
        const isValid = [name, selectedType, selectedFrequency, selectedPaymentMethod, amount].every(
            (value) => value !== null && value !== "" && value !== undefined)
        if (isValid) {
            TRANSACTIONS.addTransaction(name, Number(amount), selectedType, selectedPaymentMethod, selectedFrequency, note)
            console.log(TRANSACTIONS.getTransactions())
            setTransactionAdded((prev) => prev + 1)
        }
        else {
            alert("please fill whole")
        }

        onAddTransaction(); // Trigger parent update
        // Reset form fields
        setName("");
        setAmount("");
        setNote("");
    }
    return (
        <div className="border-1 p-4 border-neutral-700 rounded-[0.5rem] col-start-3 row-start-1 row-span-4 flex-col flex">
            {/* <button className="border-2 py-4 border-dashed border-[#0ae448] font-bold rounded-[0.35rem] hover:bg-[#0ae448] hover:text-black">
                Create
            </button> */}
            <div className="p-4 border-1 border-neutral-800 rounded-[0.5rem] flex flex-col gap-2">

                <div className="flex flex-col">
                    <label className="text-neutral-700 text-[0.875rem]">Name</label>
                    <input
                        className="border-1 p-2 rounded-[0.25rem] focus:outline-0 border-neutral-600 placeholder-neutral-700 focus-within:border-[#0ae448]"
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-neutral-700 text-[0.875rem]">Amount</label>
                    <input
                        className="border-1 p-2 rounded-[0.25rem] focus:outline-0 border-neutral-600 placeholder-neutral-700 focus-within:border-[#0ae448]"
                        value={amount}
                        onChange={(e) => { setAmount(e.target.value) }}
                    />
                </div>
                <div className="flex justify-between flex-wrap">
                    <div>
                        <Dropdown options={["Expense", "Income",]} onSelect={setSelectedType} label="Type" />
                    </div>
                    <div>
                        <Dropdown options={["Yearly", "Monthly", "Weekly", "Daily",]} onSelect={setSelectedFrequency} label="Frequency" />
                    </div>
                    <div>
                        <Dropdown options={["Bank", "Cash", "UPI", "Other"]} onSelect={setSelectedPaymentMethod} label="Mode" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-[0.875rem] text-neutral-700">Note</label>
                    <textarea
                        name=""
                        id="note"
                        className="resize-none p-2 rounded-[0.25rem] border-1 border-neutral-600 focus:outline-0 placeholder-neutral-700 focus-within:border-[#0ae448]"
                        value={note}
                        onChange={(e) => { setNote(e.target.value) }}
                    >
                    </textarea>
                </div>
            </div>

            <button className="flex bg-primary-gradient my-4 py-4 justify-center text-black rounded-[0.25rem]" onClick={add}>
                <Plus />
                <span>Add</span>
            </button>

        </div>
    )
}
export default Dashboard