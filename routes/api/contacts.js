const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts-controllers');
const { validateBody, validateId } = require('../../utils');
const { schemas } = require('../../models/contact');

router.get('/', ctrl.listContacts);

router.get('/:id', validateId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:id', validateId, ctrl.removeContact);

router.put(
  '/:id',
  validateId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  '/:id/favorite',
  validateId,
  validateBody(schemas.updateStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
