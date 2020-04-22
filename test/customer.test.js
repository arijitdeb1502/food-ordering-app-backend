const request = require('supertest');
const app = require('../src/app');
const customerService = require('../src/service/customerService')

const Customer = require('../src/db/model/customer');

const {  
         customerSuccessAllFlds,
         customerSuccessNoLastName
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

    // let customer = await Customer.find( {
    //     contact_number: customerSuccessAllFlds.contact_number
    // });

    let customer = await customerService.findCustomerByPhoneNumber(customerSuccessAllFlds.contact_number);
    
    console.log(customer);

    // expect(customer).not.toBe(null);
    // expect(customer.length).toBe(1);

    // customer = await Customer.find( {
    //     first_name: customerSuccessAllFlds.first_name
    // });

    // expect(customer).not.toBe(null);
    // expect(customer.length).toBe(1);

    // expect(customer[0].first_name).toBe("Arijit");
    // expect(customer[0].last_name).toBe("Deb");
    // expect(customer[0].email_address).toBe("arijithere@gmail.com");
    // expect(customer[0].contact_number).toBe("6598581111");
    // expect(customer[0].password).toBe("aBhiTithi1@3");



    //5e9f7fffe6c32c47347a072bARARARARARARARARARAR
    //console.log(response.status);
    //console.log(JSON.parse(response.text).status+"ARARARARARARARARARAR");
})