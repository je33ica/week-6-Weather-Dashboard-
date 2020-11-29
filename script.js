$(document).ready(function () {
  $("#search-button").on("click", function () {
    var searched = $("#city-input").val();
    $("city-input").val("");
    searchWeather(searched);
  });

  var APIKey = "8bf86a426ab2a44eddf367d412a04ad4";

  var longitude = "";
  var latitude = "";
  function searchWeather(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
      success: function (response) {
        var previousSearch = JSON.parse(localStorage.getItem("cities")) || [];
        if (previousSearch.indexOf(city) === -1) {
          previousSearch.push(city);
          localStorage.setItem("cities", JSON.stringify(previousSearch));
        }
        longitude = response.coord.lon;
        latitude = response.coord.lat;

        getForecast(city);
        displaySearch(previousSearch);
        get5day(city);
      },
    });
  }

  //clear previous 'day' display
  function displaySearch(citiesArr) {
    $("#list").empty();
  
 
    for (var i = 0; i < citiesArr.length; i++) {
      $("#list").append($("<li>").text(citiesArr[i]));
    }
  }
  $("#list").on("click", "li", function () {
    searchWeather($(this).text());
  
    
  });

  // current Day
  function getForecast(city) {
    var forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`;
    $.ajax({
      url: forecastUrl,
      method: "GET",
      statusCode: {
        404: function() {
            $(".currentcity").hide();
            alert("Sorry! City" + searchCity+" not found");
        }
    },
      success: function (response) {
        $(".city-div").empty();
       
        var currentCity = $("<h3>").text(response.city.name);
        var currentTemp = $("<h4>").text(
          "Weather: " + response.list[0].main.temp + "°celsius"
        );
        var currentWeather = $("<h4>").text(
          "Temperature : " + response.list[0].weather[0].description
        );
        var currentWind = $("<h4>").text(
          "Wind speed : " + response.list[0].wind.speed + " MPH"
        );
        var currentHumidity = $("<h4>").text(
          "Humidity : " + response.list[0].main.humidity + "% humidity"
        );
        var icon = $("<img>").attr(
          "src",
          `http://openweathermap.org/img/w/${response.list[0].weather[0].icon}.png`
        );
         icon.addClass("weather-icon")
        $(".city-div").append(
          currentCity,
          currentWeather,
          currentTemp,
          currentWind,
          currentHumidity,
          icon
        );
        getUvIndex(latitude, longitude);
      },
    });

    function getUvIndex(latitude, longitude) {
      var getUvUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${latitude}&lon=${longitude}`;
      $.ajax({
        url: getUvUrl,
        method: "GET",
        success: function (response) {
          var uvResponse = response.value;
          var uvEl = $("<h4>").text("UV: " + uvResponse);
          uvEl.addClass("uv");
          // change color depending on uv value
          if (uvResponse <= 2) {
            uvEl.addClass("low-uv");
          } else if (uvResponse < 5) {
            uvEl.addClass("moderate-uv");
          } else if (uvResponse < 7) {
            uvEl.addClass("high-uv");
          } else if (uvResponse < 10) {
            uvEl.addClass("very-high-uv");
          } else {
            uvEl.addClass("extreme-high-uv");
          }
          $(".city-div").append(uvEl);
        },
      });
    }
  }

  //5day
  
  $(".forecast-div #date1").append($("<p>").text("Day 1"))
  $(".forecast-div #date2").append($("<p>").text("Day 2"))
  $(".forecast-div #date3").append($("<p>").text("Day 3"))
  $(".forecast-div #date4").append($("<p>").text("Day 4"))
  $(".forecast-div #date5").append($("<p>").text("Day 5"))

  function get5day(city) {
    var day5URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`;
    $.ajax({
      url: day5URL,
      type: "GET",
      success: function (data) {
       
        //day1
        var day1W = $("<p>").text(
          "Weather : " + data.list[7].weather[0].description
        );
        var day1T = $("<p>").text(
          "Temperature: " + data.list[7].main.temp + "°celsius"
        );
        var day1WS = $("<p>").text(
          "Wind speed : " + data.list[7].wind.speed + " MPH"
        );
        var day1H = $("<p>").text(
          "Humidity : " + data.list[7].main.humidity + "% humidity"
        );
        var icon1 = $("<img>").attr(
          "src",
          `http://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png`
        );
        $(".forecast-div #date1").append(day1W, day1T, day1WS, day1H, icon1);
        //day2
        var day2W = $("<p>").text(
          "Weather: " + data.list[15].weather[0].description
        );
        var day2T = $("<p>").text(
          "Temperature: " + data.list[15].main.temp + "°celsius"
        );
        var day2WS = $("<p>").text(
          "Wind speed : " + data.list[15].wind.speed + " MPH"
        );
        var day2H = $("<p>").text(
          "Humidity : " + data.list[15].main.humidity + "% humidity"
        );
        var icon2 = $("<img>").attr(
          "src",
          `http://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png`
        );
        $(".forecast-div #date2").append(day2W, day2T, day2WS, day2H, icon2);
        //day3
        var day3W = $("<p>").text(
          "Weather: " + data.list[23].weather[0].description
        );
        var day3T = $("<p>").text(
          "Temperature: " + data.list[23].main.temp + "°celsius"
        );
        var day3WS = $("<p>").text(
          "Wind speed : " + data.list[23].wind.speed + " MPH"
        );
        var day3H = $("<p>").text(
          "Humidity : " + data.list[23].main.humidity + "% humidity"
        );
        var icon3 = $("<img>").attr(
          "src",
          `http://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png`
        );
        $(".forecast-div #date3").append(day3W, day3T, day3WS, day3H, icon3);
        //day4
        var day4W = $("<p>").text(
          "Weather: " + data.list[31].weather[0].description
        );
        var day4T = $("<p>").text(
          "Temperature: " + data.list[31].main.temp + "°celsius"
        );
        var day4WS = $("<p>").text(
          "Wind speed : " + data.list[31].wind.speed + " MPH"
        );
        var day4H = $("<p>").text(
          "Humidity : " + data.list[31].main.humidity + "% humidity"
        );
        var icon4 = $("<img>").attr(
          "src",
          `http://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png`
        );
        $(".forecast-div #date4").append(day4W, day4T, day4WS, day4H, icon4);
        //day5
        var day5W = $("<p>").text(
          "Weather: " + data.list[39].weather[0].description
        );
        var day5T = $("<p>").text(
          "Temperature: " + data.list[39].main.temp + "°celsius"
        );
        var day5WS = $("<p>").text(
          "Wind speed : " + data.list[39].wind.speed + " MPH"
        );
        var day5H = $("<p>").text(
          "Humidity : " + data.list[39].main.humidity + "% humidity"
        );
        var icon5 = $("<img>").attr(
          "src",
          `http://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png`
        );
        $(".forecast-div #date5").append(day5W, day5T, day5WS, day5H, icon5);
      },
      
    });
  }

  var previousSearch = JSON.parse(localStorage.getItem("cities")) || [];

  displaySearch(previousSearch);
});
// code i want to work on****** i want to creat a for loop for 5 days
// for (let i = 0; i < data.list.length; i++) {
//   if (data.list[i].dt_txt.indexOf("15:00:00") !== -1)
//    var fiveDayTemp = $("<p>").text("Temp: " + data.list[i].main.temp + "°");
//    fiveDayTemp.attr("id", "#fiveDayTemp[i]");
// let fiveHumidity = $("<p>").attr("id", "humDay").text("Humidity: " + JSON.stringify(response5Day.daily[i].humidity) + "%");
// fiveHumidity.attr("id", "#fiveHumidity[i]");
// let iconCode = response5Day.daily[i].weather[0].icon;
// let iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
// let weatherImgDay = $("<img>").attr("src", iconURL);
// $("#testImage").attr("src", iconURL);

//  ) }
//}
