const request = require('supertest');
const bcrypt = require('bcryptjs');

const app = require('../src/app');

const Customer = require('../src/db/model/customer');

const {  
         customerSuccessAllFlds,
         customerChangePasswordSuccess,
         customerChangePasswordFailureNoOldPassword,
         customerChangePasswordFailureNoNewPassword,
         customerChangePasswordFailureIncorrectOldPassword,
         customerChangePasswordFailureIncorrectNewPasswordFormat1,
         customerChangePasswordFailureIncorrectNewPasswordFormat2,
         customerChangePasswordFailureIncorrectNewPasswordFormat3,
         customerChangePasswordFailureIncorrectNewPasswordFormat4
      } = require('./fixtures/customerData');

const base64EncodedCredentials='NjU5ODU4MTExMTphQmhpVGl0aGkxQDM=';
const improperAccesToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFkZTNmN2M3MjM4MDFlMzA0NWU2MTYiLCJpYXQiOjE1ODg0NTQ0NzUsImV4cCI6MTU4ODQ2MTY3NX0.DTS1cfkcG3fDj8BvWvGlt1YBCxg6fRgHYcrRNJt0ER0';



beforeEach(async () => {
    await Customer.deleteMany();
})


test('Testing the customer/  put / update name endpoint,SUCCESS Scenario1',async()=>{
  
    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);

    const responseLogin=await request(app)
                   .post('/api/customer/login')
                   .set('authorization',base64EncodedCredentials)
                   .send().expect(200);

    const responseUpdateCustName=await request(app)
                   .put('/api/customer/password')
                   .set('authorization',responseLogin.header['access-token'])
                   .send({
                        ...customerChangePasswordSuccess
                   }).expect(200);

    expect(responseUpdateCustName.body.id).not.toBe(null);
    expect(responseUpdateCustName.header['access-token']).not.toBe(null);
    expect(responseUpdateCustName.body.status).toBe('USER PASSWORD SUCCESSFULLY UPDATED');

    let customer = await Customer.find( {
        contact_number: customerSuccessAllFlds.contact_number
    });

    expect(customer[0].first_name).toBe(customerSuccessAllFlds.first_name);
    expect(customer[0].last_name).toBe(customerSuccessAllFlds.last_name);
    expect(customer[0].email_address).toBe(customerSuccessAllFlds.email_address);
    expect(customer[0].contact_number).toBe(customerSuccessAllFlds.contact_number);
    
    const passwordIsMatch=await bcrypt.compare(customerChangePasswordSuccess.new_password,customer[0].password);
    expect(passwordIsMatch).toBe(true);

})


test('Testing the customer/  put / update name endpoint,FAILURE Scenario1',async()=>{
  
    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);

    const responseLogin=await request(app)
                   .post('/api/customer/login')
                   .set('authorization',base64EncodedCredentials)
                   .send().expect(200);

    const responseUpdateCustName=await request(app)
                   .put('/api/customer/password')
                   .set('authorization',responseLogin.header['access-token'])
                   .send({
                        ...customerChangePasswordFailureNoOldPassword
                   }).expect(400);

    expect(responseUpdateCustName.body.error).toBe('Both old and new password must be provided');

})

test('Testing the customer/  put / update name endpoint,FAILURE Scenario2',async()=>{
  
    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);

    const responseLogin=await request(app)
                   .post('/api/customer/login')
                   .set('authorization',base64EncodedCredentials)
                   .send().expect(200);

    const responseUpdateCustName=await request(app)
                   .put('/api/customer/password')
                   .set('authorization',responseLogin.header['access-token'])
                   .send({
                        ...customerChangePasswordFailureNoNewPassword
                   }).expect(400);

    expect(responseUpdateCustName.body.error).toBe('Both old and new password must be provided');

})


test('Testing the customer/  put / update name endpoint,FALURE Scenario3',async()=>{
  
    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);


    const responseUpdateCustName=await request(app)
                   .put('/api/customer/password')
                   .set('authorization',improperAccesToken)
                   .send({
                        ...customerChangePasswordSuccess
                   }).expect(401);

    expect(responseUpdateCustName.body.error).toBe('Please authenticate.');

})

test('Testing the customer/  put / update name endpoint,FALURE Scenario4',async()=>{
  
    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);


    const responseUpdateCustName=await request(app)
                   .put('/api/customer/password')
                   .send({
                        ...customerChangePasswordSuccess
                   }).expect(401);

    expect(responseUpdateCustName.body.error).toBe('Please authenticate.');

})

test('Testing the customer/  put / update name endpoint,FAILURE Scenario5',async()=>{
  
    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);

    const responseLogin=await request(app)
                   .post('/api/customer/login')
                   .set('authorization',base64EncodedCredentials)
                   .send().expect(200);

    const responseUpdateCustName=await request(app)
                   .put('/api/customer/password')
                   .set('authorization',responseLogin.header['access-token'])
                   .send({
                        ...customerChangePasswordFailureIncorrectOldPassword
                   }).expect(401);

    expect(responseUpdateCustName.body.error).toBe('Old Password provided by the customer does not match');
    
    let customer = await Customer.find( {
        contact_number: customerSuccessAllFlds.contact_number
    });

    expect(customer[0].first_name).toBe(customerSuccessAllFlds.first_name);
    expect(customer[0].last_name).toBe(customerSuccessAllFlds.last_name);
    expect(customer[0].email_address).toBe(customerSuccessAllFlds.email_address);
    expect(customer[0].contact_number).toBe(customerSuccessAllFlds.contact_number);
    
    const passwordIsMatch=await bcrypt.compare(customerSuccessAllFlds.password,customer[0].password);
    expect(passwordIsMatch).toBe(true);

})

test('Testing the customer/  put / update name endpoint,FAILURE Scenario6',async()=>{
  
    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);

    const responseLogin=await request(app)
                   .post('/api/customer/login')
                   .set('authorization',base64EncodedCredentials)
                   .send().expect(200);

    const responseUpdateCustName=await request(app)
                   .put('/api/customer/password')
                   .set('authorization',responseLogin.header['access-token'])
                   .send({
                        ...customerChangePasswordFailureIncorrectNewPasswordFormat1
                   }).expect(422);

    expect(responseUpdateCustName.body.error).toBe('Weak password!');
    
    let customer = await Customer.find( {
        contact_number: customerSuccessAllFlds.contact_number
    });

    expect(customer[0].first_name).toBe(customerSuccessAllFlds.first_name);
    expect(customer[0].last_name).toBe(customerSuccessAllFlds.last_name);
    expect(customer[0].email_address).toBe(customerSuccessAllFlds.email_address);
    expect(customer[0].contact_number).toBe(customerSuccessAllFlds.contact_number);
    
    const passwordIsMatch=await bcrypt.compare(customerSuccessAllFlds.password,customer[0].password);
    expect(passwordIsMatch).toBe(true);

})

test('Testing the customer/  put / update name endpoint,FAILURE Scenario7',async()=>{
  
    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);

    const responseLogin=await request(app)
                   .post('/api/customer/login')
                   .set('authorization',base64EncodedCredentials)
                   .send().expect(200);

    const responseUpdateCustName=await request(app)
                   .put('/api/customer/password')
                   .set('authorization',responseLogin.header['access-token'])
                   .send({
                        ...customerChangePasswordFailureIncorrectNewPasswordFormat2
                   }).expect(422);

    expect(responseUpdateCustName.body.error).toBe('Weak password!');
    
    let customer = await Customer.find( {
        contact_number: customerSuccessAllFlds.contact_number
    });

    expect(customer[0].first_name).toBe(customerSuccessAllFlds.first_name);
    expect(customer[0].last_name).toBe(customerSuccessAllFlds.last_name);
    expect(customer[0].email_address).toBe(customerSuccessAllFlds.email_address);
    expect(customer[0].contact_number).toBe(customerSuccessAllFlds.contact_number);
    
    const passwordIsMatch=await bcrypt.compare(customerSuccessAllFlds.password,customer[0].password);
    expect(passwordIsMatch).toBe(true);

})

test('Testing the customer/  put / update name endpoint,FAILURE Scenario8',async()=>{
  
    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);

    const responseLogin=await request(app)
                   .post('/api/customer/login')
                   .set('authorization',base64EncodedCredentials)
                   .send().expect(200);

    const responseUpdateCustName=await request(app)
                   .put('/api/customer/password')
                   .set('authorization',responseLogin.header['access-token'])
                   .send({
                        ...customerChangePasswordFailureIncorrectNewPasswordFormat3
                   }).expect(422);

    expect(responseUpdateCustName.body.error).toBe('Weak password!');
    
    let customer = await Customer.find( {
        contact_number: customerSuccessAllFlds.contact_number
    });

    expect(customer[0].first_name).toBe(customerSuccessAllFlds.first_name);
    expect(customer[0].last_name).toBe(customerSuccessAllFlds.last_name);
    expect(customer[0].email_address).toBe(customerSuccessAllFlds.email_address);
    expect(customer[0].contact_number).toBe(customerSuccessAllFlds.contact_number);
    
    const passwordIsMatch=await bcrypt.compare(customerSuccessAllFlds.password,customer[0].password);
    expect(passwordIsMatch).toBe(true);

})

test('Testing the customer/  put / update name endpoint,FAILURE Scenario9',async()=>{
  
    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);

    const responseLogin=await request(app)
                   .post('/api/customer/login')
                   .set('authorization',base64EncodedCredentials)
                   .send().expect(200);

    const responseUpdateCustName=await request(app)
                   .put('/api/customer/password')
                   .set('authorization',responseLogin.header['access-token'])
                   .send({
                        ...customerChangePasswordFailureIncorrectNewPasswordFormat4
                   }).expect(422);

    expect(responseUpdateCustName.body.error).toBe('Weak password!');
    
    let customer = await Customer.find( {
        contact_number: customerSuccessAllFlds.contact_number
    });

    expect(customer[0].first_name).toBe(customerSuccessAllFlds.first_name);
    expect(customer[0].last_name).toBe(customerSuccessAllFlds.last_name);
    expect(customer[0].email_address).toBe(customerSuccessAllFlds.email_address);
    expect(customer[0].contact_number).toBe(customerSuccessAllFlds.contact_number);
    
    const passwordIsMatch=await bcrypt.compare(customerSuccessAllFlds.password,customer[0].password);
    expect(passwordIsMatch).toBe(true);

})