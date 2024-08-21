const httpClient = require('../utils/httpClient')
const redisClient = require('../cache/redisClient')
const { getCompactForecastData } = require('../utils/weatherDataFormatter')

// Expired time for 6 hours
const EXPIRED_CACHE_TIME = 21600000

const getForecastData = async (location) => {
    // Check if data is cached
    const cacheKey = `weather:${location}`
    const cachedData = await redisClient.get(cacheKey)
    if (cachedData) {
        console.log('Data retrieved from Redis!')
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
    console.log('Data retrieved from Third-party API!')

    // Cache the response with the location as the key!
    await redisClient.set(cacheKey, JSON.stringify(weatherData), {
        EX: EXPIRED_CACHE_TIME
    })

    return weatherData
}

module.exports = { getForecastData }