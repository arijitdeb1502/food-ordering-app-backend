const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../src/app');

const Customer = require('../src/db/model/customer');
const Address = require('../src/db/model/address');

const {  
         addressSuccessAllFlds,
         addressSuccessAllFlds2,
         addressFailureFldsEmpty1,
         addressFailureFldsEmpty2,
         addressFailureFldsEmpty3,
         addressFailureFldsEmpty4,
         addressFailureFldsEmpty5,
         addressFailureUnmatchedState,
         addressFailurefldInvalidPin
      } = require('./fixtures/addressData');

const {  customerSuccessAllFlds } = require('./fixtures/customerData');

const base64EncodedCredentials="NjU5ODU4MTExMTphQmhpVGl0aGkxQDM=";
const improperAccesToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFkZTNmN2M3MjM4MDFlMzA0NWU2MTYiLCJpYXQiOjE1ODg0NTQ0NzUsImV4cCI6MTU4ODQ2MTY3NX0.DTS1cfkcG3fDj8BvWvGlt1YBCxg6fRgHYcrRNJt0ER0";


beforeEach(async () => {
    await Customer.deleteMany();
    await Address.deleteMany();
})

test('Testing the post address endpoint,SUCCESS Scenario1',async()=>{

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
    
})


test('Testing the post address endpoint,FAILURE Scenario1',async()=>{

    //First signup the customer
    const responseSignup=await request(app).post('/api/customer/signup').send({
                ...customerSuccessAllFlds
            }).expect(201);


    const responseAddressSave1=await request(app)
                           .post('/api/address')
                           .set('authorization',improperAccesToken)
                           .send({
                                    ...addressSuccessAllFlds
                                }).expect(401);

    console.log(responseAddressSave1.body);

    expect(responseAddressSave1.body.error).toBe('Please authenticate.');

    
})

test('Testing the post address endpoint,FAILURE Scenario2',async()=>{

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
                                ...addressFailureFldsEmpty1
                            }).expect(400);

        expect(responseAddressSave1.body.error).toBe("No field can be empty");
    
})

test('Testing the post address endpoint,FAILURE Scenario3',async()=>{

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
                            ...addressFailureFldsEmpty2
                        }).expect(400);

    expect(responseAddressSave1.body.error).toBe("No field can be empty");

})

test('Testing the post address endpoint,FAILURE Scenario4',async()=>{

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
                            ...addressFailureFldsEmpty3
                        }).expect(400);

    expect(responseAddressSave1.body.error).toBe("No field can be empty");

})

test('Testing the post address endpoint,FAILURE Scenario5',async()=>{

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
                            ...addressFailureFldsEmpty4
                        }).expect(400);

    expect(responseAddressSave1.body.error).toBe("No field can be empty");

})

test('Testing the post address endpoint,FAILURE Scenario6',async()=>{

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
                            ...addressFailureFldsEmpty5
                        }).expect(400);

    expect(responseAddressSave1.body.error).toBe("No field can be empty");

})

test('Testing the post address endpoint,FAILURE Scenario7',async()=>{

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
                            ...addressFailureUnmatchedState
                        }).expect(404);

    // console.log(JSON.stringify(responseAddressSave1.body)+"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

    expect(responseAddressSave1.body.error).toBe("No state by this id");

})

test('Testing the post address endpoint,FAILURE Scenario8',async()=>{

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
                            ...addressFailurefldInvalidPin
                        }).expect(422);

    // console.log(JSON.stringify(responseAddressSave1.body)+"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

    expect(responseAddressSave1.body.error).toBe("Invalid pincode");

})



