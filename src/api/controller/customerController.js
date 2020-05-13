const uuid = require('uuid');

const responses = require('../../constants/response');
const customerService = require('../../service/customerService');

const signup = async (req,res) =>{
    
    let response={  };
    let returnCode;
    const request_id=uuid.v4();
    res.setHeader('request-id',request_id);

    try{

        const responseFromService = await customerService.signup({
                                                                    ...req.body,
                                                                    request_id   
                                                                  });
        res.setHeader('location','customer model')
        response.id=responseFromService.id;
        response.status=responses.responseDetails.customerSignupSuccess.message;
        returnCode=responses.responseDetails.returnCodes.CREATE_SUCCESS;
         

    }catch(error){
        
        console.log('Something went wrong: customerController: signup', error);
        
        response.error = error.message;

        if ( error.message.includes("SGR-001")||error.message.includes("SGR-002")||
             error.message.includes("SGR-003")||error.message.includes("SGR-004")) {
            response.error = "request was well-formed but server unable to process due to semantic errors";
            returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
        } 

    }

    return res.status(returnCode).send(response);
}


const login = ()=>{

    return async (req,res,next)=>{
   
        let response={  };
        let returnCode;
    
        try {
        
            const responseFromLoginService = await customerService.login(req.headers.decoded_contact_number,req.headers.decoded_password);
            
            req.customer=responseFromLoginService.customer;
            req.respMessage="LOGGED IN SUCCESSFULLY";
            req.returnCode=responses.responseDetails.returnCodes.AUTHENTICATION_SUCCESS;

            next();

        }catch(error){

            console.log('Something went wrong: customerController: login', error);
            response.error = error.message;
            if ( error.message.includes("ATH-001")|| error.message.includes("ATH-004")) {
                response.error = "Either customer is not registered or has provided incorrect credentials";
                returnCode=responses.responseDetails.returnCodes.UNAUTHORIZED;
            }

            res.status(returnCode).send(response);
        }

    }
}


const logout = async (req,res) => {

    let response={  };
    let returnCode;

    try {
        
            const responseFromLogoutService=await customerService.logout(req.decoded._id);
             
            response.id=responseFromLogoutService._id;
            response.message=responses.responseDetails.customerLogoutSuccess.message;
            returnCode=responses.responseDetails.returnCodes.AUTHENTICATION_SUCCESS;

    } catch (error) {

        console.log('Something went wrong: customerController: logout', error);
        response.error = error.message;
        returnCode=responses.responseDetails.returnCodes.INTERNAL_SERVER_ERROR;

    }

    return res.status(returnCode).send(response);

}
    


module.exports = {
    signup: signup,
    login: login,
    logout: logout
}