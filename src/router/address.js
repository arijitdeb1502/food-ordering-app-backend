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
  addressController.saveAddress(),
  auth.sendUpdateAddressResponse
);

router.get('/customer',
  auth.authenticate(),
  addressController.getAddresses()
  // auth.sendGetAddressesResponse
);

module.exports = router;