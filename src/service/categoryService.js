const Category = require('../db/model/category');

const getAllCategories = async()=>{

    const categories=await Category.find();

    return categories;
}

module.exports = {
    getAllCategories: getAllCategories
}