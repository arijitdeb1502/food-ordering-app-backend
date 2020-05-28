const request = require('supertest');
const bcrypt = require('bcryptjs');

const app = require('../src/app');

const Customer = require('../src/db/model/customer');

const {  
         customerSuccessAllFlds,
         customerSuccessNoLastName,
         customerFailureNoFirstName,
         customerFailureNoEmailAddress,
         customerFailureNoContact,
         customerFailureNoPassword,
         customerDuplicateFailure,
         customerInvalidEmailId,
         customerInvalidContactNumber,
         customerWeakPassword
      } = require('./fixtures/customerData');


beforeEach(async () => {
    await Customer.deleteMany();
})


test('Testing the customer/signup endpoint,SUCCESS Scenario1',async()=>{
  
    const response=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);

    const responseStatusMessage = JSON.parse(response.text).status;
    const responseIdValue = JSON.parse(response.text).id;

    expect(responseIdValue).not.toBe(null);
    expect(responseStatusMessage).toBe("CUSTOMER SUCCESSFULLY REGISTERED");

    let customer = await Customer.find( {
        contact_number: customerSuccessAllFlds.contact_number
    });

    expect(customer).not.toBe(null);
    expect(customer.length).toBe(1);

    const passwordIsMatch=await bcrypt.compare(customerSuccessAllFlds.password,customer[0].password);

    expect(customer[0].first_name).toBe(customerSuccessAllFlds.first_name);
    expect(customer[0].last_name).toBe(customerSuccessAllFlds.last_name);
    expect(customer[0].email_address).toBe(customerSuccessAllFlds.email_address);
    expect(customer[0].contact_number).toBe(customerSuccessAllFlds.contact_number);
    expect(passwordIsMatch).toBe(true);    

})


test('Testing the customer/signup endpoint,SUCCESS Scenario2',async()=>{
  
    const response=await request(app).post('/api/customer/signup').send({
        ...customerSuccessNoLastName
    }).expect(201);

    const responseStatusMessage = JSON.parse(response.text).status;
    const responseIdValue = JSON.parse(response.text).id;

    expect(responseIdValue).not.toBe(null);
    expect(responseStatusMessage).toBe("CUSTOMER SUCCESSFULLY REGISTERED");

    let customer = await Customer.find( {
        contact_number: customerSuccessNoLastName.contact_number
    });

    expect(customer).not.toBe(null);
    expect(customer.length).toBe(1);

    const passwordIsMatch=await bcrypt.compare(customerSuccessNoLastName.password,customer[0].password);

    expect(customer[0].first_name).toBe(customerSuccessNoLastName.first_name);
    expect(customer[0].last_name).toBe(customerSuccessNoLastName.last_name);
    expect(customer[0].email_address).toBe(customerSuccessNoLastName.email_address);
    expect(customer[0].contact_number).toBe(customerSuccessNoLastName.contact_number);
    expect(passwordIsMatch).toBe(true);    

})


test('Testing the customer/signup endpoint,FAILURE Scenario1',async()=>{
  
    const response=await request(app).post('/api/customer/signup').send({
        ...customerFailureNoFirstName
    }).expect(400);

    const responseStatusMessage = JSON.stringify(response.body.error);

    expect(responseStatusMessage.includes("Except last name all fields should be filled with proper values")).toBe(true);

    let customer = await Customer.find( {
        contact_number: customerFailureNoFirstName.contact_number
    });

    expect(customer[0]).toBe(undefined);
    expect(customer.length).toBe(0);

    
})


test('Testing the customer/signup endpoint,FAILURE Scenario2',async()=>{
  
    const response=await request(app).post('/api/customer/signup').send({
        ...customerFailureNoEmailAddress
    }).expect(400);

    const responseStatusMessage = JSON.stringify(response.body.error);

    expect(responseStatusMessage.includes("Except last name all fields should be filled with proper values")).toBe(true);

    let customer = await Customer.find( {
       contact_number: customerFailureNoEmailAddress.contact_number
    });

    expect(customer[0]).toBe(undefined);
    expect(customer.length).toBe(0);
    
})


test('Testing the customer/signup endpoint,FAILURE Scenario3',async()=>{
  
    const response=await request(app).post('/api/customer/signup').send({
        ...customerFailureNoContact
    }).expect(400);

    const responseStatusMessage = JSON.stringify(response.body.error);

    expect(responseStatusMessage.includes("Except last name all fields should be filled with proper values")).toBe(true);

    let customer = await Customer.find( {
       contact_number: customerFailureNoContact.contact_number
    });

    expect(customer[0]).toBe(undefined);
    expect(customer.length).toBe(0);
    
})


test('Testing the customer/signup endpoint,FAILURE Scenario4',async()=>{
  
    const response=await request(app).post('/api/customer/signup').send({
        ...customerFailureNoPassword
    }).expect(400);

    const responseStatusMessage = JSON.stringify(response.body.error);

    expect(responseStatusMessage.includes("Except last name all fields should be filled with proper values")).toBe(true);

    let customer = await Customer.find( {
       contact_number: customerFailureNoPassword.contact_number
    });

    expect(customer[0]).toBe(undefined);
    expect(customer.length).toBe(0);

})

test('Testing the customer/signup endpoint,FAILURE Scenario5',async()=>{
  
    await request(app).post('/api/customer/signup').send({
        ...customerDuplicateFailure
    })

    const response=await request(app).post('/api/customer/signup').send({
        ...customerDuplicateFailure
    }).expect(422);

    const responseStatusMessage = JSON.stringify(response.body.error);

    expect(responseStatusMessage.includes("This contact number is already registered! Try other contact number.")).toBe(true);

})

test('Testing the customer/signup endpoint,FAILURE Scenario6',async()=>{

    const response=await request(app).post('/api/customer/signup').send({
        ...customerInvalidEmailId
    }).expect(422);

    const responseStatusMessage = JSON.stringify(response.body.error);
    expect(responseStatusMessage.includes("Invalid email-id format!")).toBe(true);

    let customer = await Customer.find( {
        contact_number: customerInvalidEmailId.contact_number
     });
 
     expect(customer[0]).toBe(undefined);
     expect(customer.length).toBe(0);

})

test('Testing the customer/signup endpoint,FAILURE Scenario7',async()=>{

    const response=await request(app).post('/api/customer/signup').send({
        ...customerInvalidEmailId
    }).expect(422);

    const responseStatusMessage = JSON.stringify(response.body.error);
    expect(responseStatusMessage.includes("Invalid email-id format!")).toBe(true);

    let customer = await Customer.find( {
        contact_number: customerInvalidEmailId.contact_number
     });
 
     expect(customer[0]).toBe(undefined);
     expect(customer.length).toBe(0);

})

test('Testing the customer/signup endpoint,FAILURE Scenario8',async()=>{

    const response=await request(app).post('/api/customer/signup').send({
        ...customerInvalidContactNumber
    }).expect(422);

    const responseStatusMessage = JSON.stringify(response.body.error);
    console.log(responseStatusMessage);
    expect(responseStatusMessage.includes("Invalid contact Number!")).toBe(true);
    let customer = await Customer.find( {
        contact_number: customerInvalidContactNumber.contact_number
     });
 
     expect(customer[0]).toBe(undefined);
     expect(customer.length).toBe(0);

})

test('Testing the customer/signup endpoint,FAILURE Scenario9',async()=>{

    const response=await request(app).post('/api/customer/signup').send({
        ...customerWeakPassword
    }).expect(422);

    const responseStatusMessage = JSON.stringify(response.body.error);
    expect(responseStatusMessage.includes("Weak password!")).toBe(true);
    let customer = await Customer.find( {
        contact_number: customerWeakPassword.contact_number
     });
 
     expect(customer[0]).toBe(undefined);
     expect(customer.length).toBe(0);

})

