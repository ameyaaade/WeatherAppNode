const request = require('request')

const forecast =(latitude,longitude,callback)=>{
const url = `http://api.weatherstack.com/current?access_key=52e2a7e76b9f63f4ceea3c638800a16d&query=${latitude},${longitude}&units=f`

    request({url,json:true},(error,{body})=>{
        if (error) {
           callback("Unable to connect to weather Service ! ",undefined) 
        }
        else if (body.error) {
            callback("Unable to find location ! ",undefined)
        }
        else{
            const {weather_descriptions,temperature,feelslike}=body.current
            // callback(b)
        callback(undefined,`${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out `)
        }
    })
}
module.exports = forecast