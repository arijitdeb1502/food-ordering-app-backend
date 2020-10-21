const express = require('express');
const router = new express.Router();
const itemController = require('../api/controller/itemController');

router.get('/:restaurant_id',
  itemController.getItemsOfRestaurant
  
)

module.exports = router;