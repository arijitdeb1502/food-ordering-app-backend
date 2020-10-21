const { response } = require('express');
const uuid = require('uuid');

const responses = require('../../constants/response');
const itemService = require('../../service/itemService');

const getItemsOfRestaurant = async (req,res)=>{

    let response=[];
    let returnCode=400;

    try{
        const responseFromService = await itemService.getItemsOfRestaurant(req.params.restaurant_id);
        returnCode=responses.responseDetails.returnCodes.GENERIC_SUCCESS;
        response=responseFromService;
    
    }catch(error){
        console.log('Something went wrong: itemController: getItemsOfRestaurant', error);
        response.error=error.message;
        if ( error.message.includes('RNF-001')){
            response={}
            response.error = 'No restaurant by this id';
            returnCode=responses.responseDetails.returnCodes.RESOURCE_NOT_FOUND;
        }

    }
    
    
    return res.status(returnCode).send(response);


}

module.exports = {
    getItemsOfRestaurant: getItemsOfRestaurant
}