import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})

export default mongoose.model("Transaction", TransactionSchema)