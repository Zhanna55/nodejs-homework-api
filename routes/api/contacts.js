const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts-controllers');
const {
  addSchema,
  updateStatusSchema,
} = require('../../schemas/validateSchema');
const validateBody = require('../../utils/validateBody');

router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', validateBody(addSchema), ctrl.addContact);

router.delete('/:id', ctrl.removeContact);

router.put('/:id', validateBody(addSchema), ctrl.updateContact);
router.patch(
  '/:id/favorite',
  validateBody(updateStatusSchema),
  ctrl.updateStatusContact
);
module.exports = router;
