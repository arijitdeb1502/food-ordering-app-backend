const responseDetails = {    
    // invalidRequestSchemaResponse : {
    //     BAD_REQUEST_MESSAGE : "Invalid input request schema!!"
    // },
    returnCodes :{
        CREATE_SUCCESS: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        UNPROCESSABLE_ENTITY : 422,
        INTERNAL_SERVER_ERROR : 500

    },
    customerSignupSuccess: {
        message : "CUSTOMER SUCCESSFULLY REGISTERED"
    }
}

module.exports = {
    responseDetails: responseDetails
}