const mongoose = require('mongoose');
const validator = require('validator');
const responses = require('../../constants/response')

const customerSchema = new mongoose.Schema({
    first_name : {
        type: String,
        required: true,
        trim: true
    },
    last_name : {
        type: String,
        trim: true
    },
    email_address : {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                let messageCode=responses.responseDetails.customerSignupExceptions.invalidEmailException.exceptionCode;
                let messageText=responses.responseDetails.customerSignupExceptions.invalidEmailException.message;
                throw new Error(`${messageCode}:${messageText}`);
            }
        }
    },
    contact_number : {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length!=10){
                let messageCode=responses.responseDetails.customerSignupExceptions.invalidContactException.exceptionCode;
                let messageText=responses.responseDetails.customerSignupExceptions.invalidContactException.message;  
                throw new Error(`${messageCode}:${messageText}`);
            }
        }
    },
    password : {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length!=8){
                let messageCode=responses.responseDetails.customerSignupExceptions.weakPasswordException.exceptionCode;
                let messageText=responses.responseDetails.customerSignupExceptions.weakPasswordException.message;
                throw new Error(`${messageCode}:${messageText}`);
            }
        }
    }
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer