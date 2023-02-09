import Date from "./sun.js";

const sunsetName = "sunset";
const sunriseName = "sunrise";
const hr = document.querySelector("#hr");

var position = { latitude: 0, longitude: 0 };
var sunset = new Date();
var sunrise = new Date();

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

class Location {
  constructor(name, location, timezone) {
    this.name = name;
    this.location = location;
    this.timezone = timezone;
  }
}

const locations = [
  new Location("Current", {}),
  new Location("Cologne", { latitude: 50.9076, longitude: 6.9729 }),
  new Location("Amsterdam", { latitude: 52.395, longitude: 4.846 }),
  new Location("Lisbon", { latitude: 40.0133, longitude: -8.608 }),
  new Location("Seoul", { latitude: 37.5652, longitude: 126.8494 }),
  new Location("SaoPaulo", { latitude: -23.6815, longitude: -46.8754 }),
];

function onLocationChange() {
  const location = document.getElementById("locationPicker").value;
  const index = locations.findIndex((loc) => loc.name === location);
  if (index >= 0) {
    if (index === 0) {
      navigator.geolocation.getCurrentPosition(setPosition, error, options);
    }
    // not equal current location
    const newLocation = locations[index];
    position.latitude = newLocation.location.latitude;
    position.longitude = newLocation.location.longitude;

    calcDaylight();
  }
}

setInterval(() => {
  let day = new Date();
  let sec = day.getHours() * 60 * 60 + day.getMinutes() * 60 + day.getSeconds();

  let msec = day.getMilliseconds();

  hr.style.transform = `rotateZ(${
    (360 / (24 * 60 * 60)) * (sec + 12 * 60 * 60)
  }deg)`;
}, 100);

function dateToHours(date) {
  return "".concat(
    String("0" + date.getHours()).slice(-2),
    ":",
    String("0" + date.getMinutes()).slice(-2)
  );
}

function main() {
  document
    .getElementById("locationPicker")
    .addEventListener("change", onLocationChange, false);
  onLocationChange();
}

function setPosition(pos) {
  position.latitude = pos.coords.latitude;
  position.longitude = pos.coords.longitude;
  calcDaylight();
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function calcDaylight() {
  sunset = new Date().sunset(position.latitude, position.longitude);
  sunrise = new Date().sunrise(position.latitude, position.longitude);

  document.getElementById(sunsetName).innerHTML = dateToHours(sunset);
  document.getElementById(sunriseName).innerHTML = dateToHours(sunrise);

  const daylightMinutes = Math.abs(
    sunset.getHours() * 60 +
      sunset.getMinutes() -
      (sunrise.getHours() * 60 + sunrise.getMinutes())
  );
  const percentOfDay = daylightMinutes / (24 * 60);
  const dayLightDegrees = Math.round(percentOfDay * 360);

  const sunriseDegrees = Math.round(
    (((sunrise.getHours() * 60 + sunrise.getMinutes()) / (24 * 60)) * 360 +
      180) %
      360
  );
  const sunBG = document.getElementById("sun-bg");

  document.getElementById("sunhours").innerHTML =
    Math.floor(daylightMinutes / 60) +
    " hours " +
    (daylightMinutes % 60) +
    " minutes of daylight";
  sunBG.style.backgroundImage =
    "conic-gradient(#ffc107 " + dayLightDegrees + "deg, #00000000 1deg)";
  sunBG.style.transform = "rotate(" + (sunriseDegrees - 360) + "deg)";
  sunBG.style.transition = "all 1s ease-in";
}

main();
