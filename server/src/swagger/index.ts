import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: '1.0.0',
        title: 'EUCL Tokens Rest API',
        description: ''
    },
    host: 'localhost:5009',
    basePath: '/api/v1',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Tokens',
            description: 'Token Handling endpoints'
        },
    ],
    definitions: {}
};

const outputFile = './src/swagger/doc/swagger.json';
const routes = ['./src/routes/index.ts'];

swaggerAutogen()(outputFile, routes, doc).then(async () => {
    await import('./../app');
});