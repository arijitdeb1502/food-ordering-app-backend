const mongoose = require('mongoose');

const categorySchema=new mongoose.Schema({
    category_name: {
        type: String,
        required:true
    }
})

const Categories=mongoose.model('Category',categorySchema);

module.exports=categorySchema;