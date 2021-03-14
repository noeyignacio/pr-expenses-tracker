import Joi from '@hapi/joi'

export const createTransactionValidator = Joi.object({
    amount: Joi.number()
        .required()
})

export const updateTransactionValidator = Joi.object({
    amount: Joi.number()
        .required()
})