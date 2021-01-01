const div = document.querySelector(".app");
const weather_condition = document.querySelector(".weather_condition");
const temperature = document.querySelector(".temperature");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const region_name = document.querySelector(".region-name");
const wind_speed = document.querySelector(".wind_speed");

const form = document.querySelector("#form");
const region = document.querySelector("#region");
const key = document.querySelector("#api");
const result = document.querySelector(".results");

const clear_btn = document.querySelector(".clear_btn");

form.addEventListener("submit", (data) => {
  data.preventDefault();
  let city_name = region.value;
  let api_key = key.value;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`;
  form.reset();
  get_the_weather(url);
  location.reload();
  save_data(city_name, api_key);
});

clear_btn.addEventListener("click", () => {
  localStorage.removeItem("city");
  localStorage.removeItem("api_key");
  location.reload();
});

function save_data(city, api) {
  localStorage.setItem("city", city);
  localStorage.setItem("api_key", api);
}

function get_the_weather(url) {
  fetch(url)
    .then((response) => {
      response.json().then((data) => {
        display(data);
      });
    })
    .catch((error) => {
      console.log(error);
      result.style.display = "block";
      result.innerHTML = error;
    });
}

function display(data) {
  if(data.cod == 200){
  console.log(data);
  result.style.display = "block";
  region_name.innerHTML = data.name;
  weather_condition.innerHTML = data.weather[0].description;
  temperature.innerHTML = `${(data.main.temp - 273.15).toFixed(2)} degree Celsius`;
  pressure.innerHTML = `${data.main.pressure} hPa`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind_speed.innerHTML = `${data.wind.speed} m/s`;
  } else {
    result.style.display = "block";
    result.innerHTML = "<h3>Something Went Wrong, Maybe wrong API Key</h3>";
  }
}

function init() {
  if (
    window.localStorage.getItem("city") != null &&
    window.localStorage.getItem("api_key") != null
  ) {
    let city_name = localStorage.getItem("city");
    let api_key = localStorage.getItem("api_key");
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`;
    get_the_weather(url);
    clear_btn.style.display = "inline-block";
  } else {
    form.style.display = "block";
  }
}

init();
