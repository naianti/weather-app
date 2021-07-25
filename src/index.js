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
}

let defaultCity = "california";
let apiKey = "0c0f15195845da49d19b504381bfef7a";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showDefaulCity);
