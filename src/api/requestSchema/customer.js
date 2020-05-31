const Joi = require('@hapi/joi');

const signupCustomerRequest = Joi.object().keys({
    first_name : Joi.string().required(),
    last_name  : Joi.string().allow(''),
    email_address : Joi.string().required(),
    contact_number : Joi.string().required(),
    password : Joi.string().required(),
})

const updateCustomerRequest = Joi.object().keys({
    first_name : Joi.string().required(),
    last_name  : Joi.string().allow('')
})

const updatePasswordRequest = Joi.object().keys({
    old_password : Joi.string().required(),
    new_password  : Joi.string().required()
})

module.exports = {
    signupCustomerRequest: signupCustomerRequest,
    updateCustomerRequest: updateCustomerRequest,
    updatePasswordRequest: updatePasswordRequest
}