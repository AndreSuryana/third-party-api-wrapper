const fp = require('fastify-plugin')

// Load environment variables from the .env file
require('dotenv').config();

const envPlugin = async (fastify) => {
    fastify.register(require('@fastify/env'), {
        dotenv: true,
        schema: {
            type: 'object',
            required: ['APP_ENV', 'APP_PORT', 'WEATHER_API_BASE_URL', 'WEATHER_API_KEY', 'REDIS_HOST', 'REDIS_PORT'],
            properties: {
                APP_ENV: { type: 'string', default: 'development' },
                APP_DEBUG_LEVEL: { type: 'string', default: 'debug' },
                APP_HOST: { type: 'string', default: '0.0.0.0' },
                APP_PORT: { type: 'string', default: '3000' },
                WEATHER_API_BASE_URL: { type: 'string' },
                WEATHER_API_KEY: { type: 'string' },
                REDIS_DB: { type: 'number', default: 0 },
                REDIS_HOST: { type: 'string' },
                REDIS_PASSWORD: { type: 'string', default: '' },
                REDIS_PORT: { type: 'number', default: 6379 },
                REDIS_TLS: { type: 'boolean', default: false }
            }
        }
    })
}

module.exports = fp(envPlugin)