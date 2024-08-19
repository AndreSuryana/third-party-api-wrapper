
const weatherController = require('../controllers/weatherController')

const weatherRoutes = async (fastify, options) => {
    fastify.get('/forecast', weatherController.getForecast)
}

module.exports = weatherRoutes