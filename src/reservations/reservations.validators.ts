import * as Joi from 'joi';

export const postReservation = {
    body: Joi.object({
        company: Joi.string().required(),
        user: Joi.string().required(),
        design_element: Joi.string().required(),
        date_start: Joi.date().required(),
        date_end: Joi.date().optional(),
    }).options({ abortEarly: false, stripUnknown: true }),
};

export const putReservation = {
    body: Joi.object({
        status: Joi.string().optional(),
    })
        .min(1)
        .options({ abortEarly: false, stripUnknown: true }),
};
