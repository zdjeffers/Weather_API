//Define Variables

var citiesSearched = [];

var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=";

const APIKey = "&appid=cedfe23bde01de8030da3c90beae4ba5";

// $(document).ready(function() {
//     let savedSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
// })


function displayWeather () {
    var search = $("#searchForm").text.attr("data-name");
    console.log(search)
    var queryURL = weatherAPI + search + APIKey;
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var currentCity = response.name
        console.log(currentCity);
        $(".currentCity").text(currentCity)
    })
}

var searchTerm = $()

$(document).on("click", "#searchBtn", displayWeather);

