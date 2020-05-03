const jwt = require('jsonwebtoken');
const Customer = require('../../db/model/customer');
const AuthorizationFailedException = require('../../errors/AuthorizationFailedException');
const responses = require('../../constants/response')

const authenticate = ()=>{
    return async (req,res,next)=>{

        let response={}
        let returnCode;

        try{

            const token = req.headers.authorization.split(' - ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const customer = await Customer.findOne({'tokens.token': token });

            if(!customer){
                throw new AuthorizationFailedException("ATHR-001","Customer is not Logged in.");
            }

            req.customer=customer;
            req.token=token;

            return next();


        }catch(error){

            console.log('Something went wrong: auth: authenticate', error);
            
            response.message = error.message;

            if ( response.message.includes("ATHR-001")||response.message.includes("jwt")){
                returnCode=responses.responseDetails.returnCodes.UNAUTHORIZED;
            }

            res.status(returnCode).send({ error: 'Please authenticate.' });
        }
    }
}

module.exports= {
    authenticate: authenticate
}