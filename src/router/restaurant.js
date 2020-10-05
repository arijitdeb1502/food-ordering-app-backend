const express = require('express');
const router = new express.Router();
const restaurantController=require('../api/controller/restaurantController');

router.get('/',
    restaurantController.getAllRestaurants
)

router.get('/name/:restaurant_name',
    restaurantController.getResataurantByName
)
 
router.get('/category/:category_id',
    restaurantController.getResataurantByCatId
)

module.exports = router;