const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../src/app');

const Customer = require('../src/db/model/customer');

const {  customerSuccessAllFlds } = require('./fixtures/customerData');
const base64EncodedCredentials="NjU5ODU4MTExMTphQmhpVGl0aGkxQDM=";
const improperAccesToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFkZTNmN2M3MjM4MDFlMzA0NWU2MTYiLCJpYXQiOjE1ODg0NTQ0NzUsImV4cCI6MTU4ODQ2MTY3NX0.DTS1cfkcG3fDj8BvWvGlt1YBCxg6fRgHYcrRNJt0ER0";


beforeEach(async () => {
    await Customer.deleteMany();
})

test('Testing the customer/login endpoint,SUCCESS Scenario1',async()=>{

    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds
            }).expect(201);

    const responseLogin=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentials)
                           .send().expect(200);

    console.log(responseLogin.header["access-token"]);

    const responseLogout=await request(app)
                           .post('/api/customer/logout')
                           .set('authorization',responseLogin.header["access-token"])
                           .send().expect(200);

    expect(JSON.stringify(responseLogout.body.id)).not.toBe(null);
    expect(JSON.stringify(responseLogout.body.message)).toBe("\"Logged out successfully\"");
    
})

test('Testing the customer/login endpoint,Failure Scenario1',async()=>{

    
    const responseLogout=await request(app)
                           .post('/api/customer/logout')
                           .set('authorization',improperAccesToken)
                           .send().expect(401);

    console.log(responseLogout.body.error+"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    expect(JSON.stringify(responseLogout.body.id)).not.toBe(null);
    expect(JSON.stringify(responseLogout.body.error)).toBe("\"Please authenticate.\"");
    
})
