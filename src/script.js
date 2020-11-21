
let now = new Date();

function dateTime() {
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMin = now.getMinutes();
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}


  let  displayDate = document.querySelector(".current-date-time");
  displayDate.innerHTML = `${currentDay} ${currentDate}, ${currentHour}:${currentMin}`;
}

dateTime();

function showTemp(response) {
  document.querySelector(".current-city").innerHTML = response.data.name;
  celciusTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celciusTemp);
  lowCelcius = response.data.main.temp_min;
  document.querySelector("#temp-low").innerHTML = Math.round(lowCelcius);
  highCelcius = response.data.main.temp_max;
  document.querySelector("#temp-high").innerHTML = Math.round(highCelcius);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
}

function showForecast(response) {
  let dayOneHigh = document.querySelector("#day-one-high");
  dayOneHigh.innerHTML = response.data.list[8];
  let dayTwoHigh = document.querySelector("#day-two-high");
  dayTwoHigh.innerHTML = response.data.list[8];
  let dayThreeHigh = document.querySelector("#day-three-high");
  dayThreeHigh.innerHTML = response.data.list[8];
  let dayFourHigh = document.querySelector("#day-four-high");
  dayFourHigh.innerHTML = response.data.list[8];
  let dayFiveHigh = document.querySelector("#day-five-high");
  dayFiveHigh.innerHTML = response.data.list[8];
  console.log(response.data.list);
}

let apiKey = "14aa63322308690f6e8ffb6257ee41e5";
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let currentCity = document.querySelector(".current-city");
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handlePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let locationSearch = document.querySelector("#current-location");
locationSearch.addEventListener("click", handlePosition);

function convertToFarenheit(event) {
  event.preventDefault();
  let tempFarenheit = Math.round((celciusTemp * 9) / 5 + 32);
  let lowTempFarenheit = Math.round((lowCelcius * 9) / 5 + 32);
  let highTempFarenheit = Math.round((highCelcius * 9) / 5 + 32);
  let tempertureElement = document.querySelector("#temperature");
  let lowTempElement = document.querySelector("#temp-low");
  let highTempElement = document.querySelector("#temp-high");
  celcius.classList.remove("active");
  farenheit.classList.add("active");
  tempertureElement.innerHTML = tempFarenheit;
  lowTempElement.innerHTML = lowTempFarenheit;
  highTempElement.innerHTML = highTempFarenheit;
}

function convertToCelcius(event) {
  event.preventDefault();
  let tempertureElement = document.querySelector("#temperature");
  let lowTempCelcius = lowCelcius;
  let highTempCelsuis = highCelcius;
  let lowTempElement = document.querySelector("#temp-low");
  let highTempElement = document.querySelector("#temp-high");
  celcius.classList.add("active");
  farenheit.classList.remove("active");
  tempertureElement.innerHTML = Math.round(celciusTemp);
  lowTempElement.innerHTML = Math.round(lowCelcius);
  highTempElement.innerHTML = Math.round(highCelcius);
}

let celciusTemp = null;
let lowCelcius = null;
let highCelcius = null;

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", convertToFarenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertToCelcius);

searchCity("Paris");