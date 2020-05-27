const bcrypt = require('bcryptjs'); 
const Address = require('../db/model/address');
const State = require('../db/model/state');
const mongoose = require('mongoose');

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
      
      const newAddress = new Address({  request_id, flat_building_name, locality, city , pincode , state:state._id ,resident });
      let result = await newAddress.save();
      return result.getSaveAddressResponse();
      
    } catch (error) {
      console.log('Something went wrong: addressService: saveAddress', error);
      throw new Error(error);
    }
  }


const getAddresses = async(resident)=>{

  try{

      const addresses=await Address.find(resident._id).sort({"createdAt": 1});
      
      const response={}
      const respAddresses=[];
      
      for (address of addresses){
        await address.populate('state').execPopulate();
        const respAddress={}
        respAddress.id=address._id;
        respAddress.flat_building_name=address.flat_building_name;
        respAddress.locality=address.locality;
        respAddress.city=address.city;
        respAddress.pincode=address.pincode;
        respAddress.state=address.state;

        respAddresses.push(respAddress)
      }

      return respAddresses;

  }catch(error){

    console.log('Something went wrong: addressService: getAddresses', error);
    throw new Error(error);

  }

}


const deleteAddress=async(resident_id,address_id)=>{

  try{

    // const address = await Address.findOneAndDelete({ _id: address_id, resident: resident_id })
    console.log(resident_id+"resident_id");
    console.log(address_id+"address_id");
    
    const address = await Address.findOne({ _id: address_id, resident: resident_id });

    console.log(address+"deleteAddress");

  }catch(error){

    console.log('Something went wrong: addressService: deleteAddress', error);
    throw new Error(error);

  }


}

module.exports = {
      saveAddress: saveAddress,
      getAddresses: getAddresses,
      deleteAddress: deleteAddress
}