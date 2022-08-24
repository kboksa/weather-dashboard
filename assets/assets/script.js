/*GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history*/
var apiKey = "d1e2d0763204896fd894698f5c6e27ee";
var today = moment().format("L");
var searchHistoryList = [];

function currentCondition(city) {

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(cityWeatherResponse) {
        console.log(cityWeatherResponse);
        
        $("#weatherContent").css("display", "block");
        $("#cityDetail").empty();
        
        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

// function addResult() {
//   inputCity = document.getElementById("myInput").vaules;
//   historyList = getInfo();
//   var searchCity = $("<div>");
//   searchCity.attr("id ,inputCity");
//   searchCity.text(inputCity);
//   searchCity.addClass("h4");

//   if (historyList.includes(inputCity) === false) {
//     $(".historyList").append(searchCity);
//   }
//   $(".subtitle").attr("style", "display:inline");
//   addInfo(inputCity);
// }

/*WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon 
representation of weather conditions, the temperature, the humidity, 
the wind speed, and the UV index*/
var currentCity = $(`
<h2 id="currentCity">
    ${cityWeatherResponse.name} ${today} <img src="${iconURL}" alt="${cityWeatherResponse.weather[0].description}" />
</h2>
<p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
<p>Humidity: ${cityWeatherResponse.main.humidity}\%</p>
<p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>
`);

$("#cityDetail").append(currentCity);

var lat = cityWeatherResponse.coord.lat;
var lon = cityWeatherResponse.coord.lon;
var uviQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

$.ajax({
    url: uviQueryURL,
    method: "GET"
}).then(function(uviResponse) {
    console.log(uviResponse);

    var uvIndex = uviResponse.value;
    var uvIndexP = $(`
        <p>UV Index: 
            <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
        </p>
    `);

    $("#cityDetail").append(uvIndexP);

    futureCondition(lat, lon);

