const responses = require('../../constants/response');
const Categories = require('../../db/model/category');

const categoryService = require('../../service/categoryService');

const getAllCategories = async (req,res)=>{

    const categories=await categoryService.getAllCategories();

    res.status(200).send(categories);

}

module.exports = {
    getAllCategories:getAllCategories
}