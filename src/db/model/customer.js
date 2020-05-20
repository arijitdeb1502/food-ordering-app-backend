const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');

const responses = require('../../constants/response');
const SignupRestrictedException=require('../../errors/SignUpRestrictedException');
const AuthenticationFailedException=require('../../errors/AuthenticationFailedException');

const customerSchema = new mongoose.Schema({
    request_id : {
        type: String,
        required:true
    },
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
                throw new SignupRestrictedException('SGR-002','Invalid email-id format!');
            }
        }
    },
    contact_number : {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length!=10){
                throw new SignupRestrictedException('SGR-003','Invalid contact number!');
            }
        }
    },
    password : {
        type: String,
        required: true,
        trim: true,
        validate(value) {

            const schema = new passwordValidator();
            const regex = /[#@$%&*!^]/g;

            schema
            .is().min(8)
            .has().digits()
            .has().uppercase()
            .has(regex)

            if(!schema.validate(value)) {
                throw new SignupRestrictedException('SGR-004','Weak password!');
            }

        }
    }
});

customerSchema.methods.getCustomerSignUpResponse = function(){
    
    const customer=this;
    const customerObject = customer.toObject();
    const ret = {};

    ret.id=customerObject._id;
    delete ret.request_id;
    delete ret._id;
    delete ret.first_name;
    delete ret.last_name;
    delete ret.email_address;
    delete ret.contact_number;
    delete ret.password;
    delete ret.__v;

    return ret;

}

customerSchema.statics.findByCredential = async (contact_number,password) =>{
    
    const customer=await Customer.findOne({contact_number});

    if (!customer) {
        throw new AuthenticationFailedException('ATH-001','This contact number has not been registered!');
    }
    
    const isMatch = await bcrypt.compare(password, customer.password);
    
    if (!isMatch) {
        throw new AuthenticationFailedException('ATH-002','Invalid Credentials');
    }
    
    return customer;

}


// Hash the plain text password before saving
customerSchema.pre('save', async function (next) {
    const customer = this

    if (customer.isModified('password')) {
        customer.password = await bcrypt.hash(customer.password, 8)
    }

    next()
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer