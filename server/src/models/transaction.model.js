import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    isAdded: {
        type: Boolean,
    },
    isExpenses: {
        type: Boolean,
    },
    isIncome: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
    }
})

export default mongoose.model("Transaction", TransactionSchema)