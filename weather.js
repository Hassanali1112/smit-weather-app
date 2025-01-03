const form = document.querySelector(".search-section");
let cityName = document.querySelector("#cityName");
let body = document.querySelector("body");

const tem = document.querySelector(".tem");
const icon = document.querySelector(".icon");
const text = document.querySelector(".text");
const mosText = document.querySelector(".mosText");
const windText = document.querySelector(".windText");

const api_key = `79ca23bdb06c4c8599120627250201`;

form.addEventListener("submit", () => {
  event.preventDefault();
  console.log(cityName.value);
  getWeatherData(cityName.value.trim());
});

async function getWeatherData(city_name) {
  let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city_name}&aqi=no`;
  let response = await fetch(url);
  let data = await response.json();

  tem.innerHTML = `${data.current.temp_c}&#8451;`;
  icon.src = data.current.condition.icon;
  text.innerHTML = data.current.condition.text;
  mosText.textContent = data.current.humidity;
  windText.textContent = data.current.wind_kph;
  cityName.value = "";
}

// -----------------------------------------------------------------------------------------------------------------

window.onload = () => {
  if (navigator) {
    navigator.geolocation.getCurrentPosition(getUserCurrentPosition);
  }
};
let getUserCurrentPosition = (user) => {
  console.log(user);
  checkWeatherForCurrentPosition(user.coords.longitude, user.coords.latitude);
};

let checkWeatherForCurrentPosition = async (lon, lat) => {
  console.log(lon, lat);
  const Url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ae51a4bb2c418a197081a41663fa3103`;

  let response = await fetch(Url);
  let jsonData = await response.json();
  console.log(jsonData);
  console.log(jsonData.main);
  tem.innerHTML = `${Math.floor(jsonData.main.temp - 273)}&#8451;`;
  icon.src = `http://openweathermap.org/img/w/${jsonData.weather[0].icon}.png`;
  text.innerHTML = jsonData.weather[0].main;
  mosText.textContent = jsonData.main.humidity;
  windText.textContent = jsonData.wind.speed;
};
