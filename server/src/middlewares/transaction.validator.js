import Joi from '@hapi/joi'

export const createTransactionValidator = Joi.object({
    amount: Joi.number()
        .required(),
    createdAt: Joi.date(),
    isAdded: Joi.boolean(),
    transactionMethod: Joi.string(),
})

export const updateTransactionValidator = Joi.object({
    amount: Joi.number()
        .required(),
    createdAt: Joi.date(),
    isAdded: Joi.boolean(),
    transactionMethod: Joi.string(),
})