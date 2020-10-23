const uuid = require('uuid');

const responses = require('../../constants/response');
const customerService = require('../../service/customerService');

const signup = async (req,res) =>{
    
    let response={  };
    let returnCode=400;
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

        if ( error.message.includes('SGR-001')){
            response.error = 'This contact number is already registered! Try other contact number.';
            returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
        } else if(error.message.includes('SGR-002')){
            response.error = 'Invalid email-id format!';
            returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
        }else if(error.message.includes('SGR-003')){
            response.error = 'Invalid contact Number!';
            returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
        }else if(error.message.includes('SGR-004')){
            response.error = 'Weak password!';
            returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
        }
    }

    return res.status(returnCode).send(response);
}


const login = ()=>{

    return async (req,res,next)=>{
   
        let response={  };
        let returnCode=400;
        const request_id=uuid.v4();
        res.setHeader('request-id',request_id);

    
        try {
        
            const responseFromLoginService = await customerService.login(req.headers.decoded_contact_number,req.headers.decoded_password);
            
            req.customer=responseFromLoginService.customer;
            req.respMessage='LOGGED IN SUCCESSFULLY';
            req.returnCode=responses.responseDetails.returnCodes.AUTHENTICATION_SUCCESS;

            next();

        }catch(error){

            console.log('Something went wrong: customerController: login', error);
            response.error = error.message;
            if ( error.message.includes('ATH-001')|| error.message.includes('ATH-004')||error.message.includes('ATH-002')) {
                response.error = 'Either customer is not registered or has provided incorrect credentials';
                returnCode=responses.responseDetails.returnCodes.UNAUTHORIZED;
            }

            res.status(returnCode).send(response);
        }

    }
}

const logout = async (req,res) => {

    let response={  };
    let returnCode=400;

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

const updateCustomer = ()=>{

    return async (req,res,next)=>{
        
        let response={  };
        let returnCode=400;
    
        const request_id=uuid.v4();

        try{
            const responseFromService = await customerService.update(request_id,req.decoded._id,req.body);
            res.setHeader('location','customer model');

            req.id=responseFromService.id;
            req.request_id=request_id;
            req.status=responses.responseDetails.customerUpdateSuccess.message;
            req.returnCode=responses.responseDetails.returnCodes.GENERIC_SUCCESS;

            next();

        } catch(error){
            console.log('Something went wrong: customerController: updateCustomer', error);
            response.error = error.message;
            if ( error.message.includes('ATH-001')) {
                response.error = 'Either customer is not registered or has logged out';
                returnCode=responses.responseDetails.returnCodes.UNAUTHORIZED;
            }

            res.status(returnCode).send(response);
        }
        
    }
} 
    

const changePassword= ()=>{

    return async (req,res,next)=>{
        
        let response={  };
        let returnCode=400;
    
        const request_id=uuid.v4();

        try{
            const responseFromService = await customerService.updatePassword(request_id,req.decoded._id,req.body);

            res.setHeader('location','customer model');

            req.id=responseFromService.id;
            req.request_id=request_id;
            req.status=responses.responseDetails.passwordChangeSuccess.message;
            req.returnCode=responses.responseDetails.returnCodes.GENERIC_SUCCESS;

            next();

        } catch(error){
            console.log('Something went wrong: customerController: updateCustomer', error);
            response.error = error.message;

            if ( error.message.includes('ATH-001')) {
                response.error = 'Either customer is not registered or has logged out';
                returnCode=responses.responseDetails.returnCodes.UNAUTHORIZED;
            }
            else if(error.message.includes('UCR-004')){
                response.error = 'Old Password provided by the customer does not match';
                returnCode=responses.responseDetails.returnCodes.UNAUTHORIZED;
            } else if(error.message.includes('SGR-004')) {
                response.error = 'Weak password!';
                returnCode=responses.responseDetails.returnCodes.UNPROCESSABLE_ENTITY;
            }

            res.status(returnCode).send(response);
        }
        
    }
} 


module.exports = {
    signup: signup,
    login: login,
    logout: logout,
    updateCustomer: updateCustomer,
    changePassword: changePassword
}