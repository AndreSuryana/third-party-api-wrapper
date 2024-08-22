const errorResponseFormatter = (statusCode, error, message) => {
    return {
        statusCode,
        error,
        message
    }
}

module.exports = errorResponseFormatter