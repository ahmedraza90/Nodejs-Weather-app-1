const express= require('express')
const hbs = require('hbs')
const request = require('request')
const path = require('path')
const geo_code = require('./utils/geo_code')
const weather  = require('./utils/weather')

const app = express()

//paths
const public = path.join(__dirname,'../public')
const partials = path.join(__dirname,'../templates/partials')
const views = path.join(__dirname,'../templates/views')

//middle ware
app.use(express.static(public))

//template engine
app.set('view engine','hbs')
app.set('views',views)
hbs.registerPartials(partials)


//get request
app.get('',(req,res)=>{
    if(Object.keys(req.query).length===0){
        return res.render('home',{
            title: 'home page'
        })
    }
    return res.render('404')
})
app.get('/contact',(req,res)=>{
    if(Object.keys(req.query).length===0){
        return res.render('contact',{
        title: 'contact page'
        })
    }
    return res.render('404')
})
app.get('/about',(req,res)=>{
    if(Object.keys(req.query).length===0){
        return res.render('about',{
            title: 'about page'
        })
    }
    return res.render('404')
})
//this is called setting query string at endpoint
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send('location is required')
    }
    geo_code(req.query.location,(error,{place,longtitude,latitude})=>{
        if(error){ return res.send({   error: error })     }
        weather(longtitude,latitude,(error,response)=>{
            if(error){   return res.send ({error:error})   }
            return res.send({
                city        :response.city,
                conutry     :response.conutry,
                region      :response.region,
                temperature :response.temperature,
                weather     :response.weather
            })
        })
    })
})
//We now have our HTTP endpoint which sends back the JSON forecast information

app.get('*',(req,res)=>{
    res.render('404')
})
app.listen(3000)


//query string
//What Does Query String Mean?
//A query string is the portion of a URL where data is passed to a web application and/or back-end database.
//reason we need query strings is that the HTTP protocol is stateless by design. For a website to be anything
//more than a brochure, you need to maintain state (store data). There are a number of ways to do this: On 
//most web servers, you can use something like session state server-side. On the client, you can store via 
//cookies. Or in the URL, you can store data via a query string.
//it is provided at the end of the url
//it starts with the question mark. this is key value pair
//the information of query string is available to us in our express route handler. in requ object

//Path parametres:
// Route parameters are named URL segments that are used to capture the values specified at their position in the URL
//  “medium.com/@michaeltm98” takes you to my personal profile. “@michaeltm98” is the path parameter that tells the server which profile to send back

// when to use Query Parameter or URI Parameter while designing an API.
// URI parameter (Path Param) is basically used to identify a specific resource or resources whereas Query Parameter is used to sort/filter those resources.
// Let's consider an example where you want identify the employee on the basis of employeeID, and in that case, you will be using the URI param.
// Take another example where you want to filter the employee on the basis of designation, and in that case, you will be using Query Parameter.
// The client whether it's us typing a URL in the browser or us providing a URL via client side JavaScript 
//can set up that query string, it gets sent off to the server, the server can use that information with the 
//request and it can send a response back


