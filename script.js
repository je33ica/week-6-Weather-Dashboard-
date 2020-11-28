
// A weather dashboard that will run in the browser, feature dynamically updated HTML and CSS.
// Use `localStorage` to store any persistent data.
// a user can serach for a city, it will be saved to local storage
// displayed on the window for user to access again 

 var city = "london"  //"" hardcoding for now to continue to check
 var APIKey = "0234a5db053f0c8c1789c2487e8d0de2" //<--random key on net "8bf86a426ab2a44eddf367d412a04ad4"; <--my key

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
  console.log(latitude, longitude)
  //*****Ask colum how i can make them golbal variables for long/latitude */


  
//use this one for the current and 5 day weather forcast 
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


//need to figure out how to extract 5 days from data without repeating code- use for loop

var fiveDayURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely
,hourly,alerts&appid=${APIKey}&units=metric`

  for (var i = 1; 1 < 6; i++) 
      $.ajax({
        url: fiveDayURL,
        method: "GET"
      }).then(function (response5days) {
        console.log(response5days);
      

      var forcastTemp = response5days.daily[i].temp.day
     // var forcastWind = response5days.daily[i].wind_speed
     // var forcastHumidity = response5days.daily[i].humidity
      console.log("i am the5d temp " + forcastTemp + "°celsius" );
        
    })

      
});