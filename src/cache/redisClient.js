const { createClient } = require('redis')
const config = require('../config/redisConfig')

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
                console.log("Too many attempts to reconnect. Redis connection was terminated")
                return new Error("Too many retries.")
            } else {
                return retries * 500 // Delay
            }
        }
    }
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