const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth-controllers');
const { validateBody } = require('../../utils');
const {
  registerSchema,
  loginSchema,
} = require('../../utils/validationSchemas/userValidationSchema');

router.post('/register', validateBody(registerSchema), ctrl.register);
router.post('/login', validateBody(loginSchema), ctrl.login);

module.exports = router;
