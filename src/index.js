import "./style.css";

const DOM = {
    $locationChoice: document.querySelector("#location-choice"),
    $goButton: document.querySelector("#go"),
    $errorMessage: document.querySelector(".error-message"),
    $weatherLocation: document.querySelector(".location"),
    $weatherCountry: document.querySelector(".country"),
    $weatherLocalTime: document.querySelector(".local-time"),
    $day0: document.querySelector(".data-output1"),
    $day1: document.querySelector(".data-output2"),
    $day2: document.querySelector(".data-output3"),
    $day3: document.querySelector(".data-output4"),
    $day4: document.querySelector(".data-output5"),
    $day0date: document.querySelector(".date1"),
    $day0temp: document.querySelector(".temp1"),
    $day0cond: document.querySelector(".cond1"),
    $day1date: document.querySelector(".date2"),
    $day1temp: document.querySelector(".temp2"),
    $day1cond: document.querySelector(".cond2"),
    $day2date: document.querySelector(".date3"),
    $day2temp: document.querySelector(".temp3"),
    $day2cond: document.querySelector(".cond3"),
    $day3date: document.querySelector(".date4"),
    $day3temp: document.querySelector(".temp4"),
    $day3cond: document.querySelector(".cond4"),
    $day4date: document.querySelector(".date5"),
    $day4temp: document.querySelector(".temp5"),
    $day4cond: document.querySelector(".cond5"),
}

DOM.$goButton.addEventListener("click", () => {
    let locationValue = DOM.$locationChoice.value;
    runWeather(locationValue);
})

async function runWeather(locationValue) {

    try {
    let weatherData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=bab5dec6e8544d13822222523240406&q=${locationValue}&days=5`, {mode: 'cors'});
    let usableData = await weatherData.json();
    console.log(usableData);

    let location = usableData.location.name;
    let country = usableData.location.country;
    let localtime = usableData.location.localtime.split(" ");

    console.log(location, country, localtime);

    DOM.$weatherLocation.innerHTML = location;
    DOM.$weatherCountry.innerHTML = country;
    DOM.$weatherLocalTime.innerHTML = `${localtime[0]} (${localtime[1]})`;

    for (let i = 0; i <= 4; i++) {

        let temp = usableData.forecast.forecastday[i].day.avgtemp_c;
        let condition = usableData.forecast.forecastday[i].day.condition.text;
        let date = usableData.forecast.forecastday[i].date;

        console.log(location, country, localtime, date, temp, condition);

        // DOM[`$day${i}`].innerHTML = `
        // Date: ${date} <br>
        // Temperature (°C): ${temp} <br>
        // Conditions: ${condition}`

        DOM[`$day${i}date`].innerHTML = `Date: ${date}`;
        DOM[`$day${i}temp`].innerHTML = `Temp: ${temp}`;
        DOM[`$day${i}cond`].innerHTML = `Date: ${condition}`;
    }
} catch (error) {
        DOM.$errorMessage.innerHTML = "Please input a real place"
    }
}

