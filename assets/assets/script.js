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

let places = [
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

let createButtons = () => {
  places.forEach((el) => {
    $("#places").append(
      $("<button>").text(el).attr("id", el).addClass("btn custom")
    );
  });
};

// THEN I am presented with current and future conditions for
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

// THEN I am presented with a 5-day forecast that displays the date, an icon represe
// ntation of weather conditions, the temperature, the wind speed, and the humidity
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
    .then((data) => {
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
    });
}
mainWeatherElements();
forecastElements();
createButtons();

$(".custom").click((e) => {
  e.preventDefault();
  city = e.target.id;
  localData.currentCity = city;
  getWeather(city);
  localStorage.setItem("city", JSON.stringify(localData));
});

$(".card-history").click((e) => {
  e.preventDefault();
  city = $("#city").val();
  localData.currentCity = city;
  getWeather(city);
  $("#city").val("");
  localStorage.setItem("city", JSON.stringify(localData));
});
