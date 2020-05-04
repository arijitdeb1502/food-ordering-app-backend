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


const login = async (req,res)=>{
   
    let response={  };
    let returnCode;
    
    try {
        
        const responseFromLoginService = await customerService.login(req.headers.decoded_contact_number,req.headers.decoded_password);
        res.setHeader('request-id',responseFromLoginService.customer.request_id);
        res.setHeader('access-token',responseFromLoginService.token);
        response.id=responseFromLoginService.customer._id;
        response.message="LOGGED IN SUCCESSFULLY";
        response.first_name=responseFromLoginService.customer.first_name;
        response.last_name=responseFromLoginService.customer.last_name;
        response.email_address=responseFromLoginService.customer.email_address;
        response.contact_number=responseFromLoginService.customer.contact_number;

        returnCode=responses.responseDetails.returnCodes.AUTHENTICATION_SUCCESS;

    }catch(error){

        console.log('Something went wrong: customerController: login', error);
        response.error = error.message;
        if ( error.message.includes("ATH-001")|| error.message.includes("ATH-004")) {
            response.error = "Either customer is not registered or has provided incorrect credentials";
            returnCode=responses.responseDetails.returnCodes.UNAUTHORIZED;
        }
   }
   
   return res.status(returnCode).send(response);

}


const logout = async (req,res) => {

    let response={  };
    let returnCode;

    try {
            req.customer.tokens = req.customer.tokens.filter((token) => {
                return token.token !== req.token
            })

            const responseFromLogoutService=await customerService.logout(req.customer);
             
            response.id=responseFromLogoutService._id;
            response.message=responses.responseDetails.customerLogoutSuccess.message;
            returnCode=responses.responseDetails.returnCodes.AUTHENTICATION_SUCCESS;

    } catch (error) {

        console.log('Something went wrong: customerController: logout', error);
        response.error = error.message;

    }

    return res.status(returnCode).send(response);

}
    


module.exports = {
    signup: signup,
    login: login,
    logout: logout
}