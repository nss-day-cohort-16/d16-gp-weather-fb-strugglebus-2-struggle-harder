
"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db


let db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user");

function outputWeather (zipVal){
    let currentUser = user.getUser();

    db.getWeather(zipVal).then(function(weatherData){
        console.log("got some data", weatherData);
        var idArray = Object.keys(weatherData); 
        $('#weather-output').append(
        `Location: ${weatherData.name}<br>
         Temperature: ${weatherData.main.temp}<br>
         Conditions: ${weatherData.weather[0].description}<br>
         Air Pressure: ${weatherData.main.pressure}<br>
         Wind Speed : ${weatherData.wind.speed}<br>
        `);
    });    
}

/* ----- EVENT LISTENERS ----- */


$('#submitButton').click(function() {
  var zipVal = $('#zipInput').val(); 
  var zipTest = /^\d{5}(-\d{4})?$/.test(zipVal);
    if (zipTest) { 
      outputWeather(zipVal);
    }else {
      window.alert("Please enter a valid zip code."); 
    }
}); 


$("#auth-btn").click(function() {
  //console.log('clicked auth'); 
  user.logInGoogle()
    .then(function(result) {
    let user = result.user;
    //console.log('logged in user', user.uid);
    $("#zipcode-view").removeClass("hidden");
    $("#auth-btn").addClass("hidden"); 
  });
});


$("#logout").click(function() {
  user.logOut()
  .then(function() {
    $("#logout").addClass('is-hidden'); 
    $("#auth-btn").removeClass("is-hidden"); 
  });
});


module.exports = outputWeather;
