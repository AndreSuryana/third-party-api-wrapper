# Third-Party API Wrapper Service Documentation

## Overview

The Third-Party API Wrapper Service is a Node.js application that integrates with various third-party APIs to provide data to other applications. Currently, it integrates with a weather API to fetch forecast data. It uses Redis for caching to optimize performance and reduce redundant API calls. This service is designed to allows for easy integration of additional APIs and expansion of data types in the future.

## Features

- **Weather API Integration**: Fetches weather forecast data from an external weather API.
- **Caching with Redis**: Reduces redundant API calls and improves response times by caching data.
- **Environment Variable Management**: Uses a `.env` file for configuration and credentials.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed.
- **Redis**: Redis must be installed and running.
- **Weather API Key**: Obtain an API key from [VisualCrossing](https://www.visualcrossing.com)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AndreSuryana/third-party-api-wrapper.git
    cd third-party-api-wrapper
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables by copying the provided `.env.example` file to create a `.env` file:
    ```bash
    cp .env.example .env
    ```
4. Edit the `.env` file to include your specific configuration details:
    ```conf
    # Application configuration
    PORT=3030

    # Weather API configuration
    WEATHER_API_KEY=your_api_key
    WEATHER_API_URL=https://api.visualcrossing.com

    # Redis configuration
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_PASSWORD=your_redis_password
    ```

### Running the Application

Start the application with:
```bash
npm start
```
The service will be available at `http://localhost:3030`.

## API Endpoints

### `GET /forecast`

Fetches weather forecast data for a specific location. Caches the response to improve performance.

**Request Parameters:**
- `location` (query parameter): Country name, city name, or city code (e.g., `Klungkung,Bali`)

**Example Request**
```bash
curl -X GET "http://localhost:3030/forecast?location=Klungkung"
```

**Example Response**
```json
{
    "location": {
        "id": "Klungkung",
        "name": "Klungkung",
        "address": "Klungkung, Indonesia",
        "latitude": -8.56281,
        "longitude": 115.419,
        "timezone": "Asia/Makassar"
    },
    "currentConditions": {
        "temperature": 28.1,
        "feelsLike": 31.8,
        "humidity": 76.8,
        // Other fields omitted for brevity
    },
    "forecast": [
        {
            "date": "2024-08-21",
            "temperature": {
                "min": 22.7,
                "max": 25.8
            },
            // Other fields omitted for brevity
            "conditions": "Overcast"
        },
        {
            "date": "2024-08-22",
            "temperature": {
                "min": 21.9,
                "max": 28.7
            },
            // Other fields omitted for brevity
            "conditions": "Rain, Overcast"
        },
        // More forecast data for additional days
    ]
}
```
*Note: The response includes forecast data for the next 7 days.*

## Future Development

### Weather API Enhancements

- **Additional Data Types**: Upcoming features will include the integration of additional weather data types, such as:
    - Historical weather data
    - Weather summaries

### Support for Additional APIs

- **Future Integration**: The service is designed to accomodate the integration of various third-party APIs, enabling:
    - Expansion to include diverse data sources
    - Enhancement of functionality with new features and services

## Troubleshooting

### Common Issues

1. **Redis Connection Errors:**
    - Verify Redis is running and configured correctly.
    - Check Redis settings in the `.env` file.

2. **API Key Errors:**
    - Ensure the API key is correct and has the required permissions.

## Contributing

Contributions are welcome. Please follow the guidelines for submitting pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.