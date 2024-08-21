const { createClient } = require('redis')

// Redis configuration
const config = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    username: process.env.REDIS_USERNAME || '',
    password: process.env.REDIS_PASSWORD || '',
    db: parseInt(process.env.REDIS_DB, 10) || 0,
    tls: process.env.REDIS_TLS === 'true'
}

// Create the Redis client with the configuration
const client = createClient({
    url: `${config.tls ? 'rediss' : 'redis'}://${config.username}:${config.password}@${config.host}:${config.port}/${config.db}`
})

// Connect to Redis server asyncronously
const connectRedis = async () => {
    try {
        await client.connect()
        console.log('Connected to Redis successfully')
    } catch (err) {
        console.error('Redis connection error: ', err)
    }
}

// Listen for any errors
client.on('error', err => console.error('Redis client error: ', err))

// Call the connect method when initializing the client
connectRedis()

module.exports = client