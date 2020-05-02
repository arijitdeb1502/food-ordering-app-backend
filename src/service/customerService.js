const Customer = require('../db/model/customer');
const SignUpRestrictedException = require('../errors/SignUpRestrictedException');

const signup = async ({ request_id,first_name, last_name , email_address , contact_number, password }) => {
    try {
        
      const customer = await Customer.findOne({ contact_number });
      if (customer) {
          throw new SignUpRestrictedException('SGR-001', 'This contact number is already registered! Try other contact number.');
      }
      
      const newCustomer = new Customer({  request_id, first_name, last_name , email_address , contact_number,password });
      let result = await newCustomer.save();
      return result.getCustomerSignUpResponse();
      
    } catch (error) {
      console.log('Something went wrong: customerService: signup', error);
      throw new Error(error);
    }
  }

  const login = async(contact_number,password)=>{

    try {
      const customer = await Customer.findByCredential(contact_number,password);
      const token = await customer.generateAuthToken();
      
      return { 
        customer,
        token
      };
    }catch(error) {
      console.log('Something went wrong: customerService: findCustomerByCredential', error);
    }
  }

  module.exports = {
      signup: signup,
      login: login
  }