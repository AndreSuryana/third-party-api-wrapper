const weatherService = require('../services/weatherService')
const logger = require('../utils/logger')

const LOCATION_MAX_LENGTH = 100

const getForecast = async (request, reply) => {
    const { location } = request.query

    // Validate params
    if (!location) {
        return reply.status(400).send({ error: 'Location parameter is required' })
    }

    if (location.length > LOCATION_MAX_LENGTH) {
        return reply.status(400).send({ error: 'Invalid location name' })
    }

    try {
        const data = await weatherService.getForecastData(location)
        reply.send(data)
    } catch (err) {
        logger.error(`Failed to fetch forecast data: ${err.message}`)
        handleError(err, reply)
    }
}

const handleError = (err, reply) => {
    let statusCode;
    let errorMessage;

    if (!err.response) {
        // Network error or any general error
        if (err.code === 'ECONNABORTED') {
            statusCode = 504
            errorMessage = 'Service timeout, please try again later'
        } else if (err.code === 'INVALID_RESP') {
            statusCode = 500
            errorMessage = 'Invalid response format'
        } else {
            statusCode = 500
            errorMessage = 'Internal server error'
        }
    } else {
        // Http status code error
        switch (err.response?.status) {
            case 400:
                statusCode = 404
                errorMessage = 'Forecast not found for the specified location'
                break

            case 429:
                statusCode = 429
                errorMessage = 'Rate limit exceeded, please try again later'
                break

            default:
                statusCode = 500
                errorMessage = 'Internal server error'
                break
        }
    }

    reply.code(statusCode).send({ error: errorMessage })
}

module.exports = { getForecast }