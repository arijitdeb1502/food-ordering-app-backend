const Joi = require('@hapi/joi');
const responses = require('../../constants/response');

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
      const error = validateObjectSchema(req.body, schema);
      if (error) {
        response.message = responses.responseDetails.invalidRequestSchemaResponse.BAD_REQUEST_MESSAGE;
        returnCode=responses.responseDetails.returnCodes.BAD_REQUEST;
        return res.status(returnCode).send(response);
      }
  
      return next();
    }
  }
  
  module.exports={
      validateBody: validateBody
  }