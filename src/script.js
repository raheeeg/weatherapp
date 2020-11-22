
let now = new Date();

function dateTime() {
let days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
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

let dayTwo = document.querySelector("#day-two");
dayTwo.innerHTML = days[now.getDay()+2];
let dayThree = document.querySelector("#day-three");
dayThree.innerHTML = days[now.getDay()+3];
let dayFour = document.querySelector("#day-four");
dayFour.innerHTML = days[now.getDay()+4];
let dayFive = document.querySelector("#day-five");
dayFive.innerHTML = days[now.getDay()+5];


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
  document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
  let summary = document.querySelector("#summary");
  if (response.data.weather[0].main === "Sunny") {
    summary.setAttribute(
      "src",
      `images/sun.jpg`
    );
    }
  if (response.data.weather[0].main === "Rain" || "Drizzle" || "Thunderstorm") {
  summary.setAttribute(
     "src",
     `images/rain.jpg`
   );
  }
   if (response.data.weather[0].main === "Snow") {
   summary.setAttribute(
     "src",
     `images/snow.jpg`
  );

  }

  console.log(response.data);
}

function showForecast(response) {
  let dayOneHigh = document.querySelector("#day-one-high");
  dayOneHigh.innerHTML = `${Math.round(response.data.list[7].main.temp_max)}°C`;
  let dayTwoHigh = document.querySelector("#day-two-high");
  dayTwoHigh.innerHTML = `${Math.round(response.data.list[15].main.temp_max)}°C`;
  let dayThreeHigh = document.querySelector("#day-three-high");
  dayThreeHigh.innerHTML = `${Math.round(response.data.list[23].main.temp_max)}°C`;
  let dayFourHigh = document.querySelector("#day-four-high");
  dayFourHigh.innerHTML = `${Math.round(response.data.list[31].main.temp_max)}°C`;
  let dayFiveHigh = document.querySelector("#day-five-high");
  dayFiveHigh.innerHTML = `${Math.round(response.data.list[39].main.temp_max)}°C`;

  let dayOneLow = document.querySelector("#day-one-low");
  dayOneLow.innerHTML = `${Math.round(response.data.list[7].main.temp_min)}°C`;
  let dayTwoLow = document.querySelector("#day-two-low");
  dayTwoLow.innerHTML = `${Math.round(response.data.list[15].main.temp_min)}°C`;
  let dayThreeLow = document.querySelector("#day-three-low");
  dayThreeLow.innerHTML = `${Math.round(response.data.list[23].main.temp_min)}°C`;
  let dayFourLow = document.querySelector("#day-four-low");
  dayFourLow.innerHTML = `${Math.round(response.data.list[31].main.temp_min)}°C`;
  let dayFiveLow = document.querySelector("#day-five-low");
  dayFiveLow.innerHTML = `${Math.round(response.data.list[39].main.temp_min)}°C`;

  let dayOneIcon = document.querySelector("#day-one-icon");
  dayOneIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[7].weather[0].icon}@2x.png`);
  let dayTwoIcon = document.querySelector("#day-two-icon");
  dayTwoIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[15].weather[0].icon}@2x.png`);
  let dayThreeIcon = document.querySelector("#day-three-icon");
  dayThreeIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[23].weather[0].icon}@2x.png`);
  let dayFourIcon = document.querySelector("#day-four-icon");
  dayFourIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[31].weather[0].icon}@2x.png`);
  let dayFiveIcon = document.querySelector("#day-five-icon");
  dayFiveIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[39].weather[0].icon}@2x.png`);
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