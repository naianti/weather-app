function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
    <div class="card-forecast">
      <div class="card-body">
      <div class="forecastdays">${formatForecastDay(forecastDay.dt)}</div>
        <img src="images/${forecastDay.weather[0].icon}.png" alt="..." />
        <span class="temp-max">${Math.round(forecastDay.temp.max)} °C</span> 
        <span class="temp-min">${Math.round(forecastDay.temp.min)} °C</span>
      </div>
    </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall?";
  let apiKey = "0c0f15195845da49d19b504381bfef7a";
  let apiUrl = `${apiEndpoint}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function showDefaulCity(response) {
  console.log(response.data);
  let defaultCity = document.querySelector("#city-name");
  let tempElement = document.querySelector("#concurrent-temp");
  let descriptionElement = document.querySelector("h3");
  let feelingElement = document.querySelector("#feeling");
  let clockElement = document.querySelector("#clock");
  let dayWeekElement = document.querySelector("#concurrent-day");
  let mainIconElement = document.querySelector("#main-icon");
  defaultCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelingElement.innerHTML = Math.floor(response.data.main.feels_like);
  clockElement.innerHTML = formatTime(response.data.dt * 1000);
  dayWeekElement.innerHTML = formatDay(response.data.dt * 1000);
  mainIconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "0c0f15195845da49d19b504381bfef7a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showDefaulCity);
}

function searchHandle(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}

search("Caracas");

let formSearcher = document.querySelector("form");
formSearcher.addEventListener("submit", searchHandle);

//geolocation
function showLocalTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let localCity = `${response.data.name}, ${response.data.sys.country}`;
  let localWeatherDescription = `${response.data.weather[0].description}`;

  let h1 = document.querySelector("h1");
  let localTemperature = document.querySelector("#concurrent-temp");
  let h3 = document.querySelector("h3");

  localTemperature.innerHTML = `${temperature}`;
  h1.innerHTML = `${localCity}`;
  h3.innerHTML = `${localWeatherDescription}`;
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "0c0f15195845da49d19b504381bfef7a";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showLocalTemperature);
}

function geolocationRequest(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let localRequest = document.querySelector(".button-location");
localRequest.addEventListener("click", geolocationRequest);
