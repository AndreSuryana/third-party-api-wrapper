const request = require('supertest')
const app = require('../app')
const weatherService = require('../services/weatherService')
const weatherMockData = require('./data/weatherMockData')

jest.mock('../services/weatherService')

beforeAll(async () => {
    // Start Fastify server before tests
    await app.listen({ port: 0 }) // 0 allows Fastify to pick an available port
})

afterAll(async () => {
    // Close Fastify server after tests
    await app.close()
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('Weather API Wrapper Service', () => {

    const location = 'Klungkung'
    const invalidLocation = 'InvalidLocation'
    const numericLocation = '12345'

    // Normal Cases
    test('Fetch weather forecast data for a valid location', async () => {
        weatherService.getForecastData.mockResolvedValue(weatherMockData.forecast)

        const response = await request(app.server).get(`/forecast?location=${location}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(weatherMockData.forecast)
        expect(weatherService.getForecastData).toHaveBeenCalledWith(location)
    })

    test('Fetch weather forecast data for an invalid location', async () => {
        weatherService.getForecastData.mockRejectedValue({
            response: { status: 400 }
        })

        const response = await request(app.server).get(`/forecast?location=${invalidLocation}`)

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ error: 'Forecast not found for the specified location' })
        expect(weatherService.getForecastData).toHaveBeenCalledWith(invalidLocation)
    })

    test('Fetch weather forecast data without providing a location parameter', async () => {
        const response = await request(app.server).get('/forecast')

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ error: 'Location parameter is required' })
        expect(weatherService.getForecastData).not.toHaveBeenCalled()
    })

    test('Handle a third-party API timeout with a custom error', async () => {
        // Simulating axios timeout error code
        const error = new Error('Request timeout')
        error.code = 'ECONNABORTED'
        weatherService.getForecastData.mockRejectedValue(error)

        const response = await request(app.server).get(`/forecast?location=${location}`)

        expect(response.statusCode).toBe(504)
        expect(response.body).toEqual({ error: 'Service timeout, please try again later' })
        expect(weatherService.getForecastData).toHaveBeenCalledWith(location)
    })

    test('Simulate an error response from the third-party API', async () => {
        weatherService.getForecastData.mockRejectedValue(new Error('Error fetching weather data'))

        const response = await request(app.server).get(`/forecast?location=${location}`)

        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual({ error: 'Internal server error' })
        expect(weatherService.getForecastData).toHaveBeenCalledWith(location)
    })

    // Error Handling Tests
    test('Simulate receiving an invalid JSON response from the third-party API', async () => {
        // Simulating invalid or unexpected JSON response format
        const error = new Error('Invalid JSON')
        error.code = 'INVALID_RESP'
        weatherService.getForecastData.mockRejectedValue(error)

        const response = await request(app.server).get(`/forecast?location=${location}`)

        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual({ error: 'Invalid response format' })
        expect(weatherService.getForecastData).toHaveBeenCalledWith(location)
    })

    test('Simulate a network error during the API call', async () => {
        weatherService.getForecastData.mockRejectedValue(new Error('Network error'))

        const response = await request(app.server).get(`/forecast?location=${location}`)

        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual({ error: 'Internal server error' })
        expect(weatherService.getForecastData).toHaveBeenCalledWith(location)
    })

    test('Handle rate limiting from the third-party API', async () => {
        weatherService.getForecastData.mockRejectedValue({
            response: { status: 429, statusText: 'Rate limit exceeded' }
        })

        const response = await request(app.server).get(`/forecast?location=${location}`)

        expect(response.statusCode).toBe(429)
        expect(response.body).toEqual({ error: 'Rate limit exceeded, please try again later' })
        expect(weatherService.getForecastData).toHaveBeenCalledWith(location)
    })

    // Edge Cases Tests
    test('Fetch weather data for a location with an extremely long name', async () => {
        const veryLongLocation = 'a'.repeat(120)
        const response = await request(app.server).get(`/forecast?location=${veryLongLocation}`)

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ error: 'Invalid location name' })
        expect(weatherService.getForecastData).not.toHaveBeenCalled()
    })

    test('Fetch weather data for a location with special characters', async () => {
        const specialCharLocation = 'São Paulo'
        weatherService.getForecastData.mockResolvedValue(weatherMockData.forecast)
        
        const response = await request(app.server).get(`/forecast?location=${specialCharLocation}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(weatherMockData.forecast)
        expect(weatherService.getForecastData).toHaveBeenCalledWith(specialCharLocation)
    })

    test('Fetch weather data for a location with numbers or abbreviations', async () => {
        weatherService.getForecastData.mockResolvedValue(weatherMockData.forecast)

        const response = await request(app.server).get(`/forecast?location=${numericLocation}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(weatherMockData.forecast)
        expect(weatherService.getForecastData).toHaveBeenCalledWith(numericLocation)
    })

    test('Simulate a high volume of requests in a short period', async () => {
        weatherService.getForecastData.mockResolvedValue(weatherMockData.forecast)

        const locations = ['Location1', 'Location2', 'Location3', 'Location4', 'Location5']
        const requests = locations.map(loc => request(app.server).get(`/forecast?location=${loc}`))

        const responses = await Promise.all(requests)

        responses.forEach(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(weatherMockData.forecast)
        })

        expect(weatherService.getForecastData).toHaveBeenCalledTimes(locations.length)
    })
})