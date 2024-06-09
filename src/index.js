import "./style.css";

const DOM = {
    $locationChoice: document.querySelector("#location-choice"),
    $goButton: document.querySelector("#go"),
    $dataOutput: document.querySelector(".data-output")
}

DOM.$goButton.addEventListener("click", () => {
    let locationValue = DOM.$locationChoice.value;
    runWeather(locationValue);
})

async function runWeather(locationValue) {
    try {
    let weatherData = await fetch(`http://api.weatherapi.com/v1/current.json?key=bab5dec6e8544d13822222523240406&q=${locationValue}`, {mode: 'cors'});
    let usableData = await weatherData.json();
    console.log(usableData);

    let location = usableData.location.name;
    let country = usableData.location.country;
    let time = usableData.location.localtime;
    let temp = usableData.current.temp_c;
    let condition = usableData.current.condition.text;


    DOM.$dataOutput.innerHTML =   `Location: ${location} <br>
                            Country: ${country} <br>
                            Local Time: ${time} <br>
                            Temperature (°C): ${temp} <br>
                            Conditions: ${condition}`;
    } catch (error) {
        DOM.$dataOutput.innerHTML = "Please input a real place"
    }
}

