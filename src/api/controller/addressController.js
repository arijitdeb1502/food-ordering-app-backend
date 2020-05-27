const uuid = require('uuid');

const responses = require('../../constants/response');
const addressService = require('../../service/addressService');

const saveAddress = ()=>{

    return async (req,res,next) =>{
    
        let response={  };
        let returnCode=400;
        const request_id=uuid.v4();
    
        try{
    
            const {flat_building_name,locality,city,pincode,state_uuid} = {...req.body};
            const responseFromService = await addressService.saveAddress({
                                                                        request_id,
                                                                        flat_building_name,
                                                                        locality,
                                                                        city,
                                                                        pincode,
                                                                        state_uuid,
                                                                        resident: req.decoded._id   
                                                                      });

            res.setHeader('location','address model');

            req.id=responseFromService.id;
            req.request_id=request_id;
            req.status=responses.responseDetails.addressSaveSuccess.message;
            req.returnCode=responses.responseDetails.returnCodes.CREATE_SUCCESS;

            next();
             
    
        }catch(error){
            
            console.log('Something went wrong: addressController: saveAddress', error);
            
            response.error = error.message;
    
            if ( error.message.includes("SAR-002")) {
                response.error = "Invalid pincode";
                returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
            } else if (error.message.includes("ANF-002")) {
                response.error = "No state by this id";
                returnCode=responses.responseDetails.returnCodes.RESOURCE_NOT_FOUND;
            } else if(error.message.includes("SAR-003")){
                response.error = "Flat and building name must be unique";
                returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
            }

            return res.status(returnCode).send(response);
    
        }
        
    }

}

const getAddresses = ()=>{

    return async (req,res,next) =>{
    
        let response={  };
        let returnCode=400;
        const request_id=uuid.v4();
    
        try{
    
            const responseFromService = await addressService.getAddresses({resident: req.decoded._id});

            response.addresses=responseFromService;
            req.request_id=request_id;
            req.responseFromController=response;
            req.returnCode=responses.responseDetails.returnCodes.GENERIC_SUCCESS;

            next();
             
    
        }catch(error){
            
            console.log('Something went wrong: addressController: getAddresses', error);
            
            response.error = error.message;
            returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
            
            return res.status(returnCode).send(response);
    
        }
        
    }

}

const deleteAddress= ()=>{

    return async (req,res,next) =>{
    
        let response={  };
        let returnCode=400;
        const request_id=uuid.v4();
    
        try{
    
            console.log(req.decoded._id+"Arijit Deb");
            console.log(req.params.address_id+"Arijit Deb");
            const responseFromService = await addressService.deleteAddress(req.decoded._id,req.params.address_id);

            // response.addresses=responseFromService;
            // req.request_id=request_id;
            // req.responseFromController=response;
            // req.returnCode=responses.responseDetails.returnCodes.GENERIC_SUCCESS;

            // next();
             
    
        }catch(error){
            
            console.log('Something went wrong: addressController: getAddresses', error);
            
            response.error = error.message;
            returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
            
            return res.status(returnCode).send(response);
    
        }
        
    }

}



module.exports = {
    saveAddress: saveAddress,
    getAddresses: getAddresses,
    deleteAddress: deleteAddress
}