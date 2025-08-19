class Transaction {
    id: number
    name: string
    amount: number
    type: string
    paymentMethod: string
    frequency: string
    note: string
    date: string
    time: string

    constructor
        (id: number, name: string, amount: number, type: string, paymentMethod: string, frequency: string, note: string) {
        this.name = name;
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.paymentMethod = paymentMethod;
        this.frequency = frequency
        this.note = note
        this.date = new Date().toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" })
        this.time = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })

    }
}

export default Transaction