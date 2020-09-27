const responses = require('../../constants/response');
const restaurantService = require('../../service/restaurantService')

const getAllRestaurants = async(req,res)=>{
    let responseArray=[];
    let response={};
    let returnCode=400;

    try{
        const responseFromService = await restaurantService.getAllRestaurants();
        response=responseFromService;
        returnCode=responses.responseDetails.returnCodes.GENERIC_SUCCESS;

    }catch(error){

        console.log('Something went wrong: restaurantController: getAllRestaurants', error);
        response={}
        response.error = error.message;
        returnCode=responses.responseDetails.returnCodes.INTERNAL_SERVER_ERROR;

    }
    return res.status(returnCode).send(response);

}

module.exports={
    getAllRestaurants: getAllRestaurants
}