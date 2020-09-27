const mongoose = require('mongoose');
//restaurant has a one to many relationship with address (one way)
//and one to one relation with category (one way)
const restaurantSchema=new mongoose.Schema({
        request_id : {
            type: String,
            required:true
        },
        restaurant_name : {
            type: String,
            required:true
        },
        photo_URL : {
            type: String,
            required: true
        },
        customer_rating:{
            type: Number,
            required: true
        },
        average_price: {
            type: Number,
            required: true
        },
        number_customers_rated: {
            type: Number,
            required: true
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Address'
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        }]
    },{ timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;