const customerSuccessAllFlds = {
    first_name : "Arijit",
    last_name : "Deb",
    email_address : "arijithere@gmail.com",
    contact_number : "6598581111",
    password : "aBhiTithi1@3"
}

const customerSuccessNoLastName = {
    first_name : "Auritra",
    last_name : "",
    email_address : "auri1251@gmail.com",
    contact_number : "6598582222",
    password : "aBhiTithi1@3"
}

const customerFailureNoFirstName = {
    first_name : "",
    last_name : "Mitra",
    email_address : "taniam@gmail.com",
    contact_number : "6598583333",
    password : "aBhihshs1@3"
}

const customerFailureNoEmailAddress = {
    first_name : "Anirban",
    last_name : "Mitra",
    email_address : "",
    contact_number : "6598584444",
    password : "aBhihshs1xz@3"
}

const customerFailureNoContact = {
    first_name : "Tania",
    last_name : "Khan",
    email_address : "taniK@gmail.com",
    contact_number : "",
    password : "aBhihshs1xz@3"
}

const customerFailureNoPassword = {
    first_name : "Tania",
    last_name : "Khan",
    email_address : "taniK@gmail.com",
    contact_number : "6598585555",
    password : ""
}

const customerDuplicateFailure = {
    first_name : "Tania",
    last_name : "Khan",
    email_address : "taniK@gmail.com",
    contact_number : "6598585555",
    password : "tAnia1@3Jan"
}

const customerInvalidEmailId = {
    first_name : "Tania",
    last_name : "Khan",
    email_address : "taniK@",
    contact_number : "6598585555",
    password : "tAnia1@3Jan"
}

const customerInvalidContactNumber = {
    first_name : "Tania",
    last_name : "Khan",
    email_address : "taniK@gmail.com",
    contact_number : "6598585555676",
    password : "tAnia1@3Jan"
}

const customerWeakPassword = {
    first_name : "Tania",
    last_name : "Khan",
    email_address : "taniK@gmail.com",
    contact_number : "6598585559",
    password : "tania"
}

const customerUpdateNameAllflds = {
    first_name : "Auritra",
    last_name : "Pal"
}

const customerUpdateNameNoLastNameflds = {
    first_name : "Auritra",
    last_name : ""
}

const customerUpdateNameNofirstNameflds = {
    first_name : "",
    last_name : "Pal"
}

const customerChangePasswordSuccess = {
    old_password : "aBhiTithi1@3",
    new_password : "aBhijan1@3"
}

const customerChangePasswordFailureNoOldPassword = {
    new_password : "aBhijan1@3"
}

const customerChangePasswordFailureNoNewPassword = {
    old_password : "aBhiTithi1@3"
}

const customerChangePasswordFailureIncorrectOldPassword = {
    old_password : "aBhiTithi2@3",
    new_password : "aBhijan1@3"
}

const customerChangePasswordFailureIncorrectNewPasswordFormat1 = {
    old_password : "aBhiTithi1@3",
    new_password : "password"
}

const customerChangePasswordFailureIncorrectNewPasswordFormat2 = {
    old_password : "aBhiTithi1@3",
    new_password : "aBhiBithi"
}

const customerChangePasswordFailureIncorrectNewPasswordFormat3 = {
    old_password : "aBhiTithi1@3",
    new_password : "aBhiBithi4"
}

const customerChangePasswordFailureIncorrectNewPasswordFormat4 = {
    old_password : "aBhiTithi1@3",
    new_password : "aBiT5@1"
}

module.exports= {
    customerSuccessAllFlds,
    customerSuccessNoLastName,
    customerFailureNoFirstName,
    customerFailureNoEmailAddress,
    customerFailureNoContact,
    customerFailureNoPassword,
    customerDuplicateFailure,
    customerInvalidEmailId,
    customerInvalidContactNumber,
    customerWeakPassword,
    customerUpdateNameAllflds,
    customerUpdateNameNoLastNameflds,
    customerUpdateNameNofirstNameflds,
    customerChangePasswordSuccess,
    customerChangePasswordFailureNoOldPassword,
    customerChangePasswordFailureNoNewPassword,
    customerChangePasswordFailureIncorrectOldPassword,
    customerChangePasswordFailureIncorrectNewPasswordFormat1,
    customerChangePasswordFailureIncorrectNewPasswordFormat2,
    customerChangePasswordFailureIncorrectNewPasswordFormat3,
    customerChangePasswordFailureIncorrectNewPasswordFormat4
}