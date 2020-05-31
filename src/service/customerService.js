const bcrypt = require('bcryptjs'); 
const Customer = require('../db/model/customer');
const SignUpRestrictedException = require('../errors/SignUpRestrictedException');
const UpdateCustomerException = require('../errors/UpdateCustomerException');

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

      return { 
        customer
      };
    }catch(error) {
      console.log('Something went wrong: customerService: login', error);
      throw new Error(error);
    }
  }

  const logout = async (id)=>{

    try{
      const customer=await Customer.findOne({'_id': id });

      if(!customer){
            throw new AuthorizationFailedException('ATHR-001','Customer is not Logged in.');
      }

      return customer;

    }catch(error){
      
      console.log('Something went wrong: customerService: logout', error);
      throw new Error(error);
    }

  }

  const update = async (request_id,customer_id,updatedFlds)=>{

    try{
      const customer=await Customer.findOne({'_id': customer_id });

      if(!customer){
            throw new AuthorizationFailedException('ATHR-001','Customer is not Logged in.');
      }
      
      for(fields in updatedFlds){
        customer[fields]=updatedFlds[fields];
      }

      const updatedCustomer = await customer.save();

      return updatedCustomer;

    }catch(error){
      
      console.log('Something went wrong: customerService: logout', error);
      throw new Error(error);
    }

  }

  const updatePassword = async (request_id,customer_id,updatedFlds)=>{

    try{
      const customer=await Customer.findOne({'_id': customer_id });

      if(!customer){
            throw new AuthorizationFailedException('ATHR-001','Customer is not Logged in.');
      }

      const isMatch = await bcrypt.compare(updatedFlds.old_password, customer.password);
      
      if(!isMatch){
        throw new UpdateCustomerException('UCR-004','Incorrect old password!');
      }

      customer['password']=updatedFlds['new_password'];

      const updatedCustomer = await customer.save();

      return updatedCustomer;

    }catch(error){
      
      console.log('Something went wrong: customerService: logout', error);
      throw new Error(error);
    }

  }

  module.exports = {
      signup: signup,
      login: login,
      logout: logout,
      update: update,
      updatePassword: updatePassword
  }