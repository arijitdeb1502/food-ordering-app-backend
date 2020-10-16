const responses = require('../../constants/response');
const restaurantService = require('../../service/restaurantService');
const RestaurantNotFoundException = require('../../errors/RestaurantNotFoundException');
const CategoryNotFoundException = require('../../errors/CategoryNotFoundException'); 

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

    let response={};
    let returnCode=400;

    
    try{
        if(req.params.category_id.split("").length!==24){
            response.error = "Category id field should not be empty or invalid!";
            // returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
            throw new CategoryNotFoundException("CNF-001","Category id field should not be empty or invalid!")
        }
        const responseFromService = await restaurantService.getRestaurantsByCategoryId(req.params.category_id);
        response=responseFromService;

    }catch(error){
        console.log('Something went wrong: restaurantController: getResataurantByCatId', error);    
        response.error = error.message;

        if(error.message.includes("CNF-002")){
            response.error = 'No category found by category Id';
            returnCode=responses.responseDetails.returnCodes.RESOURCE_NOT_FOUND;
        }
    }    

    res.status(returnCode).send(response);


}

const getResataurantByRestId = async(req,res)=>{

    let response={};
    let returnCode=400;

    const responseFromService=await restaurantService.getRestaurantsByRestId(req.params.restaurant_id)
    console.log(responseFromService);

    res.status(200).send({

    });

}

module.exports={
    getAllRestaurants: getAllRestaurants,
    getResataurantByName: getResataurantByName,
    getResataurantByCatId: getResataurantByCatId,
    getResataurantByRestId: getResataurantByRestId
}