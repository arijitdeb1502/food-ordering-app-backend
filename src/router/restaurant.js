const express = require('express');
const router = new express.Router();
const restaurantController=require('../api/controller/restaurantController');
const auth = require('../api/middleware/auth');

router.get('/',
    restaurantController.getAllRestaurants
)

router.get('/name/:restaurant_name',
    restaurantController.getResataurantByName
)
 
router.get('/category/:category_id',
    restaurantController.getResataurantByCatId
)

router.get('/:restaurant_id',
    restaurantController.getResataurantByRestId           
)

router.put('/:restaurant_id',
    auth.authenticate(),
    restaurantController.updateRestaurantDetails(),
    auth.generateAuthTokenAndRespondToUpdateRestaurant
)

module.exports = router;