const isBase64 = require('is-base64');

const responses = require('../../constants/response');
const AuthenticationFailedException = require('../../errors/AuthenticationFailedException');


const decode = ()=>{

    return (req,res,next)=>{

        let response = { };
        let returnCode;

        try {

            const authorizationHeaderVal=req.headers.authorization;

            if(!isBase64(authorizationHeaderVal)){
                throw new AuthenticationFailedException('ATH-003','Incorrect format of decoded customer name and password');
            }

            const bufferedCredentials=Buffer.from(authorizationHeaderVal,'base64');
            const decodedCredentials=bufferedCredentials.toString();
            const contact_number=decodedCredentials.split(":")[0];
            const password=decodedCredentials.split(":")[1];
            
            if(contact_number && password){
                req.headers.decoded_contact_number=contact_number;
                req.headers.decoded_password=password;
            }else{
                throw new AuthenticationFailedException('ATH-004','Either or both of phone number and password are not provided');
           
            }

            return next();
    
        } catch(error) {

            console.log('Something went wrong: base64decoder: decode', error);

            response.message = error.message;

            if ( response.message.includes("ATH-003")||response.message.includes("ATH-004")){
                returnCode=responses.responseDetails.returnCodes.BAD_REQUEST;
            }

            return res.status(returnCode).send(response);
        
        }   
    }
}

module.exports = {
    decode: decode
}