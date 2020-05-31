const responseDetails = {    
    // invalidRequestSchemaResponse : {
    //     BAD_REQUEST_MESSAGE : 'Invalid input request schema!!'
    // },
    returnCodes :{
        CREATE_SUCCESS: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        RESOURCE_NOT_FOUND: 404,
        UNPROCESSABLE_ENTITY : 422,
        INTERNAL_SERVER_ERROR : 500,
        AUTHENTICATION_SUCCESS :200,
        GENERIC_SUCCESS: 200

    },
    customerSignupSuccess: {
        message : 'CUSTOMER SUCCESSFULLY REGISTERED'
    },
    customerLogoutSuccess: {
        message : 'Logged out successfully'
    },
    customerUpdateSuccess: {
        message : 'USER DETAILS SUCCESSFULLY UPDATED'
    },
    passwordChangeSuccess: {
        message : 'USER PASSWORD SUCCESSFULLY UPDATED'
    },
    addressSaveSuccess: {
        message : 'ADDRESS SUCCESSFULLY SAVED'
    },
    addressDeleteSuccess: {
        message : 'ADDRESS DELETED SUCCESSFULLY'
    }
}

module.exports = {
    responseDetails: responseDetails
}