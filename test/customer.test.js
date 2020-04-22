const request = require('supertest');
const bcrypt = require('bcryptjs');

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

    let customer = await Customer.find( {
        contact_number: customerSuccessAllFlds.contact_number
    });

    // console.log(customer);

    expect(customer).not.toBe(null);
    expect(customer.length).toBe(1);
    
    expect(customer[0].first_name).toBe(customerSuccessAllFlds.first_name);
    expect(customer[0].last_name).toBe(customerSuccessAllFlds.last_name);
    expect(customer[0].email_address).toBe(customerSuccessAllFlds.email_address);
    expect(customer[0].contact_number).toBe(customerSuccessAllFlds.contact_number);

    const isMatch=await bcrypt.compare(customerSuccessAllFlds.password,customer[0].password);
    console.log(isMatch);
    // expect(isMatch).toBe(true);

})