const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=b51c14f8ca48bb346575c7b57656fe56&query='+ address + ''

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather', undefined)
        } else if (response.body.error) {
            callback('Unable to find Location, Try a different Location')
        } else {
            callback(undefined, {
                weather: `It is currently ${response.body.current.temperature} degrees in ${response.body.request.query}`,
                description: `It is ${response.body.current.weather_descriptions}`
            })
        }
    })
}

module.exports = forecast


