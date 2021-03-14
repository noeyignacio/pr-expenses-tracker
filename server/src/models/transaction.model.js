import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    isAdded: {
        type: Boolean,
    }
}, {
    timestamps: true,
})

export default mongoose.model("Transaction", TransactionSchema)