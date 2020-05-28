const express = require('express');
const router = new express.Router();
const addressController = require('../api/controller/addressController');


router.get('/',
 addressController.getAllStates
)

module.exports = router;
