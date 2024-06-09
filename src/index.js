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
    let localtime = usableData.location.localtime;

    console.log(location, country, localtime);

    DOM.$weatherLocation.innerHTML = location;
    DOM.$weatherCountry.innerHTML = country;
    DOM.$weatherLocalTime.innerHTML = localtime;

    for (let i = 0; i <= 4; i++) {

        let temp = usableData.forecast.forecastday[i].day.avgtemp_c;
        let condition = usableData.forecast.forecastday[i].day.condition.text;
        let date = usableData.forecast.forecastday[i].date;

        console.log(location, country, localtime, date, temp, condition);

        DOM[`$day${i}`].innerHTML = `
        Date: ${date} <br>
        Temperature (°C): ${temp} <br>
        Conditions: ${condition}`
    }

    // let temp = usableData.current.temp_c;
    // let condition = usableData.current.condition.text;


    // // DOM.$dataOutput.innerHTML =   `Location: ${location} <br>
    // //                         Country: ${country} <br>
    // //                         Local Time: ${time} <br>
    // //                         Temperature (°C): ${temp} <br>
    // //                         Conditions: ${condition}`;
    } catch (error) {
        DOM.$errorMessage.innerHTML = "Please input a real place"
    }
}

