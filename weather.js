const form = document.querySelector(".search-section");
let cityName = document.querySelector("#cityName");
let body = document.querySelector("body");

const tem = document.querySelector(".tem")

const api_key = `417d1e8b3b244d6d891105640242812`;


form.addEventListener("submit", () => {
  event.preventDefault();
  getWeatherData(cityName.value)
 
});

async function getWeatherData (city_name){
  // console.log(city_name)
   let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city_name}&aqi=no`;
   let response = await fetch (url)
   let data = await response.json()
   console.log(data)

   tem.innerHTML = data.current.temp_c;
}