const app = require('./app')
const logger = require('./utils/logger')

// Start the server
const start = async () => {
    try {
        const host = process.env.APP_HOST || 'localhost'
        const port = process.env.APP_PORT || 3000
        app.listen({ port: port, host: host })
    } catch (err) {
        logger.error('Server startup error:', err)
        process.exit(1)
    }
}

start()