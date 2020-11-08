
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
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#temp-low").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#temp-high").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  console.log(response.data);
}

function searchCity(city) {
  let apiKey = "14aa63322308690f6e8ffb6257ee41e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let currentCity = document.querySelector(".current-city");
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function seachLocation(position) {
  let apiKey = "14aa63322308690f6e8ffb6257ee41e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?qlat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);  
}

let locationSearch = document.querySelector("#current-location");
locationSearch.addEventListener("click", currentLocation);

searchCity("Liverpool");


//function farenheit(event) {
  //event.preventDefault();
  //let unit = "imperial";
//}

//let conversionLink = document.querySelector("#farenheit");
//conversionLink.addEventListener("click", farenheit);




//function celcius(event) {
  //event.preventDefault();
  //let currentTemp = document.querySelector(".temperature");
  //currentTemp.innerHTML = 20;
//}

//let revert = document.querySelector("#celcius");
//revert.addEventListener("click", celcius);









