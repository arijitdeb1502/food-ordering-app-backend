const uuid = require('uuid');

const responses = require('../../constants/response');
const customerService = require('../../service/customerService');
const SignUpRestrictedException = require('../../errors/SignUpRestrictedException');

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
        
        response.message = error.message;

        if ( response.message.includes("SGR-001")|| response.message.includes("SGR-002")||
             response.message.includes("SGR-003")||response.message.includes("SGR-004")) {
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
        response.first_name=responseFromLoginService.customer.first_name;
        response.last_name=responseFromLoginService.customer.last_name;
        response.email_address=responseFromLoginService.customer.email_address;
        response.contact_number=responseFromLoginService.customer.contact_number;

        returnCode=responses.responseDetails.returnCodes.AUTHENTICATION_SUCCESS;

    }catch(error){

        console.log('Something went wrong: customerController: login', error);
        response.message = error.message;
        if ( response.message.includes("ATH-001")|| response.message.includes("ATH-004")) {
            returnCode=responses.responseDetails.returnCodes.UNAUTHORIZED;
        }
   }
   
   return res.status(returnCode).send(response);

}
    


module.exports = {
    signup: signup,
    login: login
}