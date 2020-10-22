const responses = require('../../constants/response');
const Categories = require('../../db/model/category');

const categoryService = require('../../service/categoryService');

const getAllCategories = async (req,res)=>{

    let response=[];
    let returnCode=400;

    try{
        const categories=await categoryService.getAllCategories();
        categories.map((category)=>{
    
            response.push(category);

        })

        returnCode=responses.responseDetails.returnCodes.GENERIC_SUCCESS;

    }catch(error){
        console.log('Something went wrong: categoryController: getAllCategories', error);
            response={}
            response.error = error.message;
    }
    

    return res.status(returnCode).send(response);

}

const getCategoryById = async (req,res)=>{


    let response=[];
    let returnCode=400;

    try{

        const resFromService=await categoryService.getItemsByCategoryId(req.params.category_id);
        response=resFromService;
        returnCode=responses.responseDetails.returnCodes.GENERIC_SUCCESS;

    }catch(error){

        console.log('Something went wrong: categoryController: getCategoryById', error);
            response={}
            response.error = error.message;

            if ( error.message.includes('CNF-001')){
                response.error="No category Found by the given category_id!"
                returnCode=responses.responseDetails.returnCodes.RESOURCE_NOT_FOUND;
            }

    }
    

    res.status(returnCode).send(response);

}

module.exports = {
    getAllCategories:getAllCategories,
    getCategoryById:getCategoryById
}