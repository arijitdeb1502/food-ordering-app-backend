const mongoose = require('mongoose');

const categorySchema=new mongoose.Schema({
    category_name: {
        type: String,
        required:true
    }
},
{
    toJSON: {
        transform: function (doc,ret) {

            ret.id=ret._id;
            delete ret._id;
        
        }
    }
}
)

const Categories=mongoose.model('Category',categorySchema);

module.exports=Categories;