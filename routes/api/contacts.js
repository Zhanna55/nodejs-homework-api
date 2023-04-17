const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts-controllers');
const { validateBody, validateId } = require('../../utils');
const authenticate = require('../../middlewares/authenticate');
const {
  addSchema,
  updateStatusSchema,
} = require('../../utils/validationSchemas/contactValidationSchema');

router.get('/', authenticate, ctrl.getContacts);

router.get('/:id', authenticate, validateId, ctrl.getContactById);

router.post('/', authenticate, validateBody(addSchema), ctrl.addContact);

router.delete('/:id', authenticate, validateId, ctrl.removeContact);

router.put(
  '/:id',
  authenticate,
  validateId,
  validateBody(addSchema),
  ctrl.updateContact
);

router.patch(
  '/:id/favorite',
  authenticate,
  validateId,
  validateBody(updateStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
