// DOM Manipulation

const name = document.getElementById("name");
const date = document.getElementById("date");
const time = document.getElementById("time");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const conditionImg = document.getElementById("condition-img");
const thermalSensation = document.getElementById("thermal-sensation");
const precipitationAmount = document.getElementById("precipitation-amount");
const windSpeed = document.getElementById("wind-speed");
const airHumidity = document.getElementById("air-humidity");
const uvIndex = document.getElementById("uv-index");

const day1 = document.getElementById("1-day");
const conditionImg1 = document.getElementById("1-condition-img");
const condition1 = document.getElementById("1-condition");
const maxTemperature1 = document.getElementById("1-max-temperature");
const minTemperature1 = document.getElementById("1-min-temperature");
const chanceOfRain1 = document.getElementById("1-chance-of-rain");

const day2 = document.getElementById("2-day");
const conditionImg2 = document.getElementById("2-condition-img");
const condition2 = document.getElementById("2-condition");
const maxTemperature2 = document.getElementById("2-max-temperature");
const minTemperature2 = document.getElementById("2-min-temperature");
const chanceOfRain2 = document.getElementById("2-chance-of-rain");

const day3 = document.getElementById("3-day");
const conditionImg3 = document.getElementById("3-condition-img");
const condition3 = document.getElementById("3-condition");
const maxTemperature3 = document.getElementById("3-max-temperature");
const minTemperature3 = document.getElementById("3-min-temperature");
const chanceOfRain3 = document.getElementById("3-chance-of-rain");

function displayCurrentData(currentData) {
  name.textContent = `${currentData.name}, ${currentData.country}`;
  date.textContent = currentData.dateTime;
  temperature.textContent = `${currentData.temperature} °C`;
  condition.textContent = currentData.condition;
  conditionImg.src = currentData.conditionIcon;
  thermalSensation.textContent = `${currentData.thermalSensation} °C`;
  precipitationAmount.textContent = `${currentData.precipitationAmount} mm`;
  windSpeed.textContent = `${currentData.windSpeed} kph`;
  airHumidity.textContent = `${currentData.airHumidity} %`;
  uvIndex.textContent = currentData.uvIndex;
}

function displayForecastData(forecastData) {}

export { displayCurrentData, displayForecastData };
