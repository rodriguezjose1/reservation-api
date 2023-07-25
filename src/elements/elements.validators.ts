import * as Joi from 'joi';

export const postElement = {
    body: Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        icon: Joi.string().required(),
    }).options({ abortEarly: false, stripUnknown: true }),
};
