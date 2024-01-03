require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.post('/getWeather', async (req, res) => {
    const data = req.body.cities;
    let cities = data.substring(1, data.length-1);
    cities = cities.split(',');

    const weatherData = {};
    weatherData.weather = {};
    for (let city of cities) {
        weatherData.weather[city] = await getWeather(city);
    }
    res.send(weatherData);
});

const getWeather = async (city) => {
    const data = await fetch('http://api.weatherapi.com/v1/current.json?key='+process.env.api_key+'&q='+city+'&aqi=no')
    const weatherData = await data.json();
    return weatherData.current.temp_c;
}


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000.');
});

