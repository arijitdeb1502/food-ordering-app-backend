const express = require('express');
const router = new express.Router();
const customerController = require('../api/controller/customerController');
const reqValidator = require('../api/middleware/reqValidator')
const base54Decoder = require('../api/middleware/base64Decoder');
const auth = require('../api/middleware/auth');
const customerSchema = require('../api/requestSchema/customer');

router.post('/signup',
  reqValidator.validateBody(customerSchema.signupCustomerRequest),
  customerController.signup
);

router.post('/login',
  base54Decoder.decode(),
  customerController.login(),
  auth.sendLoginResponse
)

router.post('/logout',
  auth.authenticate(),
  customerController.logout
)

router.put('/',
  reqValidator.validateBody(customerSchema.updateCustomerRequest),
  auth.authenticate(),
  customerController.updateCustomer(),
  auth.sendUpdateCustomerResponse
)

// router.put('/password',
//   reqValidator.validateBody(customerSchema.updatePasswordRequest),
//   auth.authenticate(),
//   customerController.updatePassword
// )

module.exports = router;