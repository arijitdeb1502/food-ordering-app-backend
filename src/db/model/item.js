const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item_name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Category'
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
    item_type:{
        type: String,
        required: true
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;