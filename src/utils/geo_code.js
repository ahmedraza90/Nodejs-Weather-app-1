const request = require('request')


const geo_code = (location,callback)=>{
    if(!location){
        return callback('location is not defined',undefined)
    }
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiYWhtZWQ5MDkwIiwiYSI6ImNrc2dqOTVuejFmZTIydnAyeXo1MXU0cGQifQ.YbMhL6CEDBt0v1vSBFWepw&limit=1'
    request({url:url,json:true},(error,{body})=>{
        if(error){
           return callback('network problem',undefined)
        }
        return callback(undefined,{
            place: body.features[0].place_name,
            longtitude: body.features[0].center[1],
            latitude: body.features[0].center[0]
        })
    })
}
module.exports=geo_code
