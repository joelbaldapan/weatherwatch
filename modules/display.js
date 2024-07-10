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

const dayElements = [
  {
    day: document.getElementById("1-day"),
    conditionImg: document.getElementById("1-condition-img"),
    condition: document.getElementById("1-condition"),
    maxTemperature: document.getElementById("1-max-temperature"),
    minTemperature: document.getElementById("1-min-temperature"),
    chanceOfRain: document.getElementById("1-chance-of-rain"),
  },
  {
    day: document.getElementById("2-day"),
    conditionImg: document.getElementById("2-condition-img"),
    condition: document.getElementById("2-condition"),
    maxTemperature: document.getElementById("2-max-temperature"),
    minTemperature: document.getElementById("2-min-temperature"),
    chanceOfRain: document.getElementById("2-chance-of-rain"),
  },
  {
    day: document.getElementById("3-day"),
    conditionImg: document.getElementById("3-condition-img"),
    condition: document.getElementById("3-condition"),
    maxTemperature: document.getElementById("3-max-temperature"),
    minTemperature: document.getElementById("3-min-temperature"),
    chanceOfRain: document.getElementById("3-chance-of-rain"),
  },
];

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

function displayForecastData(forecastData) {
  forecastData.forEach((data, index) => {
    dayElements[index].conditionImg.src = data.conditionIcon;
    dayElements[index].condition.textContent = data.condition;
    dayElements[
      index
    ].maxTemperature.textContent = `hi | ${data.maxTemperature} °C`;
    dayElements[
      index
    ].minTemperature.textContent = `lo | ${data.minTemperature} °C`;
    dayElements[index].chanceOfRain.textContent = `🌧️ ${data.chanceOfRain} %`;
  });
}

export { displayCurrentData, displayForecastData };
