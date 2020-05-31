const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../src/app');

const Customer = require('../src/db/model/customer');
const Address = require('../src/db/model/address');

const {  
         addressSuccessAllFlds,
         addressSuccessAllFlds2
      } = require('./fixtures/addressData');

const {  customerSuccessAllFlds,
         customerSuccessAllFlds1 
      } = require('./fixtures/customerData');

const base64EncodedCredentials="NjU5ODU4MTExMTphQmhpVGl0aGkxQDM=";
const base64EncodedCredentials2="NjU5ODU4MTExMzphQmhpVGl0aGkxQDM=";

const improperAccesToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFkZTNmN2M3MjM4MDFlMzA0NWU2MTYiLCJpYXQiOjE1ODg0NTQ0NzUsImV4cCI6MTU4ODQ2MTY3NX0.DTS1cfkcG3fDj8BvWvGlt1YBCxg6fRgHYcrRNJt0ER0";


beforeEach(async () => {
    await Customer.deleteMany();
    await Address.deleteMany();
})

test('Testing the DELETE address endpoint,SUCCESS Scenario1',async()=>{

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

    expect(responseAddressSave1.body.id).not.toBe(null);
    expect(responseAddressSave1.body.status).toBe("ADDRESS SUCCESSFULLY SAVED");

    const responseAddressSave2=await request(app)
                           .post('/api/address')
                           .set('authorization',responseLogin.header["access-token"])
                           .send({
                                    ...addressSuccessAllFlds2
                                }).expect(201);

    expect(responseAddressSave2.body.id).not.toBe(null);
    expect(responseAddressSave2.body.status).toBe("ADDRESS SUCCESSFULLY SAVED");

    
    const responseDeleteAddress = await request(app)
                                 .put(`/api/address/delete/${responseAddressSave1.body.id}`)
                                 .set('authorization',responseLogin.header["access-token"])
                                 .send().expect(200);

    expect(responseDeleteAddress.body.id).not.toBe(null);
    expect(responseDeleteAddress.body.status).toBe("ADDRESS DELETED SUCCESSFULLY");
    expect(responseDeleteAddress.header["access-token"]).not.toBe(null);
                        

})

test('Testing the DELETE address endpoint,FAILURE Scenario1',async()=>{

    //First signup the first customer
    const responseSignup1=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds1
            }).expect(201);

    //First signup the second customer
    const responseSignup2=await request(app).post('/api/customer/signup').send({
        ...customerSuccessAllFlds
    }).expect(201);        

    const responseLogin=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentials2)
                           .send().expect(200);


    const responseAddressSave1=await request(app)
                           .post('/api/address')
                           .set('authorization',responseLogin.header["access-token"])
                           .send({
                                    ...addressSuccessAllFlds
                                }).expect(201);

    expect(responseAddressSave1.body.id).not.toBe(null);
    expect(responseAddressSave1.body.status).toBe("ADDRESS SUCCESSFULLY SAVED");

    const responseAddressSave2=await request(app)
                           .post('/api/address')
                           .set('authorization',responseLogin.header["access-token"])
                           .send({
                                    ...addressSuccessAllFlds2
                                }).expect(201);

    expect(responseAddressSave2.body.id).not.toBe(null);
    expect(responseAddressSave2.body.status).toBe("ADDRESS SUCCESSFULLY SAVED");

    const responseLogin2=await request(app)
                           .post('/api/customer/login')
                           .set('authorization',base64EncodedCredentials)
                           .send().expect(200);

    const responseDeleteAddress = await request(app)
                                 .put(`/api/address/delete/${responseAddressSave1.body.id}`)
                                 .set('authorization',responseLogin2.header["access-token"])
                                 .send().expect(401);

    expect(responseDeleteAddress.body.error).toBe("No such address exist for this Customer!");
    
})


test('Testing the DELETE address endpoint,FAILURE Scenario2',async()=>{

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

    expect(responseAddressSave1.body.id).not.toBe(null);
    expect(responseAddressSave1.body.status).toBe("ADDRESS SUCCESSFULLY SAVED");

    const responseAddressSave2=await request(app)
                           .post('/api/address')
                           .set('authorization',responseLogin.header["access-token"])
                           .send({
                                    ...addressSuccessAllFlds2
                                }).expect(201);

    expect(responseAddressSave2.body.id).not.toBe(null);
    expect(responseAddressSave2.body.status).toBe("ADDRESS SUCCESSFULLY SAVED");

    
    const responseDeleteAddress = await request(app)
                                 .put('/api/address/delete/5ed42959b8ac764bb0df4e19')
                                 .set('authorization',responseLogin.header["access-token"])
                                 .send().expect(404);

    // console.log(JSON.stringify(responseDeleteAddress.body)+"ARARARARARARARARARARARA");

    expect(responseDeleteAddress.body.error).toBe("No Address By that id!");
                        

})
