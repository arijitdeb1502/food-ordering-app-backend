const express = require('express');
const router = new express.Router();
const categoryController = require('../api/controller/categoryController');

router.get('/category',
    categoryController.getAllCategories
)

router.get('/category/:category_id',
    categoryController.getCategoryById
)

module.exports = router;