/*GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history*/
function addResult() {
  inputCity = document.getElementById("myInput").vaules;
  historyList = getInfo();
  var searchCity = $("<div>");
  searchCity.attr("id ,inputCity");
  searchCity.text(inputCity);
  searchCity.addClass("h4");

  if (historyList.includes(inputCity) === false) {
    $(".historyList").append(searchCity);
  }
  $(".subtitle").attr("style", "display:inline");
  addInfo(inputCity);
}

$(".history").on(`click`, function (event) {
  event.preventDeault();
  $(".subtitle").attr("style", "display:inline");
  document.getElementById("myInput").value = evemt.target.id;
  getResult();
});

document.getElementById("searchBtn").addEventListener("click", addResult);
document.getElementById("searchBtn").addEventListener("click", getResult);

/*WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon 
representation of weather conditions, the temperature, the humidity, 
the wind speed, and the UV index*/
function getResult() {
  $(".five-day").empty();
  $(".city").empty();

  inputCity = document.getElementById("myInput").value;
  var countryCode = "US";
  var cityCode = inputCity;

  var geoLon;
  var geoLat;

  var cityName = $("<h>");
  cityName.addClass("h3");
  var temp = $("<div>");
  var wind = $("<div>");
  var humidity = $("<div>");
  var uvIndex = $("<div>");
  var icon = $("<img>");
  icon.addClass("icon");
  var dateTime = $("<div>");

  $(".city").addClass("list-group")
  $(".city").addClass(cityName)
  $(".city").addClass(dateTime)
  $(".city").addClass(icon)
  $(".city").addClass(temp)
  $(".city").addClass(wind)
  $(".city").addClass(humidity)
  $(".city").addClass(uvIndex)

  var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityCode + "," + countryCode + "&limit=5&appid=7d1b285353ccacd5326159e04cfab063"
        
 
    fetch(geoUrl)
  
      
      .then(function (response) {
        return response.json();

})

.then(function (data) {
    geoLon = data[0].lon;
    geoLat = data[0].lat;

    //use geoLat and geoLon to fetch the current weather
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + "&lon="+ geoLon + "&exclude=minutely,hourly,alerts&units=imperial&appid=7d1b285353ccacd5326159e04cfab063";
      
    fetch(weatherUrl)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      
      weatherIcon= data.current.weather[0].icon;
      imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
      icon.attr('src',imgSrc)
  
      cityName.text(cityCode);
      //translate utc to date
      var date = new Date(data.current.dt * 1000);
      dateTime.text("("+ (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");

      temp.text("Temperature: "+ data.current.temp + " F");
      humidity.text("Humidity: " + data.current.humidity + " %");
      wind.text("Wind Speed: " + data.current.wind_speed + " MPH");