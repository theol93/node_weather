const rp = require('request-promise')

module.exports = async function(city = ' ') {
    if (!city) {
        throw new Error('No empty name of city');

    }
    const KEY = 'daf9c4dba084295f1969fb8efaf57d4e';
    const uri = 'http://api.openweathermap.org/data/2.5/weather';
    
    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    }

    try {
        const data = await  rp(options)
        const celsius = (data.main.temp - 32)*5/9;

        return {
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } catch(error) {
        return {
            weather: null,
            error: error.error.message
        }
    }
    
}