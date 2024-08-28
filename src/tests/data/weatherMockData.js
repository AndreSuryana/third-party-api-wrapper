// This is the raw response data received directly from the third-party weather API
const forecastRaw = {
    columns: {
        wdir: {
            id: "wdir",
            name: "Wind Direction",
            type: 2,
            unit: null
        },
        uvindex: {
            id: "uvindex",
            name: "weather_uvindex",
            type: 2,
            unit: null
        },
        latitude: {
            id: "latitude",
            name: "Latitude",
            type: 2,
            unit: null
        },
        preciptype: {
            id: "preciptype",
            name: "weather_preciptype",
            type: 1,
            unit: null
        },
        cin: {
            id: "cin",
            name: "weather_cin",
            type: 2,
            unit: null
        },
        cloudcover: {
            id: "cloudcover",
            name: "Cloud Cover",
            type: 2,
            unit: null
        },
        pop: {
            id: "pop",
            name: "Chance Precipitation (%)",
            type: 2,
            unit: null
        },
        mint: {
            id: "mint",
            name: "Minimum Temperature",
            type: 2,
            unit: "degC"
        },
        datetime: {
            id: "datetime",
            name: "Date time",
            type: 3,
            unit: null
        },
        precip: {
            id: "precip",
            name: "Precipitation",
            type: 2,
            unit: "mm"
        },
        solarradiation: {
            id: "solarradiation",
            name: "Solar Radiation",
            type: 2,
            unit: null
        },
        dew: {
            id: "dew",
            name: "Dew Point",
            type: 2,
            unit: "degc"
        },
        humidity: {
            id: "humidity",
            name: "Relative Humidity",
            type: 2,
            unit: null
        },
        longitude: {
            id: "longitude",
            name: "Longitude",
            type: 2,
            unit: null
        },
        temp: {
            id: "temp",
            name: "Temperature",
            type: 2,
            unit: "degc"
        },
        address: {
            id: "address",
            name: "Address",
            type: 1,
            unit: null
        },
        maxt: {
            id: "maxt",
            name: "Maximum Temperature",
            type: 2,
            unit: "degC"
        },
        visibility: {
            id: "visibility",
            name: "Visibility",
            type: 2,
            unit: "km"
        },
        wspd: {
            id: "wspd",
            name: "Wind Speed",
            type: 2,
            unit: "kph"
        },
        severerisk: {
            id: "severerisk",
            name: "weather_severerisk",
            type: 2,
            unit: null
        },
        solarenergy: {
            id: "solarenergy",
            name: "Solar Energy",
            type: 2,
            unit: null
        },
        resolvedAddress: {
            id: "resolvedAddress",
            name: "Resolved Address",
            type: 1,
            unit: null
        },
        heatindex: {
            id: "heatindex",
            name: "Heat Index",
            type: 2,
            unit: "degc"
        },
        snowdepth: {
            id: "snowdepth",
            name: "Snow Depth",
            type: 2,
            unit: "cm"
        },
        sealevelpressure: {
            id: "sealevelpressure",
            name: "Sea Level Pressure",
            type: 2,
            unit: "mb"
        },
        snow: {
            id: "snow",
            name: "Snow",
            type: 2,
            unit: "cm"
        },
        name: {
            id: "name",
            name: "Name",
            type: 1,
            unit: null
        },
        wgust: {
            id: "wgust",
            name: "Wind Gust",
            type: 2,
            unit: "kph"
        },
        conditions: {
            id: "conditions",
            name: "Conditions",
            type: 1,
            unit: null
        },
        windchill: {
            id: "windchill",
            name: "Wind Chill",
            type: 2,
            unit: "degc"
        },
        cape: {
            id: "cape",
            name: "weather_cape",
            type: 2,
            unit: null
        }
    },
    remainingCost: 0,
    queryCost: 1,
    messages: null,
    location: {
        stationContributions: null,
        values: [
            {
                wdir: 192.2,
                uvindex: 2.1,
                datetimeStr: "2024-08-26T00:00:00+08:00",
                preciptype: "",
                cin: -0.1,
                cloudcover: 86.9,
                pop: 0.0,
                mint: 21.7,
                datetime: 1724630400000,
                precip: 0.1,
                solarradiation: 211.8,
                dew: 19.7,
                humidity: 79.6,
                temp: 23.6,
                maxt: 27.6,
                visibility: 15.6,
                wspd: 4.6,
                severerisk: 10.0,
                solarenergy: 0.8,
                heatindex: 28.7,
                snowdepth: 0.0,
                sealevelpressure: 1012.4,
                snow: 0.0,
                wgust: 18.4,
                conditions: "Overcast",
                windchill: null,
                cape: 5.4
            },
            {
                wdir: 212.9,
                uvindex: 2.8,
                datetimeStr: "2024-08-27T00:00:00+08:00",
                preciptype: "",
                cin: -5.6,
                cloudcover: 84.5,
                pop: 6.5,
                mint: 19.9,
                datetime: 1724716800000,
                precip: 0.0,
                solarradiation: 283.0,
                dew: 19.2,
                humidity: 76.1,
                temp: 23.9,
                maxt: 28.6,
                visibility: 15.7,
                wspd: 6.2,
                severerisk: 10.0,
                solarenergy: 1.0,
                heatindex: 29.5,
                snowdepth: 0.0,
                sealevelpressure: 1013.2,
                snow: 0.0,
                wgust: 18.4,
                conditions: "Overcast",
                windchill: null,
                cape: 5.0
            },
            {
                wdir: 209.2,
                uvindex: 2.8,
                datetimeStr: "2024-08-28T00:00:00+08:00",
                preciptype: "",
                cin: -23.2,
                cloudcover: 62.7,
                pop: 6.5,
                mint: 20.4,
                datetime: 1724803200000,
                precip: 0.2,
                solarradiation: 285.5,
                dew: 20.3,
                humidity: 80.7,
                temp: 24.1,
                maxt: 29.0,
                visibility: 15.4,
                wspd: 5.3,
                severerisk: 10.0,
                solarenergy: 1.0,
                heatindex: 30.6,
                snowdepth: 0.0,
                sealevelpressure: 1012.7,
                snow: 0.0,
                wgust: 15.8,
                conditions: "Partially cloudy",
                windchill: null,
                cape: 97.7
            },
            {
                wdir: 178.2,
                uvindex: 2.8,
                datetimeStr: "2024-08-29T00:00:00+08:00",
                preciptype: "",
                cin: -6.8,
                cloudcover: 85.4,
                pop: 19.4,
                mint: 21.8,
                datetime: 1724889600000,
                precip: 0.8,
                solarradiation: 279.1,
                dew: 21.0,
                humidity: 82.3,
                temp: 24.4,
                maxt: 28.5,
                visibility: 15.4,
                wspd: 5.2,
                severerisk: 10.0,
                solarenergy: 1.0,
                heatindex: 30.5,
                snowdepth: 0.0,
                sealevelpressure: 1012.9,
                snow: 0.0,
                wgust: 15.1,
                conditions: "Overcast",
                windchill: null,
                cape: 190.0
            },
            {
                wdir: 227.9,
                uvindex: 2.8,
                datetimeStr: "2024-08-30T00:00:00+08:00",
                preciptype: "",
                cin: -5.2,
                cloudcover: 54.2,
                pop: 32.3,
                mint: 20.8,
                datetime: 1724976000000,
                precip: 1.0,
                solarradiation: 281.8,
                dew: 20.6,
                humidity: 85.2,
                temp: 23.5,
                maxt: 28.2,
                visibility: 15.3,
                wspd: 5.0,
                severerisk: 10.0,
                solarenergy: 1.0,
                heatindex: 30.0,
                snowdepth: 0.0,
                sealevelpressure: 1013.3,
                snow: 0.0,
                wgust: 13.0,
                conditions: "Partially cloudy",
                windchill: null,
                cape: 71.9
            },
            {
                wdir: 217.1,
                uvindex: 2.7,
                datetimeStr: "2024-08-31T00:00:00+08:00",
                preciptype: "",
                cin: -7.6,
                cloudcover: 57.9,
                pop: 45.2,
                mint: 20.4,
                datetime: 1725062400000,
                precip: 0.4,
                solarradiation: 272.5,
                dew: 19.4,
                humidity: 80.2,
                temp: 23.3,
                maxt: 27.3,
                visibility: 15.2,
                wspd: 6.1,
                severerisk: 10.0,
                solarenergy: 1.0,
                heatindex: 28.5,
                snowdepth: 0.0,
                sealevelpressure: 1012.8,
                snow: 0.0,
                wgust: 12.2,
                conditions: "Partially cloudy",
                windchill: null,
                cape: 14.9
            },
            {
                wdir: 185.8,
                uvindex: 2.2,
                datetimeStr: "2024-09-01T00:00:00+08:00",
                preciptype: "",
                cin: -37.1,
                cloudcover: 72.9,
                pop: 32.3,
                mint: 20.9,
                datetime: 1725148800000,
                precip: 0.3,
                solarradiation: 220.3,
                dew: 19.8,
                humidity: 79.6,
                temp: 23.6,
                maxt: 27.4,
                visibility: 15.5,
                wspd: 5.3,
                severerisk: 10.0,
                solarenergy: 0.8,
                heatindex: 28.7,
                snowdepth: 0.0,
                sealevelpressure: 1012.5,
                snow: 0.0,
                wgust: 10.1,
                conditions: "Partially cloudy",
                windchill: null,
                cape: 20.3
            },
            {
                wdir: 153.9,
                uvindex: 2.7,
                datetimeStr: "2024-09-02T00:00:00+08:00",
                preciptype: "",
                cin: -47.3,
                cloudcover: 78.9,
                pop: 41.9,
                mint: 22.4,
                datetime: 1725235200000,
                precip: 1.2,
                solarradiation: 266.4,
                dew: 21.6,
                humidity: 85.4,
                temp: 24.4,
                maxt: 28.1,
                visibility: 16.7,
                wspd: 6.1,
                severerisk: 9.1,
                solarenergy: 1.0,
                heatindex: 30.4,
                snowdepth: 0.0,
                sealevelpressure: 1011.8,
                snow: 0.0,
                wgust: 10.4,
                conditions: "Overcast",
                windchill: null,
                cape: 296.8
            }
        ],
        id: "Klungkung",
        address: "Klungkung, Indonesia",
        name: "Klungkung",
        index: 0,
        latitude: -8.56281,
        longitude: 115.419,
        distance: 0.0,
        time: 0.0,
        tz: "Asia/Makassar",
        currentConditions: {
            wdir: 169.0,
            temp: 29.1,
            sunrise: "2024-08-26T06:23:01+08:00",
            visibility: 10.0,
            wspd: 21.1,
            icon: "clear-day",
            stations: "",
            heatindex: 33.3,
            cloudcover: 25.0,
            datetime: "2024-08-26T15:00:00+08:00",
            precip: null,
            moonphase: 0.75,
            snowdepth: null,
            sealevelpressure: 1010.0,
            dew: 23.6,
            sunset: "2024-08-26T18:17:24+08:00",
            humidity: 72.5,
            wgust: null,
            windchill: null
        },
        alerts: null
    }
}

// This is the processed and formatted version of forecastRaw
const forecast = {
    location: {
        id: "Klungkung",
        name: "Klungkung",
        address: "Klungkung, Indonesia",
        latitude: -8.56281,
        longitude: 115.419,
        timezone: "Asia/Makassar"
    },
    currentConditions: {
        temperature: 29.1,
        feelsLike: 33.3,
        humidity: 72.5,
        windSpeed: 21.1,
        windDirection: 169,
        visibility: 10,
        cloudCover: 25,
        precipitation: null,
        sunrise: "2024-08-26T06:23:01+08:00",
        sunset: "2024-08-26T18:17:24+08:00",
        icon: "clear-day",
        moonPhase: 0.75,
        sealevelPressure: 1010,
        dewPoint: 23.6,
        windGust: null,
        windChill: null
    },
    forecast: [
        {
            date: "2024-08-26",
            temperature: {
                min: 21.7,
                max: 27.6
            },
            precipitation: 0.1,
            cloudCover: 86.9,
            wind: {
                speed: 4.6,
                gust: 18.4,
                direction: 192.2
            },
            humidity: 79.6,
            uvIndex: 2.1,
            visibility: 15.6,
            solarRadiation: 211.8,
            heatIndex: 28.7,
            snow: 0,
            snowDepth: 0,
            sealevelPressure: 1012.4,
            conditions: "Overcast"
        },
        {
            date: "2024-08-27",
            temperature: {
                min: 19.9,
                max: 28.6
            },
            precipitation: 0,
            cloudCover: 84.5,
            wind: {
                speed: 6.2,
                gust: 18.4,
                direction: 212.9
            },
            humidity: 76.1,
            uvIndex: 2.8,
            visibility: 15.7,
            solarRadiation: 283,
            heatIndex: 29.5,
            snow: 0,
            snowDepth: 0,
            sealevelPressure: 1013.2,
            conditions: "Overcast"
        },
        {
            date: "2024-08-28",
            temperature: {
                min: 20.4,
                max: 29
            },
            precipitation: 0.2,
            cloudCover: 62.7,
            wind: {
                speed: 5.3,
                gust: 15.8,
                direction: 209.2
            },
            humidity: 80.7,
            uvIndex: 2.8,
            visibility: 15.4,
            solarRadiation: 285.5,
            heatIndex: 30.6,
            snow: 0,
            snowDepth: 0,
            sealevelPressure: 1012.7,
            conditions: "Partially cloudy"
        },
        {
            date: "2024-08-29",
            temperature: {
                min: 21.8,
                max: 28.5
            },
            precipitation: 0.8,
            cloudCover: 85.4,
            wind: {
                speed: 5.2,
                gust: 15.1,
                direction: 178.2
            },
            humidity: 82.3,
            uvIndex: 2.8,
            visibility: 15.4,
            solarRadiation: 279.1,
            heatIndex: 30.5,
            snow: 0,
            snowDepth: 0,
            sealevelPressure: 1012.9,
            conditions: "Overcast"
        },
        {
            date: "2024-08-30",
            temperature: {
                min: 20.8,
                max: 28.2
            },
            precipitation: 1,
            cloudCover: 54.2,
            wind: {
                speed: 5,
                gust: 13,
                direction: 227.9
            },
            humidity: 85.2,
            uvIndex: 2.8,
            visibility: 15.3,
            solarRadiation: 281.8,
            heatIndex: 30,
            snow: 0,
            snowDepth: 0,
            sealevelPressure: 1013.3,
            conditions: "Partially cloudy"
        },
        {
            date: "2024-08-31",
            temperature: {
                min: 20.4,
                max: 27.3
            },
            precipitation: 0.4,
            cloudCover: 57.9,
            wind: {
                speed: 6.1,
                gust: 12.2,
                direction: 217.1
            },
            humidity: 80.2,
            uvIndex: 2.7,
            visibility: 15.2,
            solarRadiation: 272.5,
            heatIndex: 28.5,
            snow: 0,
            snowDepth: 0,
            sealevelPressure: 1012.8,
            conditions: "Partially cloudy"
        },
        {
            date: "2024-09-01",
            temperature: {
                min: 20.9,
                max: 27.4
            },
            precipitation: 0.3,
            cloudCover: 72.9,
            wind: {
                speed: 5.3,
                gust: 10.1,
                direction: 185.8
            },
            humidity: 79.6,
            uvIndex: 2.2,
            visibility: 15.5,
            solarRadiation: 220.3,
            heatIndex: 28.7,
            snow: 0,
            snowDepth: 0,
            sealevelPressure: 1012.5,
            conditions: "Partially cloudy"
        },
        {
            date: "2024-09-02",
            temperature: {
                min: 22.4,
                max: 28.1
            },
            precipitation: 1.2,
            cloudCover: 78.9,
            wind: {
                speed: 6.1,
                gust: 10.4,
                direction: 153.9
            },
            humidity: 85.4,
            uvIndex: 2.7,
            visibility: 16.7,
            solarRadiation: 266.4,
            heatIndex: 30.4,
            snow: 0,
            snowDepth: 0,
            sealevelPressure: 1011.8,
            conditions: "Overcast"
        }
    ]
}

module.exports = { forecastRaw, forecast }