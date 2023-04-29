const Joi = require('joi');
const subscriptionList = ['starter', 'pro', 'business'];

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.valid(...subscriptionList).required(),
});

module.exports = {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
  updateSubscriptionSchema,
};
