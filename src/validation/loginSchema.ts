import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.string()
        .min(2)
        .max(10)
        .required()
        .messages({
            'string.min': 'Username must be at least 2 characters',
            'string.max': 'Username must be less than 10 characters',
            'string.required': 'Username is required',
        }),

    password: Joi.string()
        .min(6)
        .max(10)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters',
            'string.max': 'Password must be less than 10 characters',
            'string.required': 'Password is required',
        }),
})