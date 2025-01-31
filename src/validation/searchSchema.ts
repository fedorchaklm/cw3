import Joi from "joi";

export const searchSchema = Joi.object({
    search: Joi.string()
        // .min(3)
        // .max(10)
        .required()
        .messages({
            // 'string.min': 'Word must be at least 3 characters',
            // 'string.max': 'Username must be less than 10 characters',
            'string.required': 'Username is required',
        }),
});