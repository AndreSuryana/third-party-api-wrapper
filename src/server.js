const path = require('path')
const Fastify = require('fastify')

// Load environment variables from .env file
require('dotenv').config()

// Create Fastify instance with logger configuration based on environment
const fastify = Fastify({
    logger: process.env.APP_ENV === 'development'
});

// Load environment variables plugin with schema validation
fastify.register(require('./plugins/env'))

// Register routes inside 'routes' folder
fastify.register(require('@fastify/autoload'), {
    dir: path.join(__dirname, 'routes')
})

// Start the server
const start = async () => {
    try {
        fastify.listen({ port: process.env.APP_PORT || 3000, host: process.env.APP_HOST || 'localhost' })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()