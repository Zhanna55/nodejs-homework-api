const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth-controllers');
const { validateBody } = require('../../utils');
const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require('../../utils/validationSchemas/userValidationSchema');
const authenticate = require('../../middlewares/authenticate');

router.post('/register', validateBody(registerSchema), ctrl.register);
router.post('/login', validateBody(loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post('/logout', authenticate, ctrl.logout);
router.patch(
  '/',
  authenticate,
  validateBody(updateSubscriptionSchema),
  ctrl.updateSubscription
);
module.exports = router;
