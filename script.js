
// A weather dashboard that will run in the browser, feature dynamically updated HTML and CSS.
// Use `localStorage` to store any persistent data.

// a user can serach for a city, it will be saved to local storage
// displayed on the window for user to access again 

// the user should be presented with
//   API call from https://openweathermap.org/ specfic to 
// 1- name of city, search bar, display name and place for history
// 2- date, current
// 3- icon representation of weather conditions
// 4- temperature
// 5- humidity
// 6- wind speed
// 7- UV index

//variables that will may be needed
 var currentCitySearch
 var previousCitySearch // to be set to history
 var currentDate
 var iconOfWeather
 var temperature
 var humidity
 var windSpeed
 var UVindex
 var city = "london"  //"" hardcoding for now to continue to check
 var APIKey = "8bf86a426ab2a44eddf367d412a04ad4";
 //use this one for the weather forcast 

// var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`
// console.log(queryURL);



 // use this one for long and lat to create the UV index call
//  var queryURL2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
//  console.log(queryURL2);
//  $.ajax({
//     url: queryURL2,
//     method: "GET"
//   }).then(function (response) {

//     var longitude = response.coord.lon
//     var latitude = response.coord.lat 
//     $("#UV-index").empty()
//     var uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${latitude}&lon=${longitude}`
//     $.ajax({
//       url: uvURL,
//       method: "GET"
//     }).then(function (response) 
//       console.log(response)
//   }

//   $("#form").on('submit', function (e) {
//     e.preventDefault();
//     var city = "london"
//     city = $("#city-input").val()
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
  
      var longitude = response.coord.lon
      var latitude = response.coord.lat
  console.log(latitude, longitude)})