const request = require('request')


const weather = (longtitude,latitude,callback)=>{
        const url = 'http://api.weatherstack.com/current?access_key=62599af55bb5632aeb7882bfc5d3169c&query='+longtitude+','+latitude+'&unit=c'
        request({url,json:true},(error,{body})=>{
            if(error){
              return  callback(error,undefined)
            }
            return callback(undefined,{
                city        :body.location.name,
                country     :body.location.country,
                region      :body.location.region,
                temperature :body.current.temperature,
                weather     :body.current.weather_descriptions[0]
            })
        })
}

module.exports=weather