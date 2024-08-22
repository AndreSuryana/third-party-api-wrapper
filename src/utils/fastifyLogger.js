const logger = require('./logger')

// Function to format fastify logs
const formatLog = (arg) => {
    // Helper function to format request
    const formatRequest = (req) => {
        return `${req.method} ${req.url}, params: ${JSON.stringify(req.params)}, query: ${JSON.stringify(req.query)}`
    }

    // Helper function to format response
    const formatResponse = (res) => {
        return `${res.raw.statusCode} - ${res.raw.statusMessage}`
    }

    if (arg && typeof arg === 'object') {
        if (arg.req) {
            return `Server Request: ${formatRequest(arg.req)}`;
        }
        if (arg.res) {
            return `Server Response: ${formatResponse(arg.res)}`;
        }
        return JSON.stringify(arg, (key, value) => {
            if (key === 'socket' || key === 'parser') return undefined // Exclude circular references
            return value
        })
    }
    return arg
}

// Create custom logger that extends required methods for Fastify logger
const fastifyLogger = {
    fatal: (...args) => logger.error(...args.map(arg => formatLog(arg))),
    trace: (...args) => logger.debug(...args.map(arg => formatLog(arg))),
    debug: (...args) => logger.debug(...args.map(arg => formatLog(arg))),
    info: (...args) => logger.info(...args.map(arg => formatLog(arg))),
    warn: (...args) => logger.warn(...args.map(arg => formatLog(arg))),
    error: (...args) => logger.error(...args.map(arg => formatLog(arg))),
    child: () => fastifyLogger
}

module.exports = fastifyLogger