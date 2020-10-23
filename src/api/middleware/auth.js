const jwt = require('jsonwebtoken');
const Customer = require('../../db/model/customer');
const AuthorizationFailedException = require('../../errors/AuthorizationFailedException');
const responses = require('../../constants/response')

const authenticate = ()=>{
    return async (req,res,next)=>{

        let response={}
        let returnCode;

        try{

            const token = req.headers.authorization.replace('Bearer ', '');

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.decoded=decoded;
            // console.log(JSON.stringify(req.originalUrl)+'XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
            return next();


        }catch(error){

            console.log('Something went wrong: auth: authenticate', error);
            
            response.error = 'Please authenticate.';
            returnCode=responses.responseDetails.returnCodes.UNAUTHORIZED;

            res.status(returnCode).send(response);

            // throw new AuthorizationFailedException('ATHR-001','Customer is not logged in!!');
        }
    }
}

const generateAuthTokenAndRespondToLogin = (req,res)=>{

    let response={};
    let returnCode;
    try{
        let {id,request_id,status,returnCode} = {...req};
        returnCode=req.returnCode;
        
        console.log(req.decoded+"ARIJIT");
        const token = jwt.sign({ _id: req.decoded._id.toString() }, process.env.JWT_SECRET , { expiresIn: '5 days' });
    
        res.setHeader('request-id',request_id);
        res.setHeader('access-token',token);

        response.id=id;
        response.status=status;
        // response.returnCode=returnCode;

    }catch(error){

        returnCode=responses.responseDetails.returnCodes.INTERNAL_SERVER_ERROR;
        response.error = 'Cannot generate Auth Token and send response!!';

        console.log('Error in auth generateAuthTokenAndRespondToUpdateRestaurany'+error);
        throw new AuthorizationFailedException('ATHR-006','Error generating JSON Web Token');

    }

    res.status(returnCode).send(response);
    
}

const generateAuthTokenAndRespondToUpdateCustomer = (req,res)=>{

    let response={};
    let returnCode;
    try{

        let {id,request_id,status} = {...req};
        returnCode=req.returnCode;

        const token = jwt.sign({ _id: req.decoded._id.toString() }, process.env.JWT_SECRET , { expiresIn: '5 days' });

        res.setHeader('request-id',request_id);
        res.setHeader('access-token',token);

        response.id=id;
        response.status=status;
    
    }catch(error){

        returnCode=responses.responseDetails.returnCodes.INTERNAL_SERVER_ERROR;
        response.error = 'Cannot generate Auth Token and send response!!';

        console.log('Error in auth generateAuthTokenAndRespondToLogin'+error);
        throw new AuthorizationFailedException('ATHR-006','Error generating JSON Web Token');

    }

    res.status(returnCode).send(response);

}

const sendUpdateAddressResponse = (req,res)=>{

    let response={};
    let returnCode;
    try{

        let {id,request_id,status} = {...req};
        returnCode=req.returnCode;

        const token = jwt.sign({ _id: req.decoded._id.toString() }, process.env.JWT_SECRET , { expiresIn: '5 days' });

        res.setHeader('request-id',request_id);
        res.setHeader('access-token',token);

        response.id=id;
        response.status=status;
    
    }catch(error){

        returnCode=responses.responseDetails.returnCodes.INTERNAL_SERVER_ERROR;
        response.error = 'Cannot generate Auth Token and send response!!';

        console.log('Error in auth generateAuthTokenAndRespondToLogin'+error);
        throw new AuthorizationFailedException('ATHR-006','Error generating JSON Web Token');

    }

    res.status(returnCode).send(response);

}

const sendGetAddressesResponse= (req,res)=>{

    let response={};
    let returnCode;
    try{

        let {request_id,responseFromController} = {...req};
        returnCode=req.returnCode;

        const token = jwt.sign({ _id: req.decoded._id.toString() }, process.env.JWT_SECRET , { expiresIn: '5 days' });

        res.setHeader('request-id',request_id);
        res.setHeader('access-token',token);

        response=responseFromController;
    
    }catch(error){

        returnCode=responses.responseDetails.returnCodes.INTERNAL_SERVER_ERROR;
        response.error = 'Cannot generate Auth Token and send response!!';

        console.log('Error in auth generateAuthTokenAndRespondToLogin'+error);
        throw new AuthorizationFailedException('ATHR-006','Error generating JSON Web Token');

    }

    res.status(returnCode).send(response);

}

const sendDeleteAddressResponse = (req,res)=>{

    let response={};
    let returnCode;
    try{

        let {id,request_id,status} = {...req};
        returnCode=req.returnCode;

        const token = jwt.sign({ _id: req.decoded._id.toString() }, process.env.JWT_SECRET , { expiresIn: '5 days' });

        res.setHeader('request-id',request_id);
        res.setHeader('access-token',token);

        response.id=id;
        response.status=status;
    
    }catch(error){

        returnCode=responses.responseDetails.returnCodes.INTERNAL_SERVER_ERROR;
        response.error = 'Cannot generate Auth Token and send response!!';

        console.log('Error in auth generateAuthTokenAndRespondToLogin'+error);
        throw new AuthorizationFailedException('ATHR-006','Error generating JSON Web Token');

    }

    res.status(returnCode).send(response);


}

const generateAuthTokenAndRespondToUpdateRestaurant = (req,res)=>{

    let response={};
    let returnCode;
    try{

        let {id,request_id,status} = {...req};
        returnCode=req.returnCode;

        const token = jwt.sign({ _id: req.decoded._id.toString() }, process.env.JWT_SECRET , { expiresIn: '5 days' });

        res.setHeader('request-id',request_id);
        res.setHeader('access-token',token);

        response.id=id;
        response.status=status;
    
    }catch(error){

        returnCode=responses.responseDetails.returnCodes.INTERNAL_SERVER_ERROR;
        response.error = 'Cannot generate Auth Token and send response!!';

        console.log('Error in auth generateAuthTokenAndRespondToUpdateRestaurant'+error);
        throw new AuthorizationFailedException('ATHR-006','Error generating JSON Web Token');

    }

    res.status(returnCode).send(response);

}


module.exports= {
    authenticate: authenticate,
    sendLoginResponse: generateAuthTokenAndRespondToLogin,
    sendUpdateCustomerResponse: generateAuthTokenAndRespondToUpdateCustomer,
    sendUpdateAddressResponse: sendUpdateAddressResponse,
    sendGetAddressesResponse: sendGetAddressesResponse,
    sendDeleteAddressResponse: sendDeleteAddressResponse,
    generateAuthTokenAndRespondToUpdateRestaurant: generateAuthTokenAndRespondToUpdateRestaurant
}