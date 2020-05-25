const bcrypt = require('bcryptjs'); 
const Address = require('../db/model/address');
const State = require('../db/model/state');

const SaveAddressException = require('../errors/SaveAddressException');
const UpdateCustomerException = require('../errors/UpdateCustomerException');
const AddressNotFoundException = require('../errors/AddressNotFoundException');

const saveAddress = async ({ request_id,flat_building_name,locality, city , pincode , state_uuid, resident }) => {
    try {
        
      const state = await State.findOne({ state_uuid });
      if (!state) {
          throw new AddressNotFoundException('ANF-002', 'No state by this id');
      }

      const address = await Address.findOne({ flat_building_name });
      if (address) {
        throw new SaveAddressException('SAR-003', 'combination of flat and building name must be unique');
    }
      
      const newAddress = new Address({  request_id, flat_building_name, locality, city , pincode , state_uuid,resident });
      let result = await newAddress.save();
      return result.getSaveAddressResponse();
      
    } catch (error) {
      console.log('Something went wrong: addressService: saveAddress', error);
      throw new Error(error);
    }
  }

//   const login = async(contact_number,password)=>{

//     try {

//       const customer = await Customer.findByCredential(contact_number,password);

//       return { 
//         customer
//       };
//     }catch(error) {
//       console.log('Something went wrong: customerService: login', error);
//       throw new Error(error);
//     }
//   }

//   const logout = async (id)=>{

//     try{
//       const customer=await Customer.findOne({'_id': id });

//       if(!customer){
//             throw new AuthorizationFailedException("ATHR-001","Customer is not Logged in.");
//       }

//       return customer;

//     }catch(error){
      
//       console.log('Something went wrong: customerService: logout', error);
//       throw new Error(error);
//     }

//   }

//   const update = async (request_id,customer_id,updatedFlds)=>{

//     try{
//       const customer=await Customer.findOne({'_id': customer_id });

//       if(!customer){
//             throw new AuthorizationFailedException("ATHR-001","Customer is not Logged in.");
//       }
      
//       for(fields in updatedFlds){
//         customer[fields]=updatedFlds[fields];
//       }

//       const updatedCustomer = await customer.save();

//       return updatedCustomer;

//     }catch(error){
      
//       console.log('Something went wrong: customerService: logout', error);
//       throw new Error(error);
//     }

//   }

//   const updatePassword = async (request_id,customer_id,updatedFlds)=>{

//     try{
//       const customer=await Customer.findOne({'_id': customer_id });

//       if(!customer){
//             throw new AuthorizationFailedException("ATHR-001","Customer is not Logged in.");
//       }

//       const isMatch = await bcrypt.compare(updatedFlds.old_password, customer.password);
      
//       if(!isMatch){
//         throw new UpdateCustomerException("UCR-004","Incorrect old password!");
//       }

//       customer["password"]=updatedFlds["new_password"];

//       const updatedCustomer = await customer.save();

//       return updatedCustomer;

//     }catch(error){
      
//       console.log('Something went wrong: customerService: logout', error);
//       throw new Error(error);
//     }

//   }

  module.exports = {
      saveAddress: saveAddress
  }