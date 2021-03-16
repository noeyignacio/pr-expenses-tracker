// Model 
import Transaction from '../models/transaction.model.js'
import { createTransactionValidator } from '../middlewares/transaction.validator.js'

export const helloWorld = async (req, res) => {
    res.status(200).json({
        message: "Hello World!"
    })
}

// Getting all the transactions
export const getAllTransactions = async (req, res) => {
    try {
        const transaction = await Transaction.find()
        if(transaction.length == 0) {
            // Server Response
            console.log("NO_TRANSACTION_AVAILABLE")
            // Web Response
            res.status(200).json({
                message: "No Transaction Available Yet."
            })
        } else {
            res.status(200).json(
                transaction
            )
        }
    } catch (error) {
        // Server Response
        console.log(`ERROR: ` + error.message)
        // Web Response
        res.status(500).json({
            message: "An Error Occured.",
            error: error.message
        })
    }
}

// Creating transaction
export const createTransaction = async(req, res) => {
    try {
        const newTransaction = new Transaction({
            amount: req.body.amount,
            isExpenses: req.body.isExpenses,
            isAdded: true,
            transactionMethod: req.body.transactionMethod,
        })
        const transaction = await createTransactionValidator.validateAsync(req.body)
        if (transaction) {
            await newTransaction
                .save()
                .then(() => {
                    // Server Response
                    console.log("TRANSACTION_CREATED_SUCCESSFULLY")
                    // Web Response
                    res.status(200).json({
                        amount: req.body.amount,
                        isAdded: req.body.isAdded,
                        isExpenses: req.body.isExpenses,
                        message: "Transaction Created Successfully."
                    })
                })
        }
    } catch (error) {
        // Server Response
        console.log(`ERROR: ` + error.message)
        // Web Response
        res.status(500).json({
            message: "Creating Transaction Failed.",
            error: error.message
        })
    }
}

// Deleting transaction
export const deleteTransaction = async(req, res) => {
    try {
        const deleteTransaction = await Transaction.findByIdAndDelete({
            _id: req.params.id
        })
        if(!deleteTransaction) {
            // Server Response
            console.log("TRANSACTION_ID_NOT_FOUND")
            // Web Response
            res.status(404).json({
                message: "Transaction Not Found."
            })
        } else {
            // Server Response
            console.log("TRANSACTION_DELETED_SUCCESSFULLY")
            // Web Response
            res.status(200).json({
                message: "Transaction Deleted Successfully."
            })
        }
    } catch (error) {
        // Server Response
        console.log(`ERROR: ` + error.message)
        // Web Response
        res.status(500).json({
            message: "Deleting Transaction Error.",
            error: error.message
        })
    }
}