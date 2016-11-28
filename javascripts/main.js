
"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db


let db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user");

function outputWeather (zipVal){
   $("#weather").html(''); 
    let currentUser = user.getUser();
    console.log('YEP. WEATHER');
    db.getWeather(zipVal).then(function(weatherData){
        console.log("got some data", weatherData);
        var idArray = Object.keys(weatherData); 
    idArray.forEach(function(key) {
      weatherData[key].id = key;
        });
  
  });


    
}

$('#submitButton').click(function() {
 
  var zipVal = $('#zipInput').val(); 
  var zipTest = /^\d{5}(-\d{4})?$/.test(zipVal);
    if (zipTest) {
      console.log('good job'); 
      outputWeather(zipVal);
    }else {
      console.log('failure'); 
    }


}); 



$("#auth-btn").click(function() {
  console.log('clicked auth'); 
  user.logInGoogle()
    .then(function(result) {
    let user = result.user;
    console.log('logged in user', user.uid);
    $("#auth-btn").addClass("is-hidden"); 
    $("#logout").removeClass('is-hidden'); 
  
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
