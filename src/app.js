const express = require('express')
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Swagger definition config
const swaggerDefinition =  {
    info:  {
      "title": 'REST API for Food Ordering app API', // Title of the documentation
      "version": '1.0.0', // Version of the app
      "description": 'This is the REST API for Food Ordering app API', // short description of the app
    },
    host: '127.0.0.1:'+process.env.PORT, // the host or url of the app
    basePath: '/api', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['./src/api/endpoints/*.yaml'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const dbConnection = require('./db/connection');

const customerRouter = require('./router/customer');
const addressRouter = require('./router/address');
const stateRouter = require('./router/state');
const restaurantRouter = require('./router/restaurant');


const app = express();
// db connectivity
dbConnection();

// cors (This is used to tackle cross compatibility issue)
app.use(cors({exposedHeaders: ['request-id', 'access-token', 'Content-Length']}));

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation
if (process.env.NODE_ENV != 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use('/api/customer', customerRouter);
app.use('/api/address', addressRouter);
app.use('/api/states',stateRouter);
app.use('/api/restaurant',restaurantRouter);


module.exports = app;