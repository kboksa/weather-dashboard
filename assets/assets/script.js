let localData = {
  currentCity: "Chicago",
};

$(document).ready(() => {
  if (localStorage.getItem("city") === null) {
    getWeather(localData.currentCity);
  } else {
    let lastStoredData = JSON.parse(localStorage.getItem("city"));
    let lastStoredCity = lastStoredData.currentCity;
    getWeather(lastStoredCity);
  }
});

let cities = [
  "Boston",
  "Washington",
  "Honolulu",
  "Las Vegas",
  "San Francisco",
  "Orlando",
  "Los Angeles",
  "Miami",
  "New York",
  "Houston",
];

// Function to Create Buttons - Cities -------->
let createButtons = () => {
  cities.forEach((el) => {
    $("#cities").append(
      $("<button>").text(el).attr("id", el).addClass("btn custom")
    );
  });
};

// Current Weather -------------------------------------->
function mainWeatherElements() {
  $("#display-weather")
    .append(
      $("<div>")
        .addClass("d-flex")
        .append($("<h2>").text(`City Name`).attr("id", "current-city"))
    )
    .append($("<img>").attr("id", "current-icon"))
    .append($("<p>").text(`Conditions`).addClass("weather-data conditions"))
    .append($("<p>").text(`Temperature: `).addClass("weather-data temp"))
    .append($("<p>").text(`Wind: `).addClass("weather-data wind"))
    .append($("<p>").text(`Humidity: `).addClass("weather-data humidity"))
    .append(
      $("<p>")
        .text(`UV Index: `)
        .addClass("weather-data uv")
        .append($("<span>").attr("id", "uv-span"))
    );
}

// Forecast ------------------------------------>
function forecastElements() {
  for (let i = 0; i < 5; i++) {
    $("#forecast").append(
      $("<div>")
        .attr("id", i)
        .addClass("forecastContainer")
        .append($("<h3>").text(`Date`))
        .append($("<img>").attr("src", ``))
        .append($("<p>").addClass("pra-sm temper").text(`Temperature: `))
        .append($("<p>").addClass("pra-sm wind").text(`Max Wind: `))
        .append($("<p>").addClass("pra-sm humidity").text(`Humidity:`))
    );
  }
}
function getWeather(city) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=604edc5bbafa4134908230121222508&q=${city}&days=5&aqi=no&alerts=no`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
  let icon = data.current.condition.icon;
  let currentCity = data.location.name;
  let wind = data.current.wind_mph;
  let humidity = data.current.humidity;
  let temp = data.current.temp_f;
  let uv = data.current.uv;

  $("#current-city").text(
    `${currentCity}, ${data.location.region}, ${
      (data.location.country = "United States of America")
        ? "USA"
        : data.location.country
    }`
  );
  $("#current-icon").attr("src", icon);
  $(".conditions").text(`${data.current.condition.text}`);
  $(".temp").text(`Temperature: ${temp}°F`);
  $(".wind").text(`Wind: ${wind}mph / ${data.current.wind_dir}`);
  $(".humidity").text(`Humidity: ${humidity}%`);
  $("#uv-span").text(`${uv}`);

  for (let i = 0; i < 5; i++) {
    $(`#${i} h3`).text(`${data.forecast.forecastday[i].date}`);
    $(`#${i} img`).attr(
      "src",
      `${data.forecast.forecastday[i].day.condition.icon}`
    );
    $(`#${i} .temper`).text(
      `Temperature: ${data.forecast.forecastday[i].day.avgtemp_f}°F`
    );
    $(`#${i} .wind`).text(
      `Max Wind: ${data.forecast.forecastday[i].day.maxwind_mph}mph`
    );
    $(`#${i} .humidity`).text(
      `Humidity: ${data.forecast.forecastday[i].day.avghumidity}%`
    );
  }
}
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// var uvIndex = $("<div>");
// var uvi = $("<div>");
// uvIndex.text("UV Index: ");
// // uvi.text(data.current.uvi);
// uvIndex.append(uvi);
// uvIndex.addClass("d-flex");

// if (data.current.uvi < 3) {
//   uvi.attr("style", "background-color:green; color:black; margin-left: 5px");
// } else if (data.current.uvi < 6) {
//   uvi.attr("style", "background-color:yellow; color:black; margin-left: 5px");
// } else if (data.current.uvi < 8) {
//   uvi.attr("style", "background-color:orange; color:black; margin-left: 5px");
// } else if (data.current.uvi < 11) {
//   uvi.attr("style", "background-color:red; color:black; margin-left: 5px");
// } else {
//   uvi.attr("style", "background-color:purple; color:black; margin-left: 5px");
// }
