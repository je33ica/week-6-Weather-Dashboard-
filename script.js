
// A weather dashboard that will run in the browser, feature dynamically updated HTML and CSS.
// Use `localStorage` to store any persistent data.

// a user can serach for a city, it will be saved to local storage
// displayed on the window for user to access again 

//variables that will may be needed
 var currentCitySearch
 var previousCitySearch // to be set to history
 var currentDate
 //var iconOfWeather
 //var temperature
 //var humidity
 //var windSpeed
 var UVindex
 var city = "london"  //"" hardcoding for now to continue to check
 var APIKey = "8bf86a426ab2a44eddf367d412a04ad4";
 


//   $("#form").on('submit', function (e) {
//     e.preventDefault();
//     var city = "london"
//     city = $("#city-input").val()
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
  // need long and lat to make UV api call
      var longitude = response.coord.lon
      var latitude = response.coord.lat
  console.log(latitude, longitude)


//use this one for the current and 5 day weather forcast 
 //var forcastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`
 //var forcastURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`
 var forcastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely
,hourly,alerts&appid=${APIKey}&units=metric`
 $.ajax({
  url: forcastURL,
  method: "GET"
}).then(function (response) {
  console.log(response);

// these are the responses for the current day in the array 
  var cityName = response.timezone
  var temp = response.current.temp
  var currentWeather = response.current.weather[0].description
  var windSpeed = response.current.wind_speed
  var humidity = response.current.humidity
  var UVindex = response.current.uvi
  
  console.log('I am the Continent & City ' + cityName);
  console.log( "I am the temp " + temp +"°celsius") 
  console.log('Current description of weather: ' + currentWeather)
  console.log('I am the speed of the wind ' + windSpeed + "mph"); ;
  console.log('I am the humidity '+ humidity + "%");
  
//***********ask Colum about Icons*********** */
  // var icon = `http://openweathermap.org/img/wn/${response.curent.weather[0].icon}@2x.png`
 // var icon = `http://openweathermap.org/img/wn/${response.curent.weather[0].id}@2x.png`
 // console.log('i am the weather icon ' + icon)

  var UVindex = response.current.uvi
  if(UVindex.value < 3){
    $("#UV-index").removeClass()
    $("#UV-index").addClass("badge badge-success")
    }
    if(UVindex.value > 3 &&   UVindex.value < 7){
    $("#UV-index").removeClass()
    $("#UV-index").addClass("badge badge-warning")
    }
    if( UVindex.value > 7){
      $("#UV-index").removeClass()
      $("#UV-index").addClass("badge badge-danger")
      }
  console.log('I am the UV index '+ UVindex);
} )

//need to figure out how to extract 5 dyas from data without repeating code- use for loop
// use other API call!
// var fiveDayForcastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`

//   for (var i = 1; 1 < 6; i++) {
//       $.ajax({
//       url: fiveDayForcastURL,
//       method: "GET"
//       }).then(function (response5days) {
//         var fiveDate = $("#date1").text(moment.unix(response5days.dail))

//       }}

//this closes the loop that started at lang/lon
});