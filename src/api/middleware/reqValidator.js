const Joi = require('@hapi/joi');
const responses = require('../../constants/response');
const SignUpRestrictedException = require('../../errors/SignUpRestrictedException');

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
          throw new SignUpRestrictedException('SGR-005','Except last name all fields should be filled with proper values')
        }

      }catch(error){
        console.log('Something went wrong: reqValidator: validateBody', error);
        response.message = error.message;

        if ( response.message.includes("SGR-005")){
          returnCode=responses.responseDetails.returnCodes.BAD_REQUEST;
        }

        return res.status(returnCode).send(response);

      }
      
  
      return next();
    }
  }
  
  module.exports={
      validateBody: validateBody
  }