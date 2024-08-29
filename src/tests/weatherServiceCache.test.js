const request = require('supertest')
const app = require('../app')
const weatherMockData = require('./data/weatherMockData')
const redisClient = require('../cache/redisClient')
const httpClient = require('../utils/httpClient')

jest.mock('../cache/redisClient')
jest.mock('../utils/httpClient')

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
    redisClient.get.mockClear()
    redisClient.set.mockClear()
})

describe('Weather API Wrapper Service (Caching)', () => {

    const location = 'Klungkung'
    const newLocation = 'Jimbaran'
    const cacheKey = `weather:${location}`
    const expiry = { EX: 21600 } // 6 hours in seconds

    test('Retrieve data from cache for a previously requested location', async () => {
        redisClient.get.mockResolvedValue(JSON.stringify(weatherMockData.forecast))

        const response = await request(app.server).get(`/forecast?location=${location}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(weatherMockData.forecast)
        expect(redisClient.get).toHaveBeenCalledWith(cacheKey)
        expect(redisClient.get).not.toBeNull()
    })

    test('Retrieve data for a location not in the cache', async () => {
        redisClient.get.mockResolvedValue(null)
        httpClient.get.mockResolvedValue({ data: weatherMockData.forecastRaw })

        const response = await request(app.server).get(`/forecast?location=${newLocation}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(weatherMockData.forecast)
        expect(redisClient.get).toHaveBeenCalledWith(`weather:${newLocation}`)
        expect(redisClient.set).toHaveBeenCalledWith(`weather:${newLocation}`, JSON.stringify(weatherMockData.forecast), expiry)
        expect(httpClient.get).toHaveBeenCalled()
    })

    test('Ensure data is re-fetched after cache expires', async () => {
        redisClient.get.mockResolvedValue(null) // Simulate cache miss due to expiry
        httpClient.get.mockResolvedValue({ data: weatherMockData.forecastRaw })

        const response = await request(app.server).get(`/forecast?location=${location}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(weatherMockData.forecast)
        expect(redisClient.get).toHaveBeenCalledWith(cacheKey)
        expect(redisClient.set).toHaveBeenCalledWith(cacheKey, JSON.stringify(weatherMockData.forecast), expiry)
        expect(httpClient.get).toHaveBeenCalled()
    })

    test('Simulate a Redis connection failure during cache retrieval', async () => {
        redisClient.get.mockRejectedValue(new Error('Redis connection error'))
        httpClient.get.mockResolvedValue({ data: weatherMockData.forecastRaw })

        const response = await request(app.server).get(`/forecast?location=${location}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(weatherMockData.forecast)
        expect(redisClient.get).toHaveBeenCalledWith(cacheKey)
        expect(redisClient.set).toHaveBeenCalledWith(cacheKey, JSON.stringify(weatherMockData.forecast), expiry)
        expect(httpClient.get).toHaveBeenCalled()
    })

    test('Simulate a Redis connection failure during cache set', async () => {
        redisClient.get.mockResolvedValue(null)
        redisClient.set.mockRejectedValue(new Error('Redis set error'))
        httpClient.get.mockResolvedValue({ data: weatherMockData.forecastRaw })

        const response = await request(app.server).get(`/forecast?location=${newLocation}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(weatherMockData.forecast)
        expect(redisClient.get).toHaveBeenCalledWith(`weather:${newLocation}`)
        expect(redisClient.set).toHaveBeenCalledWith(`weather:${newLocation}`, JSON.stringify(weatherMockData.forecast), expiry)
        expect(httpClient.get).toHaveBeenCalled()
    })

    test('Handle invalid data in cache', async () => {
        redisClient.get.mockResolvedValue('invalid data') // Simulate corrupted cache data
        httpClient.get.mockResolvedValue({ data: weatherMockData.forecastRaw })

        const response = await request(app.server).get(`/forecast?location=${location}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(weatherMockData.forecast)
        expect(redisClient.get).toHaveBeenCalledWith(cacheKey)
        expect(redisClient.set).toHaveBeenCalledWith(cacheKey, JSON.stringify(weatherMockData.forecast), expiry)
        expect(httpClient.get).toHaveBeenCalled()
    })

    test('Handle third-party API failure', async () => {
        redisClient.get.mockResolvedValue(null)
        httpClient.get.mockRejectedValue(new Error('API error'))

        const response = await request(app.server).get(`/forecast?location=${newLocation}`)

        expect(response.statusCode).toBe(500)
        expect(redisClient.get).toHaveBeenCalledWith(`weather:${newLocation}`)
        expect(redisClient.set).not.toHaveBeenCalled()
    })

    test('Fetch data again after manual cache invalidation', async () => {
        redisClient.get.mockResolvedValueOnce(JSON.stringify(weatherMockData.forecast))
            .mockResolvedValueOnce(null) // Simulate cache invalidation
        httpClient.get.mockResolvedValue({ data: weatherMockData.forecastRaw })

        await request(app.server).get(`/forecast?location=${location}`)
        const response = await request(app.server).get(`/forecast?location=${location}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(weatherMockData.forecast)
        expect(redisClient.get).toHaveBeenCalledWith(cacheKey)
        expect(redisClient.set).toHaveBeenCalledTimes(1) // Only after invalidation
        expect(httpClient.get).toHaveBeenCalledTimes(1)
    })
})