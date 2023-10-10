//Day & Time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
//Search Engine 

function formatDay(timestamp){
let date = new Date(timestamp *1000);
let day = date.getDay();
let days = ["Sun","Mon", "Tues", "Wed", "Thu", "Fri","Sat"];

return days[day];
}

function displayForecast(response){  
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
if (index <5){

  forecastHTML= forecastHTML + 
   `
            <div class="col">
              <div class="WeatherForecastPreview">
                <div class="forecast-time">${formatDay(forecastDay.time)}</div>
            
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
                />
                <div class="forecast-temperature">
                  <span class="forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
                  <span class="forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
                </div>
              </div>
            </div>
 `;
}
 })
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
//console.log(coordinates);
  let apiKey = "3a422atob62b44a4043ff3521a4cfdad";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
 //console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
 
}




function findTemperature(response){
 let temperature =document.querySelector("#temperature");
 let city = document.querySelector("#city");
 let description = document.querySelector("#description");
 let humidity = document.querySelector("#humidity");
 let wind = document.querySelector("#wind");
 let date = document.querySelector("#date");
 let icon = document.querySelector("#icon");

 let celsiusTemperature = response.data.temperature.current;
//console.log(response.data);
 date.innerHTML = formatDate(response.data.time * 1000);
 temperature.innerHTML= Math.round(celsiusTemperature);
 city.innerHTML = response.data.city;
 description.innerHTML = response.data.condition.description;
 humidity.innerHTML =response.data.temperature.humidity;
 wind.innerHTML= Math.round(response.data.wind.speed);
 icon.setAttribute(
  "src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
 );

 getForecast(response.data.coordinates)
}



function search(city){
let apiKey = "3a422atob62b44a4043ff3521a4cfdad";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=3a422atob62b44a4043ff3521a4cfdad&units=metric`;
axios.get(apiUrl).then(findTemperature);

}


function handleSubmit (event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city-input");
  search (cityinput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);






search("Bulawayo");