
const weatherController = require('../controllers/weatherController')

// eslint-disable-next-line no-unused-vars
const weatherRoutes = async (fastify, options) => {
    fastify.get('/forecast', weatherController.getForecast)
}

module.exports = weatherRoutes