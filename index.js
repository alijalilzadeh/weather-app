const searchInput = document.querySelector("#searchInput");
const statusImg = document.querySelector(".status-img img");
const weekPart = document.querySelector(".current-date .week");
const dayPart = document.querySelector(".current-date .day");
const monthPart = document.querySelector(".current-date .month");
const tempPart = document.querySelector(".temperature-part span");
const windSpeed = document.querySelector(".features-weather .speed-wind");
const humidityPerc = document.querySelector(".features-weather .humidity-perc");
const visibilityKm = document.querySelector(".features-weather .visibility-km");
let apiKey = 'e97048756ed56f6c508a6e885fffcc6d';
searchInput.addEventListener('keypress',(e)=>{
  if(e.key === "Enter"){
   e.preventDefault();
  console.log(e.target.value);
  searchWeather(searchInput.value);
  searchInput.value = "";
  }

});
function searchWeather(city){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + apiKey)
  .then(response => response.json())
  .then(data =>
    displayingCondition(data)
  )
}

function displayingCondition(data){
  const dayLists = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  }
    const cityTitle = document.querySelector(".city-title");
    cityTitle.innerText = data.name;

    const currentDate = new Date();
    const currentWeek = currentDate.getDay();
    weekPart.innerText = dayLists[currentWeek];
    console.log(data);
}

searchWeather("Baku");
    // const searchWeather = (city) =>{
    //   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + apiKey)
    //   .then(response => response.json())
    //   .then(data => 
    //     console.log(data)
    //   )
    //   city = "";
    // }
    // const btnSearch = document.querySelector("#btn");

    // btnSearch.addEventListener("click",() =>{
    // const searchInput = document.querySelector("#searchInput").value;
    // searchWeather(searchInput);
 
    // })

