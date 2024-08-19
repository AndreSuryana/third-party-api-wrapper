const weatherService = require('../services/weatherService')

const getForecast = async (request, reply) => {
    const { location } = request.query
    try {
        const data = await weatherService.getForecastData(location)
        reply.send(data)
    } catch (err) {
        console.error(err)
        reply.code(500).send({ error: 'Unable to fetch weather data'})
    }
}

module.exports = { getForecast }