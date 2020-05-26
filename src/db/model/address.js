const mongoose = require('mongoose');
const validator = require('validator');
const SaveAddressException = require('../../errors/SaveAddressException');


const addressSchema = mongoose.Schema({
    request_id : {
        type: String,
        required:true
    },
    flat_building_name: {
        type: String,
        unique: true,
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
        required: true,
        validate(value) {
            const regEx = /^[0-9]+$/;
            if(value.length!=6 || !value.match(regEx)){
                throw new SaveAddressException('SAR-002','Invalid Pincode!');
            }
        }
    },
    state:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'State'
    },
    resident:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    }
});

addressSchema.methods.getSaveAddressResponse = function(){
    
    const address=this;
    const addressObject = address.toObject();
    const ret = {};

    ret.id=addressObject._id;
    ret.flat_building_name=address.flat_building_name;
    ret.locality=address.locality;
    ret.city=address.city;
    ret.pincode=address.pincode;
    ret.state_uuid=address.state_uuid;
    ret.resident=address.resident;

    return ret;

}

const Address = mongoose.model('Address', addressSchema);

module.exports = Address