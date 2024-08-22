const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')

// Create the logger
const logger = createLogger({
    level: process.env.APP_DEBUG_LEVEL || 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`
        }),
    ),
    transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d' // Keep logs for 2 weeks,
        }),
        new transports.File({ filename: 'logs/error/error.log', level: 'error' }),
    ]
})

module.exports = logger