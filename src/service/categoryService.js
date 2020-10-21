const Category = require('../db/model/category');

const getAllCategories = async()=>{

    try{
        
        const categories=await Category.find();
        return categories;

    }catch(error){
        throw new Error(error);
    }
    
}

module.exports = {
    getAllCategories: getAllCategories
}