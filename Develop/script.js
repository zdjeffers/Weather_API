//Define Variables
var todaysDate = moment().format('l');

const APIKey = "&appid=cedfe23bde01de8030da3c90beae4ba5";


var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=";

var uvIndexAPI = "http://api.openweathermap.org/data/2.5/uvi?lat=";


// $(document).ready(function() {
//     let savedSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
// })


function displayWeather () {
    let searchTerm = $("#searchForm").val().trim();
    var queryURL = weatherAPI + searchTerm + APIKey;
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let currentCity = response.name
        $(".currentCity").text(currentCity).append(" " + todaysDate);
        var icon = response.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
        $("#icon").text("<img id='icon' src=" + iconUrl + ">");
        $(".currentCity").append(" " + iconUrl)

        let currentTemperature = Math.floor(((response.main.temp - 273.15) * (9/5) + 32));
        $(".currentTemperature").text(currentTemperature);

        let currentHumidity = response.main.humidity;
        $(".currentHumidity").text(currentHumidity);

        let currentWindSpeed = response.wind.speed;
        $(".currentWindSpeed").text(currentWindSpeed);

        //UV Index Section
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uvIndexURL = uvIndexAPI + latitude + "&lon=" + longitude + APIKey
        $.ajax ({
            url: uvIndexURL,
            method:"GET"
        }).then(function(response) {
            var currentUVIndex = response.value;
            $(".currentUVIndex").text(currentUVIndex);

            if (currentUVIndex < 4) {
                $(".currentUVIndex").classList.add("favorable");
            } else if (currentUVIndex >= 4 && currentUVIndex < 7) {
                $(".currentUVIndex").classList.add("moderate");
            } else if (currentUVIndex >= 7) {
                $(".currentUVIndex").classList.add("severe");
            }
        });        
    })
}



$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    displayWeather();
});

