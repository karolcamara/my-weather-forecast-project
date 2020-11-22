//Date

function formatDate(timestamp) {

let now = new Date(timestamp);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours <10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes <10) {
  minutes = `0${minutes}`;
}

return `${day} ${hours}:${minutes}`;
}

//Weather API


function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#feels").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#graus").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#time").innerHTML = formatDate(response.data.dt *1000);
}

function search(city) {
   let apiKey = "60ad999468395538cd607575dc0c5650";
    let units = "metric";
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

function displayExtraDays(response) {
  document.querySelector("#day1").innerHTML = Math.round(response.data.list[7].main.temp);
  document.querySelector("#day2").innerHTML = Math.round(response.data.list[14].main.temp);
  document.querySelector("#day3").innerHTML = Math.round(response.data.list[22].main.temp);
  document.querySelector("#day4").innerHTML = Math.round(response.data.list[30].main.temp);
  document.querySelector("#day5").innerHTML = Math.round(response.data.list[38].main.temp);
}

function searchExtraDays(city) {
  let apiKey = "60ad999468395538cd607575dc0c5650";
  let units = "metric";
  let extraUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(extraUrl).then(displayExtraDays);
}

function changeCity(event) {
    event.preventDefault();
     let city = document.querySelector("#city-input").value;
     search(city);
     searchExtraDays(city);
    
}

function searchLocation(position) {
    let apiKey = "60ad999468395538cd607575dc0c5650";
       let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayWeatherCondition);
  }

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#form-input");
form.addEventListener("submit", changeCity);

let currentLocationButton = document.querySelector("#button-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Rio de Janeiro");
searchExtraDays("Rio de Janeiro");


//Bonus Feature

function tempCelsius (event) {
    event.preventDefault();
    let temperature = document.querySelector("#graus");
    temperature.innerHTML = `19`;
}
let clickcelsius = document.querySelector("#celsius");
clickcelsius.addEventListener("click", tempCelsius);

function tempFaren (event) {
    event.preventDefault();
    let temperature = document.querySelector("#graus");
    temperature.innerHTML = `66`;
}
let clickfaren = document.querySelector("#farenheit");
clickfaren.addEventListener("click", tempFaren);

//Quote API

function showQuote (response) {
  document.querySelector("#quote").innerHTML = response.data.contents.quotes[0].quote;
}

function get_quote_of_the_day() {
    let quoteUrl = "https://quotes.rest/qod?category=inspire"
   axios.get(quoteUrl).then(showQuote);
}

get_quote_of_the_day();

