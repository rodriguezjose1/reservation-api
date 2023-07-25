import * as Joi from 'joi';

const phoneSchema = Joi.object({
    country_code_string: Joi.string().required(),
    country_code_number: Joi.number().required(),
    number: Joi.number().required(),
});

export const postUserSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: phoneSchema.required(),
    }).options({ abortEarly: false, stripUnknown: true }),
};
