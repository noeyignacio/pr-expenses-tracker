import { Router } from 'express'

import {
    helloWorld,
    getAllTransactions,
    createTransaction,
    deleteTransaction,
} from '../controllers/transaction.controller.js'

const router = Router()

router.get('/hello', helloWorld)

/* Transaction Routes (APIs) */
router.get('/getAll', getAllTransactions)
router.post('/create', createTransaction)
router.delete('/delete/:id', deleteTransaction)

export default router;