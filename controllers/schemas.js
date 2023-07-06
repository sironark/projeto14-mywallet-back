import Joi from "joi";

export const schemaSignUp = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(3).required(),
})

export const schemaLogin = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(3).required(),
})