function getWeatherIcon(condition, time) {
  // Arrays categorizing conditions into corresponding icon filenames
  const iconSet = [
    { conditions: ["cloudy"], icon: "cloudy.png" },
    { conditions: ["sunny", "clear"], icon: "_clear.png" },
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
    selectedIcon = selectedIcon.replace("_", "");
    return `images/weather-icons/${selectedIcon}`;
  }

  console.log(`images/weather-icons/${time}${selectedIcon}`);
  return `images/weather-icons/${time}${selectedIcon}`;
}

function cloneDetails(fix, original) {
  const fixContainer = document.getElementById(fix);
  const container = document.getElementById(original);
  const clonedContainer = container.cloneNode(true);

  clonedContainer.classList.add("gradient-overlay");
  clonedContainer.classList.remove("gradient");

  fixContainer.appendChild(clonedContainer);

  setTimeout(() => {
    clonedContainer.remove();
  }, 2000);
}

function displayLoading(toggle) {
  const loading = document.getElementById("loading");
  const loadingImg = document.getElementById("loading-img");

  loadingImg.currentTime = 0;
  loading.style.visibility = toggle;
}

function getDay(dateStr, locale, length) {
  let date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: length });
}

function getDate(dateStr, locale, length) {
  let date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    weekday: length,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

function getTime(iconSrc) {
  // Icon source has day/night in the URL
  if (iconSrc.includes("day")) return "day";
  return "night_half_moon";
}

export {
  cloneDetails,
  displayLoading,
  getDay,
  getDate,
  getWeatherIcon,
  getTime,
};
