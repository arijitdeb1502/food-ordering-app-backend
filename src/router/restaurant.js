const express = require('express');
const router = new express.Router();
const restaurantController=require('../api/controller/restaurantController');

router.get('/',
    restaurantController.getAllRestaurants
)

module.exports = router;