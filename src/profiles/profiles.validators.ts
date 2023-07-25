import * as Joi from 'joi';

export const postProfileSchema = {
    body: Joi.object({}).options({ abortEarly: false, stripUnknown: true }),
};
