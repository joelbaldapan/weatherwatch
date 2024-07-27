import {
  displayCurrentData,
  displayForecastData,
  displayGradient,
  displayLoading,
  reloadTextAnimations,
} from "./display.js";
import { playSound } from "./playSound.js";
import { getTime, getWeatherIcon } from "./utils.js";

const API_KEY = "04f9c8a5363e4af7b0c203026241107";
const DAYS = 3;

function getRawData(place) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${place}&days=${DAYS}&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => console.log(error));
  });
}

function processCurrentData(rawData) {
  // Current Weather Data
  const cleanData = {
    name: rawData.location.name,
    country: rawData.location.country,
    dateTime: rawData.location.localtime,
    condition: rawData.current.condition.text,
    conditionIcon: getWeatherIcon(
      rawData.current.condition.text,
      getTime(rawData.current.condition.icon)
    ),
    temperature: rawData.current.temp_c,
    thermalSensation: rawData.current.feelslike_c,
    cloudCoverage: rawData.current.cloud,
    precipitationAmount: rawData.current.precip_mm,
    windSpeed: rawData.current.wind_kph,
    airHumidity: rawData.current.humidity,
    uvIndex: rawData.current.uv,
  };
  return cleanData;
}

function processForecastData(rawData) {
  // Future Weather Forecast
  const fullCleanData = [];
  rawData.forecast.forecastday.shift();
  rawData.forecast.forecastday.forEach((rawForecastData) => {
    const cleanData = {
      date: rawForecastData.date,
      condition: rawForecastData.day.condition.text,
      conditionIcon: getWeatherIcon(rawForecastData.day.condition.text, "none"),
      maxTemperature: rawForecastData.day.maxtemp_c,
      minTemperature: rawForecastData.day.mintemp_c,
      chanceOfRain: rawForecastData.day.daily_chance_of_rain,
    };
    fullCleanData.push(cleanData);
  });
  return fullCleanData;
}

async function getFullData(place) {
  let loadingTimeout;
  try {
    loadingTimeout = setTimeout(() => {
      displayLoading("visible");
    }, 100);

    const rawData = await getRawData(place);
    clearTimeout(loadingTimeout);
    displayLoading("hidden"); // Ensure to hide loading if data comes before 100ms
    const currentData = processCurrentData(rawData);
    displayCurrentData(currentData);
    displayGradient(currentData);
    const forecastData = processForecastData(rawData);
    displayForecastData(forecastData);
    playSound(currentData);
    reloadTextAnimations();
    console.log(forecastData)
  } catch (error) {
    clearTimeout(loadingTimeout);
    displayLoading("hidden"); // Ensure to hide loading if there's an error
    console.log(error);
  }
}

export { getFullData };
