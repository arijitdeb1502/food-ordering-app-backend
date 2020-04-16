const responseDetails = {
    defaultResponse : {
        status : 400,
        message: '',
        body:{

        }
    },
    invalidRequestSchemaResponse : {
        BAD_REQUEST : "Invalid input request schema!!"
    },
    customerSignupExceptions : {
        duplicateContactException : {
            exceptionCode : "SGR-001",
            message : "This contact number is already registered! Try other contact number."
        },
        emptyFormFieldException : {
            exceptionCode : "SGR-005",
            message : "Except last name all fields should be filled."
        },
        invalidEmailException : {
            exceptionCode : "SGR-002",
            message : "Invalid email-id format!"
        },
        invalidContactException : {
            exceptionCode : "SGR-003",
            message : "Invalid contact number!"
        },
        weakPasswordException : {
            exceptionCode : "SGR-004",
            message : "Weak password!"
        }
    },
    customerSignupSuccess: {
        status : 201,
        message : "CUSTOMER SUCCESSFULLY REGISTERED"
    }
}

module.exports = {
    responseDetails: responseDetails
}