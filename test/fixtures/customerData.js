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

module.exports= {
    customerSuccessAllFlds,
    customerSuccessNoLastName,
    customerFailureNoFirstName
}