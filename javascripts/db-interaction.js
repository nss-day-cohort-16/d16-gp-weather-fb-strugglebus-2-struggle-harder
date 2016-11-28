"use strict"; 

let firebase = require("./firebaseConfig");


function getWeather(zip) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=c10648665493f00d731df750ee9b0436
`
    }).done(function(weatherData){
      resolve(weatherData);
    });
  });
}

module.exports = {getWeather}; 

