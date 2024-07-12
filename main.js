import { getFullData } from "./modules/getWeather.js";

// temporary?
const placeForm = document.getElementById("place-form");
const countryInput = document.getElementById("country-input");

placeForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const inputValue = document.getElementById("country-input").value;
  countryInput.value = "";
  getFullData(inputValue);
});

// Init
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, catchError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function getPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getFullData(`${latitude},${longitude}`);
}

function catchError(error) {
  getFullData(`Nowhere`);
}

getLocation();
