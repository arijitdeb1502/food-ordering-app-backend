const responses = require('../../constants/response');
const customerService = require('../../service/customerService');
const SignUpRestrictedException = require('../../errors/SignUpRestrictedException');

const signup = async (req,res) =>{
    
    let response={  };
    let returnCode;
    
    try{

        const responseFromService = await customerService.signup(req.body);
        response.id=responseFromService.id;
        response.status=responses.responseDetails.customerSignupSuccess.message;
        returnCode=responses.responseDetails.returnCodes.CREATE_SUCCESS;
         

    }catch(error){
        
        console.log('Something went wrong: customerController: signup', error);
        
        response.message = error.message;
        
        if ( response.message.includes("SGR-001")) {
            returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
        }

    }

    return res.status(returnCode).send(response);
}

module.exports = {
    signup: signup
}