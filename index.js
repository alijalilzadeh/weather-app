const searchInput = document.querySelector("#searchInput");
const weatherBox = document.querySelector(".weather-box")
const statusImg = document.querySelector(".status-img img");
const weekPart = document.querySelector(".current-date .week");
const dayPart = document.querySelector(".current-date .day");
const monthPart = document.querySelector(".current-date .month");
const windSpeed = document.querySelector(".features-weather .speed-wind");
const humidityPerc = document.querySelector(".features-weather .humidity-perc");
const visibilityKm = document.querySelector(".features-weather .visibility-km");
const weatherStatus = document.querySelector(".weather-status span");
const tempPart = document.querySelector(".temperature-part span");
let apiKey = 'e97048756ed56f6c508a6e885fffcc6d';
searchInput.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchWeather(searchInput.value);
    searchInput.value = "";
  }
});
function searchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + apiKey)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200 && data.name.toLowerCase() === city.toLowerCase()) {
        weatherBox.classList.remove("error");
        filteringCondition(data);
      } else {
        weatherBox.classList.remove("error");
        void weatherBox.offsetWidth;
        weatherBox.classList.add("error");
      }
    })
}

function filteringCondition(data) {
  const dayLists = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  }
  const monthList = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
  }

  const cityTitle = document.querySelector(".city-title span");
  cityTitle.innerText = data.name;

  const currentDate = new Date();
  const currentWeek = currentDate.getDay();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  weekPart.innerText = dayLists[currentWeek] + ",";
  dayPart.innerText = currentDay;
  monthPart.innerText = monthList[currentMonth];

  statusImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  weatherStatus.innerText = data.weather[0].description
  tempPart.innerText = convertCelcius(data.main.temp).toFixed(1) + "°C";

  windSpeed.innerText = (data.wind.speed).toFixed(1) + " km/h";
  humidityPerc.innerText = data.main.humidity + " %";
  visibilityKm.innerText = (data.visibility) / 1000 + " km"
  console.log(data);
  
}
function convertCelcius(kelvin) {
  return kelvin - 272.15;
}
searchWeather("Baku");


