const getCompactForecastData = (data) => {
    const { location } = data

    // Helper function to format wind data
    const formatWind = (data) => ({
        speed: data.wspd,
        gust: data.wgust,
        direction: data.wdir
    })

    // Helper function to format temperature data
    const formatTemperature = (data) => ({
        min: data.mint,
        max: data.maxt
    })

    // Check if location and its values exist
    if (!location || !Array.isArray(location.values)) {
        throw new Error('Invalid data structure: location or location.values is missing.');
    }

    // Extract and format forecast data
    const forecastData = location.values.map(day => ({
        date: new Date(day.datetime).toISOString().split('T')[0],
        temperature: formatTemperature(day),
        precipitation: day.precip,
        cloudCover: day.cloudcover,
        wind: formatWind(day),
        humidity: day.humidity,
        uvIndex: day.uvindex,
        visibility: day.visibility,
        solarRadiation: day.solarradiation,
        heatIndex: day.heatindex,
        snow: day.snow,
        snowDepth: day.snowdepth,
        sealevelPressure: day.sealevelpressure,
        conditions: day.conditions
    }))

    // Format current conditions
    const currentConditionsData = {
        temperature: location.currentConditions.temp,
        feelsLike: location.currentConditions.heatindex,
        humidity: location.currentConditions.humidity,
        windSpeed: location.currentConditions.wspd,
        windDirection: location.currentConditions.wdir,
        visibility: location.currentConditions.visibility,
        cloudCover: location.currentConditions.cloudcover,
        precipitation: location.currentConditions.precip,
        sunrise: location.currentConditions.sunrise,
        sunset: location.currentConditions.sunset,
        icon: location.currentConditions.icon,
        moonPhase: location.currentConditions.moonphase,
        sealevelPressure: location.currentConditions.sealevelpressure,
        dewPoint: location.currentConditions.dew,
        windGust: location.currentConditions.wgust,
        windChill: location.currentConditions.windchill
    }

    // Return the reformatted data
    return {
        location: {
            id: location.id,
            name: location.name,
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: location.tz
        },
        currentConditions: currentConditionsData,
        forecast: forecastData
    }
}

module.exports = { getCompactForecastData }