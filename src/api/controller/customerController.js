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
    const authorizationHeaderVal=req.headers.authorization.split(" - ");
    const bufferedCredentials=Buffer.from(authorizationHeaderVal[1],'base64');
    const decodedCredentials=bufferedCredentials.toString();
    

    console.log(decodedCredentials);
}

module.exports = {
    signup: signup,
    login: login
}