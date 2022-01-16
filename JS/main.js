import Date from "/JS/sun.js";

const sunsetName = "sunset";
const sunriseName = "sunrise";

function toggleClass()
{

    const body = document.querySelector('body');
    body.classList.toggle('light');
    body.style.transition = `0.3s linear`;
}

const hr = document.querySelector('#hr');

setInterval(() => {
    
    let day = new Date();
    let sec = day.getHours() * 60 * 60 + day.getMinutes() * 60 + day.getSeconds();

    let msec = day.getMilliseconds();
    
    
    // VERY IMPORTANT STEP:
    
    hr.style.transform = `rotateZ(${360/(24*60*60) * (sec + 12 * 60 * 60)}deg)`;
    
    // gives the smooth transitioning effect, but there's a bug here!
    // sc.style.transition = `1s`;
}, 100)

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function dateToHours(date) {
    return "".concat(date.getHours(), ":", date.getMinutes());
}

var position;
var sunset = new Date();
var sunrise = new Date();

function main(){
    navigator.geolocation.getCurrentPosition(success, error, options);

}

function success(pos) {
    position = pos;
    sunset = new Date().sunset(position.coords.latitude, position.coords.longitude);
    sunrise = new Date().sunrise(position.coords.latitude, position.coords.longitude);
    console.log("Sunrise: " + sunrise);
    console.log("Sunset: " + sunset);
    document.getElementById(sunsetName).innerHTML = dateToHours(sunset);
    document.getElementById(sunriseName).innerHTML = dateToHours(sunrise);
    const daylightHours = (sunset.getHours() * 60 + sunset.getMinutes()) - (sunrise.getHours() *60 + sunrise.getMinutes());
    const percentOfDay = daylightHours / (24 * 60);
    const dayLightDegrees = Math.round(percentOfDay * 360);
    const sunriseDegrees = Math.round((((sunrise.getHours() * 60 + sunrise.getMinutes())/(24*60))*360 + 180) % 360);
    console.log(daylightHours / 60 + " " + percentOfDay + "%");
    console.log(daylightHours);
    console.log(percentOfDay);
    console.log(dayLightDegrees);
    console.log(sunriseDegrees);
    const styles = "width: 100%;height: 100%;display: flex; justify-content: center; align-items: center;border-radius: 50%;";
    document.getElementById("sun-bg").setAttribute("style", styles + "background-image: conic-gradient(#ffbc009c " + dayLightDegrees+ "deg, #00000000 1deg); transform:rotate("+ sunriseDegrees + "deg);");
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

main();

