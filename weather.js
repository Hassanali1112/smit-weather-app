const form = document.querySelector(".search-section");
let cityName = document.querySelector("#cityName");
let body = document.querySelector("body");
let weatherContainer = document.querySelector(".weather-data");

const tem = document.querySelector(".tem");
const icon = document.querySelector(".icon");
const text = document.querySelector(".text");
const mosText = document.querySelector(".mosText");
const windText = document.querySelector(".windText");

const api_key = `79ca23bdb06c4c8599120627250201`;

const randomNumber = () => {
  let randomNo = Math.ceil(Math.random() * 10);
  body.style.backgroundImage = `url(./images/${randomNo}.jpg)`;
};

form.addEventListener("submit", () => {
  event.preventDefault();
  randomNumber();
  getWeatherData(cityName.value.trim());
});

async function getWeatherData(city_name) {
  weatherContainer.style.display = "block";
  weatherContainer.innerHTML = `<h5 class='text-center'>Loading ... </h5>`;
  let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city_name}&aqi=no`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data.error);
  if (!data.error) {
    weatherContainer.innerHTML = `
      <div class="icon-tem d-flex justify-content-center align-items-center mt-4 gap-2 py-2">
            <img src="${data.current.condition.icon}" class="icon" width="70" height="70" alt="">
            <h6 class="tem h1">${data.current.temp_c} &#8451;</h6>
          </div>
          <div class="text text-center h4 text-capitalize">${data.current.condition.text}</div>
          <div class="row mx-1 justify-content-around gap-4 my-3">
            <div class="col-sm-5 col-4 d-flex gap-2 justify-content-center align-items-center">
              <h5 class="mosText h1">${data.current.humidity}</h5>
              <i class="bi bi-moisture" style="font-size: 4rem;"></i>
            </div>
            <div class="col-sm-5 col-4 d-flex gap-2 justify-content-center align-items-center">
              <h5 class="windText h1">${data.current.wind_kph}</h5>
              <i class="bi bi-wind " style="font-size: 4rem;"></i>
            </div>
          </div>
    `;
    cityName.value = "";
  } else {
    weatherContainer.innerHTML = data.error.message;
    weatherContainer.style.textAlign = "center";
  }
}

// -----------------------------------------------------------------------------------------------------------------

window.onload = () => {
  randomNumber();
  if (navigator) {
    navigator.geolocation.getCurrentPosition(getUserCurrentPosition);
  }
};
let getUserCurrentPosition = (user) => {
  checkWeatherForCurrentPosition(user.coords.longitude, user.coords.latitude);
};

let checkWeatherForCurrentPosition = async (lon, lat) => {
  const Url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ae51a4bb2c418a197081a41663fa3103`;

  let response = await fetch(Url);
  let jsonData = await response.json();
  tem.innerHTML = `${Math.floor(jsonData.main.temp - 273)}&#8451;`;
  icon.src = `http://openweathermap.org/img/w/${jsonData.weather[0].icon}.png`;
  text.innerHTML = jsonData.weather[0].main;
  mosText.textContent = jsonData.main.humidity;
  windText.textContent = jsonData.wind.speed;
  weatherContainer.style.display = "block";
};
