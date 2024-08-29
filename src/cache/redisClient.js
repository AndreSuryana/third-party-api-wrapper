const { createClient } = require('redis')
const config = require('../config/redisConfig')
const logger = require('../utils/logger')

// Max connection retries
const MAX_RETRIES = 10

// Create the Redis client with the configuration
const client = createClient({
    username: config.username,
    password: config.password,
    database: config.database,
    socket: {
        host: config.host,
        port: config.port,
        tls: config.tls,
        // Include TLS options only if TLS is enabled
        ...(config.tls ? {
            key: config.key,
            cert: config.cert,
            ca: config.ca,
        } : {}),
        reconnectStrategy: (retries) => {
            if (retries > MAX_RETRIES) {
                logger.error('Too many attempts to reconnect. Redis connection was terminated')
                return new Error('Too many retries.')
            } else {
                logger.info(`Retrying Redis connection attempt ${retries}...`)
                return retries * 500 // Delay
            }
        }
    }
})

// Connect to Redis server when the client is initialized
client.connect().then(() => {
    logger.info('Connected to Redis successfully')
}).catch(err => {
    logger.error('Redis connection error:', err)
})

// Listen for any errors globally
client.on('error', err => {
    logger.error('Redis client error:', err)
})

module.exports = client