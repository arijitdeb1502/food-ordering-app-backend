const mongoose = require('mongoose');
const validator = require('validator')


const addressSchema = mongoose.Schema({
    flat_building_name: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    state_uuid:{
        type: String,
        required: true
    },
    resident:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    }
})

const Address = mongoose.model('Address', addressSchema);

module.exports = Address