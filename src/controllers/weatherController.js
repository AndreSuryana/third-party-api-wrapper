const weatherService = require('../services/weatherService')
const logger = require('../utils/logger')
const errorResponseFormatter = require('../utils/errorResponseFormatter')

const getForecast = async (request, reply) => {
    const { location } = request.query
    try {
        const data = await weatherService.getForecastData(location)
        reply.send(data)
    } catch (err) {
        logger.error(`Failed to fetch weather data for location ${location} - ${err.message}`)

        const statusCode = err.response?.status || 500
        const errorType = err.response?.statusText || 'Internal Server Error'
        const errorMessage = err.response?.data || 'An unexpected error occurred. Please try again later.'

        reply.code(statusCode).send(
            errorResponseFormatter(statusCode, errorType, errorMessage)
        )
    }
}

module.exports = { getForecast }