const responseDetails = {
    customerSignup : {
        duplicateContactException : {
            messageCode : "SGR-001",
            respText : "This contact number is already registered! Try other contact number."
        },
        emptyFormFieldException : {
            messageCode : "SGR-005",
            respText : "Except last name all fields should be filled."
        },
        invalidEmailException : {
            messageCode : "SGR-002",
            respText : "Invalid email-id format!"
        },
        invalidContactException : {
            messageCode : "SGR-003",
            respText : "Invalid contact number!"
        },
        weakPasswordException : {
            messageCode : "SGR-004",
            respText : "Weak password!"
        },
        successResponse : {
            respText : "CUSTOMER SUCCESSFULLY REGISTERED"
        }
    }
}

module.exports = {
    responseDetails: responseDetails
}