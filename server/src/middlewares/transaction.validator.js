import Joi from '@hapi/joi'

export const createTransactionValidator = Joi.object({
    value: Joi.number()
        .required()
})

export const updateTransactionValidator = Joi.object({
    value: Joi.number()
        .required()
})