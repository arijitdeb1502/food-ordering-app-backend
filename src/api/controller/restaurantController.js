const responses = require('../../constants/response');
const restaurantService = require('../../service/restaurantService');
const RestaurantNotFoundException = require('../../errors/RestaurantNotFoundException');

const getAllRestaurants = async(req,res)=>{
    let response={};
    let returnCode=400;

    try{
        const responseFromService = await restaurantService.getAllRestaurants();
        response.restaurants=responseFromService;
        returnCode=responses.responseDetails.returnCodes.GENERIC_SUCCESS;

    }catch(error){

        console.log('Something went wrong: restaurantController: getAllRestaurants', error);
        response={}
        response.error = error.message;
        returnCode=responses.responseDetails.returnCodes.INTERNAL_SERVER_ERROR;

    }
    return res.status(returnCode).send(response);

}

const getResataurantByName=async (req,res)=>{

    let response={};
    let returnCode=400;

    try{

        const responseFromService = await restaurantService.getResataurantByName(req.params.restaurant_name);
        response.restaurants=responseFromService;
        returnCode=responses.responseDetails.returnCodes.GENERIC_SUCCESS;

    }catch(error){
        
        console.log('Something went wrong: restaurantController: getResataurantByName', error);    
        response.error = error.message;

        if ( error.message.includes('RNF-003')) {
            response.error = 'Restuarant Field Name should not be empty!';
            returnCode=responses.responseDetails.returnCodes.RESOURCE_NOT_FOUND;
        }

    }

    return res.status(returnCode).send(response);

}

const getResataurantByCatId=async (req,res)=>{

    const responseFromService = await restaurantService.getRestaurantsByCategoryId(req.params.category_id);


    res.status(200).send(responseFromService);


}

module.exports={
    getAllRestaurants: getAllRestaurants,
    getResataurantByName: getResataurantByName,
    getResataurantByCatId: getResataurantByCatId
}