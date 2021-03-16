import Joi from '@hapi/joi'

export const createTransactionValidator = Joi.object({
    amount: Joi.number()
        .required(),
    isAdded: Joi.boolean(),
    isExpenses: Joi.boolean(),
    isIncome: Joi.boolean()
})

export const updateTransactionValidator = Joi.object({
    amount: Joi.number()
        .required(),
    isAdded: Joi.boolean(),
    isExpenses: Joi.boolean(),
    isIncome: Joi.boolean()
})