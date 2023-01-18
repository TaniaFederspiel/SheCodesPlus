let actualDate = new Date();
let today = document.querySelector("div.date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[actualDate.getDay()];
let date = actualDate.getDate();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[actualDate.getMonth()];
let year = actualDate.getFullYear();
let hour = actualDate.getHours();
let minute = actualDate.getMinutes();
if (minute < 10) {
  minute = "0" + minute;
}

today.innerHTML = `${day}, ${date}.${month}.${year} / ${hour}:${minute}`;

function showCurrentWeather(response) {
  document.querySelector(".place").innerHTML = response.data.name;
  document.querySelector(".degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".weather").innerHTML = response.data.weather[0].main;
}

function search(city) {
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#text-input");
  let city = `${cityInput.value}`;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getWeather);

function localWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(localWeather);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getLocation);

search("Zurich");
