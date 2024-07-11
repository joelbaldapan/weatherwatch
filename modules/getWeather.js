import {
  displayCurrentData,
  displayForecastData,
  displayGradient,
  displayLoading,
  reloadTextAnimations,
} from "./display.js";

const API_KEY = "48a18ac69ca341a5bde185718240707";
const DAYS = 4;

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

function getTime(iconSrc) {
  // Icon source has day/night in the URL
  if (iconSrc.includes("day")) return "day";
  return "night_half_moon";
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

function getWeatherIcon(condition, time) {
  // Arrays categorizing conditions into corresponding icon filenames
  const iconSet = [
    { conditions: ["cloudy"], icon: "cloudy.png" },
    { conditions: ["sunny", "clear"], icon: "clear.png" },
    { conditions: ["fog"], icon: "fog.png" },
    { conditions: ["overcast"], icon: "overcast.png" },
    { conditions: ["mist"], icon: "mist.png" },
    { conditions: ["partly cloudy"], icon: "partial_cloud.png" },
    {
      conditions: [
        "patchy light drizzle",
        "light drizzle",
        "patchy rain nearby",
        "patchy rain possible",
        "patchy light rain",
        "light rain",
        "moderate rain at times",
        "moderate rain",
        "heavy rain at times",
        "heavy rain",
        "light rain shower",
        "moderate or heavy rain shower",
        "torrential rain shower",
      ],
      icon: "_rain.png",
    },
    {
      conditions: [
        "thundery outbreaks possible",
        "patchy rain possible",
        "patchy light rain",
        "light rain",
        "moderate rain at times",
        "moderate rain",
        "heavy rain at times",
        "heavy rain",
        "light rain shower",
        "moderate or heavy rain shower",
        "torrential rain shower",
        "patchy light rain with thunder",
        "moderate or heavy rain with thunder",
      ],
      icon: "_rain_thunder.png",
    },
    {
      conditions: [
        "patchy sleet possible",
        "light sleet",
        "moderate or heavy sleet",
        "light sleet showers",
        "moderate or heavy sleet showers",
      ],
      icon: "_sleet.png",
    },
    {
      conditions: [
        "light freezing rain",
        "moderate or heavy freezing rain",
        "freezing drizzle",
        "heavy freezing drizzle",
        "patchy snow possible",
        "patchy freezing drizzle possible",
        "patchy light snow",
        "light snow",
        "patchy moderate snow",
        "moderate snow",
        "patchy heavy snow",
        "heavy snow",
        "light snow showers",
        "moderate or heavy snow showers",
        "blowing snow",
        "blizzard",
        "freezing fog",
        "ice pellets",
        "light showers of ice pellets",
        "moderate or heavy showers of ice pellets",
      ],
      icon: "_snow.png",
    },
    {
      conditions: [
        "patchy snow possible",
        "patchy light snow",
        "light snow",
        "patchy moderate snow",
        "moderate snow",
        "patchy heavy snow",
        "heavy snow",
        "patchy light snow with thunder",
        "moderate or heavy snow with thunder",
      ],
      icon: "_snow_thunder.png",
    },
  ];

  let selectedIcon = "";
  iconSet.forEach((set) => {
    if (set.conditions.includes(condition.toLowerCase())) {
      selectedIcon = set.icon;
    }
  });

  if (condition.toLowerCase().includes("partly"))
    selectedIcon = "_partial_cloud.png";

  if (selectedIcon === "") selectedIcon = "cloudy.png";

  console.log(condition.toLowerCase(), selectedIcon);

  if (selectedIcon.charAt(0) !== "_") {
    console.log(`images/weather-icons/${selectedIcon}`);
    return `images/weather-icons/${selectedIcon}`;
  }

  if (time === "none") {
    selectedIcon = selectedIcon.replace("_", "night_half_moon_");
    return `images/weather-icons/${selectedIcon}`;
  }

  console.log(`images/weather-icons/${time}${selectedIcon}`);
  return `images/weather-icons/${time}${selectedIcon}`;
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
    reloadTextAnimations();
  } catch (error) {
    clearTimeout(loadingTimeout);
    displayLoading("hidden"); // Ensure to hide loading if there's an error
    console.log(error);
  }
}

export { getFullData };
