const express = require('express');
const router = new express.Router();
const addressController = require('../api/controller/addressController');
const reqValidator = require('../api/middleware/reqValidator')
// const base54Decoder = require('../api/middleware/base64Decoder');
const auth = require('../api/middleware/auth');
const addressSchema = require('../api/requestSchema/address');

router.post('/',
  reqValidator.validateBody(addressSchema.saveAddressRequest),
  auth.authenticate(),
  addressController.saveAddress()
//   auth.sendUpdateAddressResponse
);

// router.post('/login',
//   base54Decoder.decode(),
//   customerController.login(),
//   auth.sendLoginResponse
// )

// router.post('/logout',
//   auth.authenticate(),
//   customerController.logout
// )

// router.put('/',
//   reqValidator.validateBody(customerSchema.updateCustomerRequest),
//   auth.authenticate(),
//   customerController.updateCustomer(),
//   auth.sendUpdateCustomerResponse
// )

// router.put('/password',
//   reqValidator.validateBody(customerSchema.updatePasswordRequest),
//   auth.authenticate(),
//   customerController.changePassword(),
//   auth.sendUpdateCustomerResponse
// )

module.exports = router;