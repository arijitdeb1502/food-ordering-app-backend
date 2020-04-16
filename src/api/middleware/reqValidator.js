const Joi = require('@hapi/joi');
const responses = require('../constants/response');

const validateObjectSchema = (data, schema) => {
    const result = Joi.validate(data, schema, { convert: false });
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
      let response = { ...responses.responseDetails.defaultResponse };
      const error = validateObjectSchema(req.body, schema);
      if (error) {
        response.body = error;
        response.message = responses.responseDetails.invalidRequestSchemaResponse.BAD_REQUEST;
        return res.status(response.status).send(response);
      }
  
      return next();
    }
  }
  
  module.exports={
      validateBody: validateBody
  }