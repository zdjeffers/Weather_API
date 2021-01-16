//Define Variables

var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=";
const APIKey = "&appid=cedfe23bde01de8030da3c90beae4ba5";

var todaysDate = moment().format('l');


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

        let currentTemperature = Math.floor(((response.main.temp - 273.15) * (9/5) + 32));
        $(".currentTemperature").text(currentTemperature);

        let currentHumidity = response.main.humidity;
        $(".currentHumidity").text(currentHumidity);

        let currentWindSpeed = response.wind.speed;
        $(".currentWindSpeed").text(currentWindSpeed);

        let currentUVIndex = 

        console.log(currentCity);
        
    })
}



$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    displayWeather();
});

