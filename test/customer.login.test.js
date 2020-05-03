const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../src/app');

const Customer = require('../src/db/model/customer');

const {  customerSuccessAllFlds } = require('./fixtures/customerData');
const base64EncodedCredentials="NjU5ODU4MTExMTphQmhpVGl0aGkxQDM=";
const base64EncodedCredentialsFailure2="NjU5ODU4MTExMWFCaGlUaXRoaTFAMw==";
const base64EncodedCredentialsFailure3="NjU5ODU4MTExOTphQmhpVGl0aGkxQDM=";

beforeEach(async () => {
    await Customer.deleteMany();
})

// test('Testing the customer/login endpoint,SUCCESS Scenario1',async()=>{

//     //First signup the customer
//     const responseSignup=await request(app).post('/api/customer/signup').send({
//                 ...customerSuccessAllFlds
//             }).expect(201);

//     const response=await request(app)
//                            .post('/api/customer/login')
//                            .set('authorization',base64EncodedCredentials)
//                            .send().expect(200);

//     //console.log(response);

//     expect(response.body.id).not.toBe(null);
//     expect(response.body.first_name).toBe(customerSuccessAllFlds.first_name);
//     expect(response.body.last_name).toBe(customerSuccessAllFlds.last_name);
//     expect(response.body.email_address).toBe(customerSuccessAllFlds.email_address);
//     expect(response.body.contact_number).toBe(customerSuccessAllFlds.contact_number);

//     // console.log(response.header);
    
//     const decoded = jwt.verify(response.header["access-token"], process.env.JWT_SECRET);
//     // console.log(decoded);

//     expect(decoded._id).not.toBe(null);
//     expect(decoded.iat).not.toBe(null);
//     expect(decoded.exp).not.toBe(null);
    
    
// })


// test('Testing the customer/login endpoint,FAILURE Scenario1',async()=>{

//     //First signup the customer
//     const responseSignup=await request(app).post('/api/customer/signup').send({
//                 ...customerSuccessAllFlds
//             }).expect(201);

//     const response=await request(app)
//                            .post('/api/customer/login')
//                            .set('authorization',base64EncodedCredentials+"-------")
//                            .send().expect(400);

//     // console.log(response.body.message);

//     expect(response.body.message).toBe("ATH-003:Incorrect format of decoded customer name and password");
    
// })


// test('Testing the customer/login endpoint,FAILURE Scenario2',async()=>{

//     //First signup the customer
//     const responseSignup=await request(app).post('/api/customer/signup').send({
//                 ...customerSuccessAllFlds
//             }).expect(201);

//     const response=await request(app)
//                            .post('/api/customer/login')
//                            .set('authorization',base64EncodedCredentialsFailure2)
//                            .send().expect(400);

//     // console.log(response.body.message);

//     expect(response.body.message).toBe("ATH-004:Either or both of phone number and password are not provided");
    
// })

test('Testing the customer/login endpoint,FAILURE Scenario3',async()=>{

    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds
            }).expect(201);

    const response=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentialsFailure3)
                           .send().expect(401);

    // console.log(response.body.message);

    expect(response.body.message.includes("ATH-001:This contact number has not been registered!")).toBe(true);
    
})


test('Testing the customer/login endpoint,FAILURE Scenario4',async()=>{

    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds
            }).expect(201);

    const response=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentialsFailure3)
                           .send().expect(401);

    // console.log(response.body.message);

    expect(response.body.message.includes("ATH-001:This contact number has not been registered!")).toBe(true);
    
})