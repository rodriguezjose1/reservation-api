import * as Joi from 'joi';

export const postDesign = {
    body: Joi.object({
        company: Joi.string().required(),
        name: Joi.string().required(),
        descrption: Joi.string().optional().default(''),
    }).options({ abortEarly: false, stripUnknown: true }),
};
