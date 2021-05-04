//Define Variables
var todaysDate = moment().format('l');

const APIKey = "&appid=cedfe23bde01de8030da3c90beae4ba5";

var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=";

var uvIndexAPI = "https://api.openweathermap.org/data/2.5/uvi?lat=";

var fiveDayForecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q="

var pastSearches = [];
var searchHistoryEl = document.querySelector("#pastSearchList");
var searchFormEl = document.querySelector("#searchForm")

var loadSearches = function () {
    //Retrieve items from storage (if applicable)
    pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];

    //Loop through to make search history
    for (let i = 0; i < pastSearches.length; i++) {
        var pastSearchList = document.createElement("li");
        pastSearchList.textContent = pastSearches[i].toUpperCase();
        searchHistoryEl.appendChild(pastSearchList);
    }
    console.log(pastSearchList)

}

searchHandler = function (event) {
    event.preventDefault();
    var city = searchFormEl.value.trim();
    //create the search history dynamic list
    if (city) {
        weatherNow(city);
        fiveDayForecast(city);
        displaySearchHistory(city);
        searchFormEl.value = "";
        console.log(searchFormEl)
    } else {
        return;
    }
    //Save search to history
    if (pastSearches.indexOf(searchTerm) === -1) {
        pastSearches.push(searchTerm);
        JSON.stringify(localStorage.setItem("pastSearches", JSON.stringify(searchTerm)));
    } else {
        return;
    }
};

function displayWeather() {
    let searchTerm = $("#searchForm").val().trim();



    //Create AJAX call
    var queryURL = weatherAPI + searchTerm + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let currentCity = response.name
        $(".currentCity").text(currentCity).append(" " + todaysDate);
        var icon = response.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
        console.log(iconUrl);
        $("#currentDayIcon").attr("src", iconUrl);

        let currentTemperature = Math.floor(((response.main.temp - 273.15) * (9 / 5) + 32));
        $(".currentTemperature").text(currentTemperature);

        let currentHumidity = response.main.humidity;
        $(".currentHumidity").text(currentHumidity);

        let currentWindSpeed = response.wind.speed;
        $(".currentWindSpeed").text(currentWindSpeed);

        //UV Index Section
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uvIndexURL = uvIndexAPI + latitude + "&lon=" + longitude + APIKey
        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function (response) {
            var currentUVIndex = response.value;
            $(".currentUVIndex").text(currentUVIndex);

            if (currentUVIndex < 4) {
                $(".currentUVIndex").addClass("favorable");
            } else if (currentUVIndex >= 4 && currentUVIndex < 7) {
                $(".currentUVIndex").addClass("moderate");
            } else if (currentUVIndex >= 7) {
                $(".currentUVIndex").addClass("severe");
            }
        });
    })
}

function fiveDayForecast() {
    let searchTerm = $("#searchForm").val().trim();
    var fiveDayForecastURL = fiveDayForecastAPI + searchTerm + APIKey;
    $.ajax({
        url: fiveDayForecastURL,
        method: "GET"
    }).then(function (response) {
        for (let i = 0; i < 5; i++) {
            var currentDate = moment
                .unix(response.list[(i + 1) * 8 - 1].dt)
                .format("l");
            $("#forecast-city-date" + i).html(currentDate);

            var icon = response.list[(i + 1) * 8 - 1].weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
            $("#forecast-icon" + i).attr("src", iconUrl);
            console.log(iconUrl);

            let cityTemperature = Math.floor((response.list[(i + 1) * 8 - 1].main.temp - 273.15) * (9 / 5) + 32);
            $("#forecast-temp" + i).html("<br>" + cityTemperature);

            let cityHumidity = response.list[(i + 1) * 8 - 1].main.humidity;
            $("#forecast-humidity" + i).html("<br>" + cityHumidity);

        }
    })
};



$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    displayWeather();
    fiveDayForecast();
    loadSearches();
});

//Event Listeners
searchFormEl.addEventListener("submit", searchHandler);
