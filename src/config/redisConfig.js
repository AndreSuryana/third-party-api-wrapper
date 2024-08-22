const { readFileSync } = require('fs')
const logger = require('../utils/logger')

const config = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    username: process.env.REDIS_USERNAME || '',
    password: process.env.REDIS_PASSWORD || '',
    database: parseInt(process.env.REDIS_DB, 10) || 0,
    tls: process.env.REDIS_TLS === 'true',
    // Conditionally read TLS files if TLS is enabled
    ...(process.env.REDIS_TLS === 'true' ? {
        key: readFileSafely(process.env.REDIS_KEY),
        cert: readFileSafely(process.env.REDIS_CERT),
        ca: process.env.REDIS_CA ? [readFileSafely(process.env.REDIS_CA)] : []
    } : {}),
}

// Function to read a file safely
const readFileSafely = (filePath) => {
    try {
        return readFileSync(filePath)
    } catch (err) {
        logger.error(`Failed to read file at path ${filePath}: ${err.message}`)
        return undefined
    }
}

module.exports = config