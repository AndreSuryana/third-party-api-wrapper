const axios = require('axios')
const logger = require('./logger')

const instance = axios.create({
    baseURL: process.env.WEATHER_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Request Interceptor
instance.interceptors.request.use(
    config => {
        // Log method, URL, headers, params, and data in a clean format
        logger.debug(`Request: ${config.method.toUpperCase()} ${config.url}\nHeaders: ${JSON.stringify(config.headers)}\nParams: ${JSON.stringify(config.params)}\nData: ${config.data ? JSON.stringify(config.data) : 'None'}`)
        return config
    }, err => {
        logger.error(`Request error: ${error.message}`)
        return Promise.reject(err)
    }
)

// Response Interceptor
instance.interceptors.response.use(
    response => {
        logger.debug(`Response: ${response.status} ${response.statusText}\nData: ${JSON.stringify(response.data)}`);
        return response;
    },
    err => {
        logger.error('Response error:', err)
        return Promise.reject(err)
    }
)

module.exports = instance