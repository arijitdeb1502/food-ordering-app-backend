const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../src/app');

const State = require('../src/db/model/state');

const {  
        expectedStates
      } = require('./fixtures/statesData');

test('Testing the getall state endpoint,SUCCESS Scenario1',async()=>{

    const response=await request(app)
                .get('/api/states')
                .expect(200);

    const actualStates={};
    response.body.states.map((state)=>{
        actualStates[state.state_uuid]=state.state_name;
    })

    const expectedData={}
    for (state of expectedStates){
        expectedData[state.state_uuid]=state.state_name
    }

    expect(response.body.states.length).toBe(36);
    expect(expectedData).toEqual(actualStates);
    
})