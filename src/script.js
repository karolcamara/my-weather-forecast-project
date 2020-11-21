//Feature #1

let now = new Date();

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
let hour = now.getHours();
let minutes = now.getMinutes();

let time = document.querySelector("#time");
time.innerHTML = `${day} ${hour}:${minutes}`;

//Weather API


function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#feels").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#graus").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

function search(city) {
   let apiKey = "60ad999468395538cd607575dc0c5650";
    let units = "metric";
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

//function displayExtraDays(response) {
  //document.querySelector("#day1").innerHTML = Math.round(response.data.main.temp_max);
//}

//function newSearch(city) {
  //let apiKey = "60ad999468395538cd607575dc0c5650";
  //let units = "metric";
  //let extraUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  //axios.get(extraUrl).then(displayExtraDays);
//}

function changeCity(event) {
    event.preventDefault();
     let city = document.querySelector("#city-input").value;
     search(city);
    
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
