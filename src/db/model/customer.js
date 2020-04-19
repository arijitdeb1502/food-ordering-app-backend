const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const responses = require('../../constants/response');
const SignupRestrictedException=require('../../errors/SignUpRestrictedException');

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
            if(value.length<8){
                let messageCode=responses.responseDetails.customerSignupExceptions.weakPasswordException.exceptionCode;
                let messageText=responses.responseDetails.customerSignupExceptions.weakPasswordException.message;
                throw new Error(`${messageCode}:${messageText}`);
            }
        }
    }
},{
    toObject: {
        transform: function (doc, ret, options) {
          ret.id = ret._id;
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
      }
});


customerSchema.statics.findByContact = async (contact_number) =>{
    
    const customer=await Customer.findOne({contact_number});
    
    if (!customer) {
        throw new Error(`Customer with ${contact_number} not found`);
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