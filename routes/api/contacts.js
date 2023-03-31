const express = require('express');
const router = express.Router();
const Joi = require('joi');
const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const validateSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `"name" is required`,
  }),
  email: Joi.string().required().messages({
    'any.required': `"email" is required`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `"phone" is required`,
  }),
});
router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    if (!result) {
      throw HttpError(400, 'Contact with this number is exist');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json({
      message: 'Contact deleted',
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
