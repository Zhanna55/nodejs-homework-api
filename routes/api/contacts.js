const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts-controllers');
const { validateBody, validateId } = require('../../utils');
const {
  addSchema,
  updateStatusSchema,
} = require('../../utils/validationSchemas/contactValidationSchema');

router.get('/', ctrl.getContacts);

router.get('/:id', validateId, ctrl.getContactById);

router.post('/', validateBody(addSchema), ctrl.addContact);

router.delete('/:id', validateId, ctrl.removeContact);

router.put('/:id', validateId, validateBody(addSchema), ctrl.updateContact);

router.patch(
  '/:id/favorite',
  validateId,
  validateBody(updateStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
