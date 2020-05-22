const Joi = require('@hapi/joi');
const responses = require('../../constants/response');
const SignUpRestrictedException = require('../../errors/SignUpRestrictedException');
const UpdateCustomerException = require('../../errors/UpdateCustomerException')

const validateObjectSchema = (data, schema) => {
    const result = schema.validate(data);
    if (result.error) {

      const errorDetails = result.error.details.map(value => {
          return {
            error: value.message,
            path: value.path
          };
      });
      
      return errorDetails;
    }
    return null;
  }

  const validateBody = (schema) => {

    return (req, res, next) => {
      let response = { };
      let returnCode;

      try{ 
        const error = validateObjectSchema(req.body, schema);

        if (error) {
          if(req.originalUrl==="/api/customer/signup" && req.method==="POST") {
            throw new SignUpRestrictedException('SGR-005','Except last name all fields should be filled with proper values')
          }else if ((req.originalUrl==="/api/customer") && req.method==="PUT"){
            throw new UpdateCustomerException('UCR-002','First name field should not be empty');
          }else if((req.originalUrl==="/api/customer/password") && req.method==="PUT"){
            throw new UpdateCustomerException('UCR-003','No field should be empty');
          }
        }

      }catch(error){
        console.log('Something went wrong: reqValidator: validateBody', error);
        response.error = 'Invalid request body!';
        returnCode=responses.responseDetails.returnCodes.BAD_REQUEST;

        if ( error.message.includes("SGR-005")){

          response.error = 'Except last name all fields should be filled with proper values';
          
        } else if( error.message.includes("UCR-002") ){

          response.error = 'First name field should not be empty';
        
        } else if( error.message.includes("UCR-003") ){
      
          response.error = 'Both old and new password must be provided';
      
        }

        return res.status(returnCode).send(response);

      }
      
  
      return next();
    }
  }
  
  module.exports={
      validateBody: validateBody
  }