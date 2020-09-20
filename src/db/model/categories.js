const mongoose = require('mongoose');

const categoriesSchema=new mongoose.Schema({
    category_name: {
        type: String,
        required:true
    }
})

const Categories=mongoose.model('Categories',categoriesSchema);

module.exports=categoriesSchema;