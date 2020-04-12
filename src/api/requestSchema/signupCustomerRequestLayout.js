const Joi = require('@hapi/joi');

const signupCustomerRequest = Joi.object().keys({
    first_name : Joi.string().required(),
    last_name  : Joi.string().optional(),
    email_address : Joi.string().required(),
    contact_number : Joi.string().required(),
    password : Joi.string().required(),
})


module.exports = {
    signupCustomerRequest: signupCustomerRequest
}