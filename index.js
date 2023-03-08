const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the zip from the html form, display in // console. Takes in as string, ex. for zip 02139
        var idcity = String(req.body.cityidInput);
        console.log(req.body.cityidInput);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "b6304e5650dc46d1c2e0c54806e5ac4f";
        const url = "https://api.openweathermap.org/data/2.5/weather?id=" + idcity +  "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const city = weatherData.name;
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity
            const windspeed = weatherData.wind.speed
            const winddirection = weatherData.wind.deg
            const cloudiness = weatherData.clouds.all;
            
            // displays the output of the results
            res.write("<h1>" + city + "<h1>");
            res.write("<h1>" + temp + " degrees Fahrenheit<h1>");
           res.write("<h1>" + humidity + " %<h1>");
            res.write("<h1>" + windspeed + " mph<h1>");
            res.write("<h1>" + winddirection + " degrees <h1>");
            res.write("<h1>" + cloudiness + " %<h1>");
            res.send();
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
