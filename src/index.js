import "./style.css";

const DOM = {
    $location: document.querySelector("#location"),
    $goButton: document.querySelector("#go")
}

console.log("hi");

DOM.$goButton.addEventListener("click", () => {
    let locationValue = DOM.$location.value;
    runWeather(locationValue);
})

async function runWeather(locationValue) {
    let weatherdata = await fetch(`http://api.weatherapi.com/v1/current.json?key=bab5dec6e8544d13822222523240406&q=${locationValue}`, {mode: 'cors'});
    console.log(weatherdata);
    return weatherdata;
}

