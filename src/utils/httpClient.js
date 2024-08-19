const axios = require('axios')

const instance = axios.create({
    baseURL: process.env.WEATHER_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Interceptor to log the request and create a cURL command
instance.interceptors.request.use(config => {
    // Construct the full URL with query parameters
    let url = `${config.baseURL}${config.url}`;
    
    if (config.params) {
        const queryParams = new URLSearchParams(config.params).toString();
        url += `?${queryParams}`;
    }

    // Build the cURL command
    let curl = `curl --location '${url}'`;

    // Add headers
    for (let header in config.headers) {
        curl += ` -H '${header}: ${config.headers[header]}'`;
    }

    // Log the generated cURL command
    console.log('Generated cURL command:', curl);

    return config;
}, error => {
    return Promise.reject(error);
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before the request is sent
        console.log('Request:', config)
        return config
    },
    function (error) {
        // Do something with the request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lies within the range of 2xx causes this function to trigger
        console.log('Response:', response)
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx causes this function to trigger
        console.error('Response Error:', error);
        return Promise.reject(error)
    }
)

module.exports = instance