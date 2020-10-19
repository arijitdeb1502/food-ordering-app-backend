const mongoose = require('mongoose');
const InvalidRatingException= require('../../errors/InvalidRatingException');

//restaurant has a one to many relationship with address (one way)
//and one to one relation with category (one way)
const restaurantSchema=new mongoose.Schema({
        // request_id : {
        //     type: String,
        //     required:true
        // },
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
            required: true,
            validate(value) {
                // if (!validator.isEmail(value)) {
                //     throw new SignupRestrictedException('SGR-002','Invalid email-id format!');
                // }
                if( value < 1 || value > 5 ){
                    throw new InvalidRatingException("IRE-001","Restaurant should be in the range of 1 to 5");
                }
            }
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