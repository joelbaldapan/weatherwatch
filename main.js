import { getFullData } from "./modules/getWeather.js";
import { displayGradient } from "./modules/display.js";

// temporary?
const placeForm = document.getElementById("place-form");

placeForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const country = document.getElementById("country-input").value;
  getFullData(country);
});

// Placeholder
getFullData("Tagbilaran");
displayGradient();