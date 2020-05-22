const jwt = require('jsonwebtoken');
const Customer = require('../../db/model/customer');
const AuthorizationFailedException = require('../../errors/AuthorizationFailedException');
const responses = require('../../constants/response')

const authenticate = ()=>{
    return async (req,res,next)=>{

        let response={}
        let returnCode;

        try{

            const token = req.headers.authorization;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.decoded=decoded;

            return next();


        }catch(error){

            console.log('Something went wrong: auth: authenticate', error);
            
            response.error = "Please authenticate.";

            if ( error.message.includes("jwt")){
                returnCode=responses.responseDetails.returnCodes.UNAUTHORIZED;
            }

            res.status(returnCode).send(response);
        }
    }
}

const generateAuthTokenAndRespondToLogin = (req,res)=>{

    let response={};
    let returnCode;
    try{
        let {customer,respMessage} = {...req};
        returnCode=req.returnCode;
        
        const token = jwt.sign({ _id: customer._id.toString() }, process.env.JWT_SECRET , { expiresIn: '55 minute' });
    
        res.setHeader('request-id',customer.request_id);
        res.setHeader('access-token',token);

        response.id=customer._id;
        response.message=respMessage;
        response.first_name=customer.first_name;
        response.last_name=customer.last_name;
        response.email_address=customer.email_address;
        response.contact_number=customer.contact_number;

    }catch(error){

        returnCode=responses.responseDetails.returnCodes.INTERNAL_SERVER_ERROR;
        response.error = "Cannot generate Auth Token and send response!!";

        console.log('Error in auth generateAuthTokenAndRespondToLogin'+error);
        throw new AuthorizationFailedException("ATHR-006","Error generating JSON Web Token");

    }

    res.status(returnCode).send(response);
    
}

const generateAuthTokenAndRespondToUpdateCustomer = (req,res)=>{

    let response={};
    let returnCode;
    try{

        let {id,request_id,status} = {...req};
        returnCode=req.returnCode;

        const token = jwt.sign({ _id: id.toString() }, process.env.JWT_SECRET , { expiresIn: '55 minute' });

        res.setHeader('request-id',request_id);
        res.setHeader('access-token',token);

        response.id=id;
        response.status=status;
    
    }catch(error){

        returnCode=responses.responseDetails.returnCodes.INTERNAL_SERVER_ERROR;
        response.error = "Cannot generate Auth Token and send response!!";

        console.log('Error in auth generateAuthTokenAndRespondToLogin'+error);
        throw new AuthorizationFailedException("ATHR-006","Error generating JSON Web Token");

    }

    res.status(returnCode).send(response);

}

module.exports= {
    authenticate: authenticate,
    sendLoginResponse: generateAuthTokenAndRespondToLogin,
    sendUpdateCustomerResponse: generateAuthTokenAndRespondToUpdateCustomer
}