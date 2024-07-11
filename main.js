import { getFullData } from "./modules/getWeather.js";
import { displayGradient } from "./modules/display.js";

// temporary?
const placeForm = document.getElementById("place-form");
const countryInput = document.getElementById("country-input");

placeForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const inputValue = document.getElementById("country-input").value;
  countryInput.value = "";
  getFullData(inputValue);
});

// Placeholder
getFullData("Tagbilaran");
displayGradient();
