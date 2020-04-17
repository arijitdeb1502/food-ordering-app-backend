const express = require('express')
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const customerRouter = require('./router/customer');

const swaggerDocument = YAML.load(__dirname+'/api/endpoints/customer.yaml');
const dbConnection = require('./database/connection');

const app = express();

// db connectivity
dbConnection();

// cors (This is used to tackle cross compatibility issue)
app.use(cors());

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/customer', customerRouter);

// API Documentation
if (process.env.NODE_ENV != 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}


module.exports = app;