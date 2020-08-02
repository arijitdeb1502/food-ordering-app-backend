const express = require('express')
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// const swaggerDocument = YAML.load(__dirname+'/api/endpoints/customer.yaml');
const swaggerDocument = YAML.load(__dirname+'/api/endpoints/address.yaml');

const dbConnection = require('./db/connection');

const customerRouter = require('./router/customer');
const addressRouter = require('./router/address');
const stateRouter = require('./router/state');


const app = express();
// db connectivity
dbConnection();

// cors (This is used to tackle cross compatibility issue)
app.use(cors({exposedHeaders: ['request-id', 'access-token', 'Content-Length']}));

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/customer', customerRouter);
app.use('/api/address', addressRouter);
app.use('/api/states',stateRouter);



// API Documentation
if (process.env.NODE_ENV != 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}


module.exports = app;