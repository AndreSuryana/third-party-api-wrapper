const httpClient = require('../utils/httpClient')
const redisClient = require('../cache/redisClient')
const { getCompactForecastData } = require('../utils/weatherDataFormatter')
const logger = require('../utils/logger')

// Expired time for 6 hours
const EXPIRED_CACHE_TIME = 21600000

const getForecastData = async (location) => {
    // Cache key based on location
    const cacheKey = `weather:${location}`

    try {
        // Check if data is cached
        const cachedData = await redisClient.get(cacheKey)
        if (cachedData) {
            logger.info(`Cache hit for location: ${location}. Data retrieved successfully from Redis.`)
            return JSON.parse(cachedData)
        }

        // Fetch data from the third-party API
        const response = await httpClient.get('forecast', {
            params: {
                locations: location,
                locationMode: 'single', // Single location
                forecastDays: 7, // Week
                aggregateHours: 24,
                unitGroup: 'metric',
                contentType: 'json',
                key: process.env.WEATHER_API_KEY
            }
        })

        // Reformat raw data from VisualCrossing Weather API to more compact format
        const weatherData = getCompactForecastData(response.data)
        logger.info(`Data retrieved from Third-party API for location: ${location}`)

        // Cache the response with the location as the key!
        await redisClient.set(cacheKey, JSON.stringify(weatherData, null, 2), {
            EX: EXPIRED_CACHE_TIME
        })

        return weatherData
    } catch (err) {
        logger.error(`Error fetching weather data for location: ${location} - ${err.message}`)
        throw err // Rethrow the error to be handled by the caller
    }
}

module.exports = { getForecastData }