$(document).ready(function () {
  $("#search-button").on("click", function () {
    var searched = $("#city-input").val();
    $("city-input").val("");
    console.log(searched);
    searchWeather(searched);
  });

  var APIKey = "8bf86a426ab2a44eddf367d412a04ad4";

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
        var longitude = response.coord.lon;
        var latitude = response.coord.lat;

        getUvIndex(latitude, longitude);
        getForecast(city);
        displaySearch(previousSearch);
        get5day(city);
        console.log(response);
      },
    });
  }
  //  var cityName = response.
  function displaySearch(citiesArr) {
    $("#list").empty();
    for (var i = 0; i < citiesArr.length; i++) {
      $("#list").append($("<li>").text(citiesArr[i]));
    }
  }
  $("#list").on("click", "li", function () {
    searchWeather($(this).text());
  });

  //UV
  function getUvIndex(latitude, longitude) {
    var getUvUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${latitude}&lon=${longitude}`;
    $.ajax({
      url: getUvUrl,
      method: "GET",
      success: function (response) {
        var uvResponse = response.value;
        var uvEl = $("<p>").text("UV: hello " + uvResponse);
        // change color depending on uv value
        if (uvResponse < 3) {
          $("#icon").removeClass();
          $("#uv-index").addClass("badge badge-success");
        }
        if (uvResponse > 3 && uvResponse < 7) {
          $("#uv-index").removeClass();
          $("#uv-index").addClass("badge badge-warning");
        }
        if (uvResponse > 7) {
          $("#uv-index").removeClass();
          $("#uv-index").addClass("badge badge-danger");
        }
        console.log(uvEl, uvResponse);
        $(".city-div").append(uvEl);
      },
    });
  }

  // current Day
  function getForecast(city) {
    var forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`;
    $.ajax({
      url: forecastUrl,
      method: "GET",
      success: function (response) {
        $(".city-div").empty();
        console.log("forecast", response);

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

        $(".city-div").append(
          currentCity,
          currentWeather,
          currentTemp,
          currentWind,
          currentHumidity,
          icon
        );
      },
    });
  }

  //5day
  function get5day(city) {
    var day5URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`;
    $.ajax({
      url: day5URL,
      type: "GET",
      success: function (data) {
        console.log("i am the data" + data);
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
        $(".forecast-box #date1").append(day1W, day1T, day1WS, day1H, icon1);
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
        $(".forecast-box #date2").append(day2W, day2T, day2WS, day2H, icon2);
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
        $(".forecast-box #date3").append(day3W, day3T, day3WS, day3H, icon3);
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
        $(".forecast-box #date4").append(day4W, day4T, day4WS, day4H, icon4);
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
        $(".forecast-box #date5").append(day5W, day5T, day5WS, day5H, icon5);
      },
    });
  }

  var previousSearch = JSON.parse(localStorage.getItem("cities")) || [];

  displaySearch(previousSearch);
});
// for (let i = 0; i < data.list.length; i++) {
//   if (data.list[i].dt_txt.indexOf("15:00:00") !== -1)
//    var fiveDayTemp = $("<p>").text("Temp: " + data.list[i].main.temp + "°");
//    fiveDayTemp.attr("id", "#fiveDayTemp[i]");

// console.log(fiveDayTemp);} }
// let fiveHumidity = $("<p>").attr("id", "humDay").text("Humidity: " + JSON.stringify(response5Day.daily[i].humidity) + "%");
// fiveHumidity.attr("id", "#fiveHumidity[i]");

// let iconCode = response5Day.daily[i].weather[0].icon;
// let iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
// let weatherImgDay = $("<img>").attr("src", iconURL);
// $("#testImage").attr("src", iconURL);

//  ) }
//}
