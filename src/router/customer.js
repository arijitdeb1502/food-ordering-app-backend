const express = require('express');
const router = new express.Router();
const customerController = require('../api/controller/customerController');
const reqValidator = require('../api/middleware/reqValidator')
const customerSchema = require('../api/requestSchema/signupCustomerRequestLayout');

router.post('/signup',
  reqValidator.validateBody(customerSchema.signupCustomerRequest),
  customerController.signup
);


module.exports = router;