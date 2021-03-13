import { Router } from 'express'

import {
    helloWorld,
    getAllTransactions,
    createTransaction,
} from '../controllers/transaction.controller.js'

const router = Router()

router.get('/hello', helloWorld)
router.get('/getAllTransactions', getAllTransactions)
router.post('/createTransaction', createTransaction)

export default router;