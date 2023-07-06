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

export const schemaTransaction = Joi.object({
    value:Joi.number().precision(2).positive().required(),
    discription: Joi.string().required(),
    type: Joi.string().valid("entrada","saida")
})