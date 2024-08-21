const { readFileSync } = require('fs')

const config = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    username: process.env.REDIS_USERNAME || '',
    password: process.env.REDIS_PASSWORD || '',
    database: parseInt(process.env.REDIS_DB, 10) || 0,
    tls: process.env.REDIS_TLS === 'true',
    // Conditionally read TLS files if TLS is enabled
    ...(process.env.REDIS_TLS === 'true' ? {
        key: process.env.REDIS_KEY ? readFileSync(process.env.REDIS_KEY) : undefined,
        cert: process.env.REDIS_CERT ? readFileSync(process.env.REDIS_CERT) : undefined,
        ca: process.env.REDIS_CA ? [readFileSync(process.env.REDIS_CA)] : []
    } : {}),
}

module.exports = config