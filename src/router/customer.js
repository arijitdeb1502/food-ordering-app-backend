const express = require('express');
const router = new express.Router();
const customerController = require('../api/controller/customerController');
const reqValidator = require('../api/middleware/reqValidator')
const base54Decoder = require('../api/middleware/base64Decoder');
const customerSchema = require('../api/requestSchema/signupCustomerRequestLayout');

router.post('/signup',
  reqValidator.validateBody(customerSchema.signupCustomerRequest),
  customerController.signup
);

router.post('/login',
  base54Decoder.decode(),
  customerController.login
)


module.exports = router;