import "./style.css";

// Set-up DOM refences in an object
const DOM = {
    $locationChoice: document.querySelector("#location-choice"),
    $goButton: document.querySelector("#go"),
    $errorMessage: document.querySelector(".error-message"),
    $weatherLocation: document.querySelector(".location"),
    $weatherCountry: document.querySelector(".country"),
    $weatherLocalTime: document.querySelector(".local-time"),
    $day0: document.querySelector(".data-output0"),
    $day1: document.querySelector(".data-output1"),
    $day2: document.querySelector(".data-output2"),
    $day3: document.querySelector(".data-output3"),
    $day4: document.querySelector(".data-output4"),
    $day0date: document.querySelector(".date0"),
    $day0temp: document.querySelector(".temp0"),
    $day0cond: document.querySelector(".cond0"),
    $day1date: document.querySelector(".date1"),
    $day1temp: document.querySelector(".temp1"),
    $day1cond: document.querySelector(".cond1"),
    $day2date: document.querySelector(".date2"),
    $day2temp: document.querySelector(".temp2"),
    $day2cond: document.querySelector(".cond2"),
    $day3date: document.querySelector(".date3"),
    $day3temp: document.querySelector(".temp3"),
    $day3cond: document.querySelector(".cond3"),
    $day4date: document.querySelector(".date4"),
    $day4temp: document.querySelector(".temp4"),
    $day4cond: document.querySelector(".cond4"),
}

// Add event listener to the go button
DOM.$goButton.addEventListener("click", () => {
    let locationValue = DOM.$locationChoice.value;
    runWeather(locationValue);
})


// fetch & display weather data
async function runWeather(locationValue) {

    try {
    let weatherData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=bab5dec6e8544d13822222523240406&q=${locationValue}&days=5`, {mode: 'cors'});
// having problems with this -- CORS error quite common I think their API lets me in sometimes but sometimes not...

    if (!weatherData.ok) {
        throw new Error(`HTTP error! status: ${weatherData.status}`);
    }

    // turning it into a json we can use
    let usableData = await weatherData.json();

    // extracting variables from json
    let location = usableData.location.name;
    let country = usableData.location.country;
    let localtime = usableData.location.localtime.split(" ");
    
    // showing those variables on the DOM
    DOM.$weatherLocation.innerHTML = location;
    DOM.$weatherCountry.innerHTML = country;
    DOM.$weatherLocalTime.innerHTML = `${localtime[0]} (${localtime[1]})`;

    // for 5 days worth of weather we set-up a for loop
    for (let i = 0; i <= 4; i++) {

        // saving temperature, conditions, and the date
        let temp = usableData.forecast.forecastday[i].day.maxtemp_c;
        let condition = usableData.forecast.forecastday[i].day.condition.icon;
        let date = usableData.forecast.forecastday[i].date;

        // displaying it on the DOM
        DOM[`$day${i}date`].innerHTML = `Date: ${date}`;
        DOM[`$day${i}temp`].innerHTML = `Temp: ${temp}`;
        DOM[`$day${i}cond`].src = `https:${condition}`;

        // resetting error message to be empty if successful
        DOM.$errorMessage.innerHTML = "";
    }
} catch (error) {
        DOM.$errorMessage.innerHTML = "Please input a real place"
    }
}

