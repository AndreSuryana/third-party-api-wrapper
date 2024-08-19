const httpClient = require('../utils/httpClient')
const { getCompactForecastData } = require('../utils/weatherDataFormatter')

const getForecastData = async (location) => {
    // TODO: Implement Redis caching!
    // Check if data is cached

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

    // TODO: Cache the response with the location as the key!


    return weatherData
}

module.exports = { getForecastData }