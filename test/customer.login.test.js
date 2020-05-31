const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../src/app');

const Customer = require('../src/db/model/customer');

const {  customerSuccessAllFlds } = require('./fixtures/customerData');
const base64EncodedCredentials='NjU5ODU4MTExMTphQmhpVGl0aGkxQDM=';
const base64EncodedCredentialsFailure2='NjU5ODU4MTExMWFCaGlUaXRoaTFAMw==';
const base64EncodedCredentialsFailure3='NjU5ODU4MTExOTphQmhpVGl0aGkxQDM=';

beforeEach(async () => {
    await Customer.deleteMany();
})

test('Testing the customer/login endpoint,SUCCESS Scenario1',async()=>{

    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds
            }).expect(201);

    const response=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentials)
                           .send().expect(200);

    expect(response.body.id).not.toBe(null);
    expect(response.body.first_name).toBe(customerSuccessAllFlds.first_name);
    expect(response.body.last_name).toBe(customerSuccessAllFlds.last_name);
    expect(response.body.email_address).toBe(customerSuccessAllFlds.email_address);
    expect(response.body.contact_number).toBe(customerSuccessAllFlds.contact_number);
    expect(response.body.message).toBe('LOGGED IN SUCCESSFULLY');

    const decoded = jwt.verify(response.header['access-token'], process.env.JWT_SECRET);

    expect(decoded._id).not.toBe(null);
    expect(decoded.iat).not.toBe(null);
    expect(decoded.exp).not.toBe(null);
    
    
})


test('Testing the customer/login endpoint,FAILURE Scenario1',async()=>{

    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds
            }).expect(201);

    const response=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentials+'-------')
                           .send().expect(400);

    expect(response.body.error).toBe('Invalid request! Authorization header is either not encoded properly or imporoper value provided');
    
})


test('Testing the customer/login endpoint,FAILURE Scenario2',async()=>{

    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds
            }).expect(201);

    const response=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentialsFailure2)
                           .send().expect(400);

    expect(response.body.error).toBe('Invalid request! Authorization header is either not encoded properly or imporoper value provided');
    
})

test('Testing the customer/login endpoint,FAILURE Scenario3',async()=>{

    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds
            }).expect(201);

    const response=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentialsFailure3)
                           .send().expect(401);

    expect(response.body.error).toBe('Either customer is not registered or has provided incorrect credentials');
    
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

    expect(response.body.error).toBe('Either customer is not registered or has provided incorrect credentials');
    
})