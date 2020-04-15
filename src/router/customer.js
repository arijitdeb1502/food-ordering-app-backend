const express = require('express');
const router = new express.Router();
const customerController = require('../api/controller/customerController');

const customerSchema = require('../api/requestSchema/signupCustomerRequestLayout');