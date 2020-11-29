//Date

function formatDate(date, timezone) {
  let localOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  let targetOffsetInMs = timezone * 1000;
  let targetTimestamp = date.getTime() + localOffsetInMs + targetOffsetInMs;
  let now = new Date(targetTimestamp);

  let hours = now.getHours();
  if (hours <10) {
  hours = `0${hours}`;
  }

let minutes = now.getMinutes();
if (minutes <10) {
minutes = `0${minutes}`;
}

let dayIndex = now.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[dayIndex];
return `${day} ${hours}:${minutes}`;
}

function nameForecast() {

let now = new Date;
let extraDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let days2 = extraDays[now.getDay() + 1];
let days3 = extraDays[now.getDay() + 2];
let days4 = extraDays[now.getDay() + 3];
let days5 = extraDays[now.getDay() + 4];
let days6 = extraDays[now.getDay() + 5];


let daytwo = document.querySelector("#weekday1");
daytwo.innerHTML = `${days2}`;

let daythree = document.querySelector("#weekday2");
daythree.innerHTML = `${days3}`;

let dayfour = document.querySelector("#weekday3");
dayfour.innerHTML = `${days4}`;

let dayfive = document.querySelector("#weekday4");
dayfive.innerHTML = `${days5}`;

let daysix = document.querySelector("#weekday5");
daysix.innerHTML = `${days6}`;

}
nameForecast();




//Weather API

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#feels").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#graus").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#time").innerHTML = formatDate(new Date(), response.data.timezone);
  document.querySelector("#icon").setAttribute ("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
  document.querySelector("#icon").setAttribute ("alt", response.data.weather[0].description);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  celsiusTemperature = Math.round(response.data.main.temp);


}

function search(city) {
   let apiKey = "60ad999468395538cd607575dc0c5650";
    let units = "metric";
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition);

    //Forecast
     let extraUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(extraUrl).then(displayExtraDays);
}

function displayExtraDays(response) {
  document.querySelector("#day1").innerHTML = Math.round(response.data.list[7].main.temp);
  document.querySelector("#iconday1").setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.list[7].weather[0].icon}@2x.png`
  );
  document.querySelector("#day2").innerHTML = Math.round(response.data.list[14].main.temp);
  document.querySelector("#iconday2").setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.list[14].weather[0].icon}@2x.png`
  );
  document.querySelector("#day3").innerHTML = Math.round(response.data.list[22].main.temp);
  document.querySelector("#iconday3").setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.list[22].weather[0].icon}@2x.png`
  );
  document.querySelector("#day4").innerHTML = Math.round(response.data.list[30].main.temp);
  document.querySelector("#iconday4").setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.list[30].weather[0].icon}@2x.png`
  );
  document.querySelector("#day5").innerHTML = Math.round(response.data.list[38].main.temp);
  document.querySelector("#iconday5").setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.list[38].weather[0].icon}@2x.png`
  );
}


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

let apiUrlHourly = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlHourly).then(displayExtraDays);
  console.log(apiUrlHourly);
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


//Unit conversion

function tempCelsius (event) {
    event.preventDefault();
    let celsiusTemp = celsiusTemperature
    let temperatureElement = document.querySelector("#graus");
    temperatureElement.innerHTML = celsiusTemp;
}

let clickcelsius = document.querySelector("#celsius");
clickcelsius.addEventListener("click", tempCelsius);

function tempFaren (event) {
    event.preventDefault();
    let farenTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#graus");
    temperatureElement.innerHTML = Math.round(farenTemperature);
}

let clickfaren = document.querySelector("#farenheit");
clickfaren.addEventListener("click", tempFaren);

let celsiusTemperature = null;

//Quote API

function showQuote (response) {
  document.querySelector("#quote").innerHTML = response.data.contents.quotes[0].quote;
}

function get_quote_of_the_day() {
    let quoteUrl = "https://quotes.rest/qod?category=inspire"
   axios.get(quoteUrl).then(showQuote);
}

get_quote_of_the_day();

