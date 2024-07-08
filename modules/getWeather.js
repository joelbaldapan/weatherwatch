const API_KEY = "48a18ac69ca341a5bde185718240707";
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
    conditionIcon: rawData.current.condition.icon,
    temperature: rawData.current.temp_c,
    thermalSensation: rawData.current.feelslike_c,
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
  rawData.forecast.forecastday.forEach((rawForecastData) => {
    const cleanData = {
      // PUT: name of the day
      condition: rawForecastData.day.condition.text,
      conditionIcon: rawForecastData.day.condition.icon,
      maxTemperature: rawForecastData.day.maxtemp_c,
      minTemperature: rawForecastData.day.mintemp_c,
      chanceOfRain: rawForecastData.day.daily_chance_of_rain,
    };
    fullCleanData.push(cleanData);
  });
  return fullCleanData;
}

async function getFullData(place) {
  try {
    const rawData = await getRawData(place);
    console.log(rawData);
    const currentData = processCurrentData(rawData);
    console.log(currentData);
    const forecastData = processForecastData(rawData);
    console.log(forecastData);
  } catch (error) {
    console.log(error);
  }
}

export { getFullData };
