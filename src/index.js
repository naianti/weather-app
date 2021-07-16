//Task #1
//It display the current date and time
let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
let day = days[currentTime.getDay()];
let date = currentTime.getDate();
let month = currentTime.getMonth() + 1; //+1 to give format to month
let year = currentTime.getFullYear();

let LocalTime = document.querySelector(".LocalTime");
LocalTime.innerHTML = `${hour}:${minutes}`;

let Day = document.querySelector(".ConcurrentDay");
Day.innerHTML = `${day} ${date}/${month}/${year}`;

//Task #3
//Display Fahrenheit.
function showFahrenheit(event) {
  event.preventDefault();
  let temperatureFahrenheit = document.querySelector("#temp-concurrent");
  temperatureFahrenheit.innerHTML = 76;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

//Display celsius by default

function showCelsius(event) {
  event.preventDefault();
  let converToCelsius = document.querySelector("#temp-concurrent");
  let celsiusTemperature = `${converToCelsius}`;
  converToCelsius.innerHTML = 7852;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

//end Display celsius by default

//Task search engine, show the city name and displays the weather on the page after the user submits the form.

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let cityRequest = `${response.data.name}, ${response.data.sys.country}`;
  let cityRequestWeatherDescription = `${response.data.weather[0].description}`;

  let localTemperature = document.querySelector("#temp-concurrent");
  let h1 = document.querySelector("h1");
  let h3 = document.querySelector("h3");

  localTemperature.innerHTML = `${temperature}`;
  h1.innerHTML = `${cityRequest}`;
  h3.innerHTML = `${cityRequestWeatherDescription}`;
}

function searchEngine(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityName = `${searchInput.value}`;
  let apiKey = "0c0f15195845da49d19b504381bfef7a";
  let units = "metric";
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlSearch).then(showTemperature);
}

let formSearcher = document.querySelector("form");
formSearcher.addEventListener("submit", searchEngine);

//Task geolocation
function showLocalTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let localCity = `${response.data.name}, ${response.data.sys.country}`;
  let localWeatherDescription = `${response.data.weather[0].description}`;

  let h1 = document.querySelector("h1");
  let localTemperature = document.querySelector("#temp-concurrent");
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

let localRequest = document.querySelector(".button-Location");
localRequest.addEventListener("click", geolocationRequest);
