const form = document.querySelector(".search-section");
let cityName = document.querySelector("#cityName");
let body = document.querySelector("body")


form.addEventListener("submit",()=>{
  event.preventDefault()

  body.style.backgroundColor = "lightblue"
})

// function sub (){
//   event.preventDefault()
//   alert(cityName.value)
// }