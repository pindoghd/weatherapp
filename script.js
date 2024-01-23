var apikey = "f174556e02b2ab9cd3e99d04ccde8d24";
var queryParams = { "appid": 'f174556e02b2ab9cd3e99d04ccde8d24' };
var queryCurrentURL = "https://api.openweathermap.org/data/2.5/weather?"
var query5DURL = "https://api.openweathermap.org/data/2.5/forecast?";
// var queryGEOURL = "https://api.openweathermap.org/geo/1.0/direct?"; //to get the latitude and longtitude of the city we want weather data from
dayjs.extend(window.dayjs_plugin_relativeTime);

var checkWeather = function (data) {
    var queryParams = "";
    var queryParams = { "appid": 'f174556e02b2ab9cd3e99d04ccde8d24' };
    // queryParams.lat = data[0].lat;
    // queryParams.lon = data[0].lon;
    // console.log($.param(queryParams));
    queryParams.q = data.name
    queryURL = query5DURL + $.param(queryParams);
    queryCurURL = queryCurrentURL + $.param(queryParams);
    console.log(queryURL);

    fetch(queryURL)
        .then(function (response) {
            return response.json()
                .then(function (data) {
                    console.log(data);
                    var interval = 8;
                    var totalHours = data.list.length;
                    var intervals = totalHours / interval;

                    for (i = 0; i < intervals - 1; i++) {
                        var startIndex = (i + 1) * interval;
                        var intervalArray = data.list[startIndex];
                        console.log(intervalArray);
                        var forecastCard = $("<div class = 'card col bg-info text-dark p-2 m-1' style = 'width 18rem'>")
                        var forecastTime = dayjs().add(i + 1, "days").format("DD/MM/YYYY");
                        var forecastTimeCard = $('<li class="list-group-item bg-info">').text(forecastTime);
                        var iconCard = $("<ul class='list-group bg-info list-group-flush'>");
                        var forecastIcon =$("<img src = https://openweathermap.org/img/wn/" + intervalArray.weather[0].icon + "@2x.png class='img-thumbnail'>");
                        iconCard.append(forecastIcon);
                        var forecastList = $("<ul class='list-group bg-info list-group-flush'>");
                        var forecastTemp = $('<li class="list-group-item bg-info">').text("Temp: " + (intervalArray.main.temp - 273.15).toFixed(2) + '°C');
                        var forecastWind = $('<li class="list-group-item bg-info">').text("wind: " + intervalArray.wind.speed + "KPH");
                        var forecastHumidity = $('<li class="list-group-item bg-info">').text("Humidity: " + intervalArray.main.humidity + "%");
                        forecastList.append(forecastTimeCard, iconCard, forecastTemp, forecastWind, forecastHumidity);
                        forecastCard.append(forecastList);
                        $('#forecast').append(forecastCard);
                        //get icon from the https://openweathermap.org/weather-conditions using the url;
                    }
                    var endArray = data.list[39];
                    console.log(endArray);
                    var endTime = dayjs().add(5, "days").format("DD/MM/YYYY");
                    var endTimeCard = $('<li class="list-group-item bg-info">').text(endTime);
                    var endCard = $("<div class = 'card col bg-info text-dark p-2 m-1' style = 'width 18rem'>")
                    var endIconCard = $("<ul class='list-group bg-info list-group-flush'>");
                    var endIcon =$("<img src = https://openweathermap.org/img/wn/" + intervalArray.weather[0].icon + "@2x.png class='img-thumbnail'>")
                    endIconCard.append(endIcon);
                    var endList = $("<ul class='list-group bg-info list-group-flush'>");
                    var endList = $("<ul class='list-group bg-info list-group-flush'>");
                    var endTemp = $('<li class="list-group-item bg-info">').text("Temp: " + (endArray.main.temp - 273.15).toFixed(2) + '°C');
                    var endWind = $('<li class="list-group-item bg-info">').text("wind: " + endArray.wind.speed + "KPH");
                    var endHumidity = $('<li class="list-group-item bg-info">').text("Humidity: " + endArray.main.humidity + "%");
                    endList.append(endTimeCard, endIconCard, endTemp, endWind, endHumidity);
                    endCard.append(endList);
                    $("#forecast").append(endCard);
                })
        })
}


// event listener on click and grab the city that was typed
$("#search-button").on("click", function (event) {

    //prevent event propagation on clicked events
    event.preventDefault();

    $("#search-input").empty();
    $("#today").empty();
    $("#forecast").empty()

    //grab the value of the search input

    // console.log(queryURL);

    // fetch(queryURL)
    //     .then(function (response) {
    //         return response.json()
                // .then(function (data) {
                    //     console.log(data)
                    // console.log(data[0].lon);
                    // console.log(data[0].lat);
                    var queryParams = "";
                    var queryParams = { "appid": '62039493a18c896250d3380996987ad0' };
                    // queryParams.lat = data[0].lat;
                    // queryParams.lon = data[0].lon;
                    // console.log($.param(queryParams));
                    var searchInput = cityName()
                    queryParams.q = searchInput
                    // queryParams.limit = "1"
                    // var queryURL = queryGEOURL + $.param(queryParams);
                    queryURL = query5DURL + $.param(queryParams);
                    queryCurURL = queryCurrentURL + $.param(queryParams);
                    // console.log(queryURL);
                    // console.log(queryCurURL);
                    fetch(queryCurURL)
                        .then(function (response) {
                            return response.json()
                                .then(function (data) {
                                    console.log(data);
                                    var currentTime = dayjs().format("DD/MM/YYYY");
                                    var currentCity = $("<h1>").text(searchInput + " (" + currentTime + ")");
                                    var currentIcon =$("<img src = https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png class='img-thumbnail'>")
                                    var currentTemp = $("<p>").text("Temp:" + (data.main.temp - 273.15).toFixed(2) + '°C');
                                    var currentWind = $("<p>").text("wind" + data.wind.speed + "KPH");
                                    var currentHumidity = $("<p>").text("Humidity" + data.main.humidity + "%");
                                    $("#today").append(currentCity, currentIcon, currentTemp, currentWind, currentHumidity);
                                    checkWeather(data);
                                })
                        })
                    
               

        // })

    var historyP = $('<button type = "button" class ="btn btn-light m-2 history-btn"></button>');
    historyP.attr("data-city", searchInput);
    historyP.text(searchInput);
    $('#history').prepend(historyP);
     });

// })

//name the function to call it in more than oneplace.

//a function to find the city we need weather data for
var cityName = function () {
    var searchInput = $("#search-input").val().trim();
    return searchInput
}




var fiveDayForecast = function () {
    // loop through the array 8 times (because of three horus increment) to work out an average for each day
    console.log("hello");


// 
$(document).ready(function () {
    $("#history").on('click', "[data-city]", function (event) {
        console.log("this works");
        event.preventDefault();

        $("#search-input").empty();
        $("#today").empty();
        $("#forecast").empty()


                        var queryParams = "";
                        var queryParams = { "appid": 'f174556e02b2ab9cd3e99d04ccde8d24' };
                        var searchInput = $(this).attr('data-city');
                        console.log($(this).attr('data-city'));
                        // console.log(searchInput);
                        queryParams.q = searchInput
                        // queryParams.limit = "1"
                        // var queryURL = queryGEOURL + $.param(queryParams);
                        // queryParams.lat = data[0].lat;
                        // queryParams.lon = data[0].lon;
                        // console.log($.param(queryParams));
                        // queryURL = query5DURL + $.param(queryParams);
                        queryCurURL = queryCurrentURL + $.param(queryParams);
                        // console.log(queryURL);
                        // console.log(queryCurURL);
                        fetch(queryCurURL)
                            .then(function (response) {
                                return response.json()
                                    .then(function (data) {
                                        console.log(data);
                                        var currentTime = dayjs().format("DD/MM/YYYY");
                                        var currentCity = $("<h1>").text(searchInput + " (" + currentTime + ")");
                                        var currentIcon =$("<img src = https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png class='img-thumbnail'>")
                                        var currentTemp = $("<p>").text("Temp:" + (data.main.temp - 273.15).toFixed(2) + '°C');
                                        var currentWind = $("<p>").text("wind" + data.wind.speed + "KPH");
                                        var currentHumidity = $("<p>").text("Humidity" + data.main.humidity + "%");
                                        $("#today").append(currentCity, currentIcon, currentTemp, currentWind, currentHumidity);
                                        checkWeather(data);
                                    })
                                  
                            })
                       

                    })
            })}
    // })
// })