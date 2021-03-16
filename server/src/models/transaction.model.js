import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    isAdded: {
        type: Boolean,
    },
    transactionMethod: {
        type: String,
        choices: ["Expenses", "Income"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

export default mongoose.model("Transaction", TransactionSchema)