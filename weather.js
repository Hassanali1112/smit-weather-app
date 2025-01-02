const form = document.querySelector(".search-section");
let cityName = document.querySelector("#cityName");
let body = document.querySelector("body");


const tem = document.querySelector(".tem")
const icon = document.querySelector(".icon")
const text = document.querySelector(".text");
const mosText = document.querySelector(".mosText");
const windText = document.querySelector(".windText");

const api_key = `417d1e8b3b244d6d891105640242812`;

// body.style.background = `url("./images/hot sky.jpg")`;




form.addEventListener("submit", () => {
  event.preventDefault();
  console.log(cityName.value)
  getWeatherData(cityName.value)
 
});

async function getWeatherData (city_name){
  // console.log(city_name)
   let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city_name}&aqi=no`;
   let response = await fetch (url)
   let data = await response.json()
   console.log(data)

   tem.innerHTML = `${data.current.temp_c}&#8451;`;
   icon.src = data.current.condition.icon
   text.innerHTML = data.current.condition.text;
   mosText.textContent = data.current.humidity;
   windText.textContent = data.current.wind_kph;

  //  if(data.current.condition.text === "Mist" ){
  //   console.log("true")
  //   body.style.backgroundImage ="https://www.google.com/imgres?q=mist%20weather%20background&imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F11%2F22%2F19%2F10%2Fclouds-1850093_640.jpg&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Ffoggy%2520weather%2F&docid=yBqLzW6Bg52vyM&tbnid=wSd2lrKByIDMsM&vet=12ahUKEwju2JXmtNKKAxUGBdsEHUq6OOYQM3oECFEQAA..i&w=640&h=427&hcb=2&ved=2ahUKEwju2JXmtNKKAxUGBdsEHUq6OOYQM3oECFEQAA";
  //  }
}


// -----------------------------------------------------------------------------------------------------------------
 
window.onload = ()=>{
  if(navigator){
    navigator.geolocation.getCurrentPosition(getUserCurrentPosition)
  }
}
let getUserCurrentPosition = (user)=>{
  console.log(user)
  checkWeatherForCurrentPosition(user.coords.longitude,user.coords.latitude)

}

let checkWeatherForCurrentPosition = async (lon,lat)=>{
  console.log(lon,lat)
  const Url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ae51a4bb2c418a197081a41663fa3103`;

  let response = await fetch(Url);
  let jsonData = await response.json();
  console.log(jsonData)
  console.log(jsonData.main)
  tem.innerHTML = `${Math.floor(jsonData.main.temp -273)}&#8451;`;
  // icon.src = data.current.condition.icon;
  // text.innerHTML = data.current.condition.text;
  // mosText.textContent = data.current.humidity;
  // windText.textContent = data.current.wind_kph;

}

// GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1735783774512}
// coords
// : 
// GeolocationCoordinates
// accuracy
// : 
// 16.763
// altitude
// : 
// null
// altitudeAccuracy
// : 
// null
// heading
// : 
// null
// latitude
// : 
// 24.9166545
// longitude
// : 
// 66.9599571
// speed
// : 
// null