const conditionImg = document.getElementById("condition-img");

function playSound(currentData) {
  const stormyWords = ["thunder"];
  const rainyWords = ["rain", "snow", "drizzle", "sleet", "ice"];

  // Check if rainy, stormy, day
  const condition = currentData.condition.toLowerCase();
  const isRainy = rainyWords.some((word) => condition.includes(word));
  const isStormy = stormyWords.some((word) => condition.includes(word));
  const isDay = conditionImg.src.includes("day");

  // Play correct SFX
  let sfx = "";
  if (isDay) sfx = "day";
  else sfx = "night";

  if (isRainy) sfx = "rainy";
  if (isStormy) sfx = "stormy";

  const sound = new Audio();
  sound.volume = 0.5;
  sound.src = `audio/weather/${sfx}.mp3`;
  sound.play();
}

export { playSound };
