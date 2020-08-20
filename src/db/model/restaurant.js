const mongoose = require('mongoose');

const restaurantSchema=new mongoose.Schema({
        request_id : {
            type: String,
            required:true
        },
    },{ timestamps: true });