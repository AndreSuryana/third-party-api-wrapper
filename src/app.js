const path = require('path')
const Fastify = require('fastify')
const fastifyLogger = require('./utils/fastifyLogger')

// Create Fastify instance with logger configuration based on environment
const fastify = Fastify({ logger: fastifyLogger });

// Load environment variables plugin with schema validation
fastify.register(require('./plugins/env'))

// Register routes inside 'routes' folder
fastify.register(require('@fastify/autoload'), {
    dir: path.join(__dirname, 'routes')
})

// Set custom Fastify's built-in error response
fastify.setErrorHandler((error, request, reply) => {
    const { statusCode = 500, message, error: errorType } = error;
    reply.code(statusCode).send(
        formatErrorResponse(statusCode, errorType || 'Internal Server Error', message)
    );
})

module.exports = fastify