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

  loadingImg.src = "images/icons/loading.gif?a=" + Math.random();
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
  });
}

export { cloneDetails, displayLoading, getDay, getDate };
