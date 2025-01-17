const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': `missing field "favorite"`,
  }),
});

module.exports = {
  addSchema,
  updateStatusSchema,
};
