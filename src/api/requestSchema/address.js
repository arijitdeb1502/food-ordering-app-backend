const Joi = require('@hapi/joi');

const saveAddressRequest = Joi.object().keys({
    flat_building_name : Joi.string().required(),
    locality  : Joi.string().required(),
    city : Joi.string().required(),
    pincode : Joi.string().required(),
    state_uuid : Joi.string().required(),
})


module.exports = {
    saveAddressRequest: saveAddressRequest
}