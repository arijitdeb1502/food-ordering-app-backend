const responses = require('../../constants/response');
const customerService = require('../../service/customerService');

const signup = async (req,res) =>{
    
    let response={ ...responses.responseDetails.defaultResponse };
    
    try{

        const responseFromService = await customerService.signup(req.body);
        response.status=responses.responseDetails.customerSignupSuccess.status;
       //response.message=responses.responseDetails.customerSignupSuccess.message;
        response.id=responseFromService.id;   

    }catch(error){
        console.log('Something went wrong: customerController: signup', error);
        response.message = error.message;
    }
    
    return res.status(response.status).send(response);
}

module.exports = {
    signup: signup
}