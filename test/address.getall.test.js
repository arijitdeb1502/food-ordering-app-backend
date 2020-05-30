const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../src/app');

const Customer = require('../src/db/model/customer');
const Address = require('../src/db/model/address');

const {  
         addressSuccessAllFlds,
         addressSuccessAllFlds2
      } = require('./fixtures/addressData');

const {  customerSuccessAllFlds } = require('./fixtures/customerData');

const base64EncodedCredentials="NjU5ODU4MTExMTphQmhpVGl0aGkxQDM=";
const improperAccesToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFkZTNmN2M3MjM4MDFlMzA0NWU2MTYiLCJpYXQiOjE1ODg0NTQ0NzUsImV4cCI6MTU4ODQ2MTY3NX0.DTS1cfkcG3fDj8BvWvGlt1YBCxg6fRgHYcrRNJt0ER0";


beforeEach(async () => {
    await Customer.deleteMany();
    await Address.deleteMany();
})

test('Testing the getall address endpoint,SUCCESS Scenario1',async()=>{

    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds
            }).expect(201);

    const responseLogin=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentials)
                           .send().expect(200);


    const responseAddressSave1=await request(app)
                           .post('/api/address')
                           .set('authorization',responseLogin.header["access-token"])
                           .send({
                                    ...addressSuccessAllFlds
                                }).expect(201);

    const responseAddressSave2=await request(app)
                           .post('/api/address')
                           .set('authorization',responseLogin.header["access-token"])
                           .send({
                                    ...addressSuccessAllFlds2
                                }).expect(201);

    const expectedAddresses=await Address.find();
    // console.log("EXPECTED:"+expectedAddresses[0])

    const response=await request(app)
                .get('/api/address/customer')
                .set('authorization',responseLogin.header["access-token"])
                .expect(200);

    // console.log("ACTUAL:"+JSON.stringify(response.body));

    expect(Object.keys(response.body).length).toBe(1);
    expect(Object.keys(response.body)[0]).toBe('addresses');
    expect(response.body.addresses.length).toBe(2);

    expect(JSON.stringify(expectedAddresses[0]._id)).toBe(JSON.stringify(response.body.addresses[0].id));
    expect(response.body.addresses[0].flat_building_name).toBe(expectedAddresses[0].flat_building_name);
    expect(response.body.addresses[0].locality).toBe(expectedAddresses[0].locality);
    expect(response.body.addresses[0].city).toBe(expectedAddresses[0].city);
    expect(response.body.addresses[0].pincode).toBe(expectedAddresses[0].pincode);
    expect(response.body.addresses[0].state.state_uuid).toBe("009ae262-a234-11e8-b475-720006ceb890");
    expect(response.body.addresses[0].state.state_name).toBe("West Bengal");

    expect(JSON.stringify(expectedAddresses[1]._id)).toBe(JSON.stringify(response.body.addresses[1].id));
    expect(response.body.addresses[1].flat_building_name).toBe(expectedAddresses[1].flat_building_name);
    expect(response.body.addresses[1].locality).toBe(expectedAddresses[1].locality);
    expect(response.body.addresses[1].city).toBe(expectedAddresses[1].city);
    expect(response.body.addresses[1].pincode).toBe(expectedAddresses[1].pincode);
    expect(response.body.addresses[1].state.state_uuid).toBe("009ae262-a234-11e8-b475-720006ceb890");
    expect(response.body.addresses[1].state.state_name).toBe("West Bengal");
    
})

test('Testing the getall address endpoint,Failure Scenario1',async()=>{

    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds
            }).expect(201);

    const responseLogin=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentials)
                           .send().expect(200);


    const responseAddressSave1=await request(app)
                           .post('/api/address')
                           .set('authorization',responseLogin.header["access-token"])
                           .send({
                                    ...addressSuccessAllFlds
                                }).expect(201);

    const responseAddressSave2=await request(app)
                           .post('/api/address')
                           .set('authorization',responseLogin.header["access-token"])
                           .send({
                                    ...addressSuccessAllFlds2
                                }).expect(201);

    const expectedAddresses=await Address.find();
    // console.log("EXPECTED:"+expectedAddresses[0])

    const response=await request(app)
                .get('/api/address/customer')
                .expect(401);

    expect(response.body.error).toBe("Please authenticate.")
    
})

test('Testing the getall address endpoint,Failure Scenario2',async()=>{

    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds
            }).expect(201);

    const responseLogin=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentials)
                           .send().expect(200);


    const responseAddressSave1=await request(app)
                           .post('/api/address')
                           .set('authorization',responseLogin.header["access-token"])
                           .send({
                                    ...addressSuccessAllFlds
                                }).expect(201);

    const responseAddressSave2=await request(app)
                           .post('/api/address')
                           .set('authorization',responseLogin.header["access-token"])
                           .send({
                                    ...addressSuccessAllFlds2
                                }).expect(201);

    const expectedAddresses=await Address.find();
    // console.log("EXPECTED:"+expectedAddresses[0])

    const response=await request(app)
                .get('/api/address/customer')
                .set('authorization',improperAccesToken)
                .expect(401);

    expect(response.body.error).toBe("Please authenticate.")
    
})