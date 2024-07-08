import { getFullData } from "./modules/getWeather.js";

getFullData("Bohol")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
