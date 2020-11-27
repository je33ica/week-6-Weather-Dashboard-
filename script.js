
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
 

 //<-------------all of this for th UV-------------->
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

var UVqueryURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${APIKey}`
$.ajax({
    url: UVqueryURL,
    method: "GET",
    dataType: "json",
  }).then(function (response) {
     // response from UV api call but how do i make that a UV reading ?
    console.log(response.value)})
// appears in console but not on page( well undefined)because it's a lil bitch!
    $("#UV-index").text("UV Index: " + response.value)
   //badges for UV ratings- low,warning,high
    if(response.value < 3){
    $("#UV-index").removeClass()
    $("#UV-index").addClass("badge badge-success")
    }
    if(response.value > 3 && response.value < 7){
    $("#UV-index").removeClass()
    $("#UV-index").addClass("badge badge-warning")
    }
    if(response.value > 7){
      $("#UV-index").removeClass()
      $("#UV-index").addClass("badge badge-danger")
      }
  });
//<-----------------UV-------------->   




//use this one for the weather forcast 
 var forcastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`
 $.ajax({
  url: forcastURL,
  method: "GET"
}).then(function (response) {
// need long and lat to make UV api call
  var temp = response.list[0].main.temp
  var icon = response.list[1].weather[0].icon
  //var icon = response
console.log( "I am the temp " + temp +"°celsius") 
console.log('i am the weather icon ' + icon) ;
// list.dt.weather.id.icon
// list .dt .main.temp
// list.dt.wind. speed 
} )
