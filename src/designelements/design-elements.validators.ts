import * as Joi from 'joi';

export const postDesignElements = {
    body: Joi.object({
        company: Joi.string().required(),
        design: Joi.string().required(),
        element: Joi.string().required(),
        parent_element: Joi.string().optional(),
        coordinates: Joi.array().items(Joi.number()).length(2).required(),
        height: Joi.number().required(),
        width: Joi.number().required(),
    }).options({ abortEarly: false, stripUnknown: true }),
};
