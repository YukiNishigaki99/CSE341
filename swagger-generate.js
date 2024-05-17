const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: ['localhost:8080', 'https://cse341-week3.onrender.com']
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);