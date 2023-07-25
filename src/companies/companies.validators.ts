import * as Joi from 'joi';

export const postCompanySchema = {
    body: Joi.object({
        name: Joi.string().required(),
    }).options({ abortEarly: false, stripUnknown: true }),
};
