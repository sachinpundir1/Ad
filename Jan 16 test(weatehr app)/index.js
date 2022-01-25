const API = "ec5f111487430950db885da6b24296c5";
const kelvin = 273;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        lon = position.coords.longitude;
        lat = position.coords.latitude;
        console.log(lon, lat);
        fetchData();
        // console.log('after')
    });
} else {
    alert("could not get location");
}

function renderInfo(data, location) {
    const weeklyWeather = document.querySelectorAll(".weather div");
    const placeName = document.querySelector(".place--name");
    const icons = document.querySelectorAll(".weather img");

    const humidity = document.getElementById("humidity");
    const pressure = document.getElementById("pressure");
    const wind_speed = document.getElementById("wind-speed");

    humidity.innerText = data.current.humidity;
    pressure.innerText = data.current.pressure;
    wind_speed.innerText = data.current.wind_speed + "km/hr";
    // console.log(icons);
    placeName.innerText = location;

    weeklyWeather.forEach((day, ind) => {
        const temperatureNode = day.children[1];
        const weatherStatusNode = day.children[3];
        const temperature = data.daily[ind].temp.day;
        const weather = data.daily[ind].weather[0].main;
        const iconPath = data.daily[ind].weather[0].icon;

        icons[ind].src = `http://openweathermap.org/img/w/${iconPath}.png`;
        temperatureNode.innerHTML = Math.floor(temperature - kelvin) + "C";
        weatherStatusNode.innerText = weather;

        let d = new Date(data.daily[ind].dt * 1000);
        // console.log("day  ", d.getDay());
        let today = new Date(data.current.dt * 1000);
        today = today.getDay();
        weeklyWeather[today].style.border = "2px solid black";
        // +data.daily[ind].weather[0].icon
    });
}

// fetch data from api first get the location for long and lat with some other weather data
//  the fetch weather daata

async function fetchData() {
    const Location_resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&unit={metric}&appid=${API}`
    );
    const data = await Location_resp.json();
    const location = data.name;
    console.log(location);

    const fetchWeatherInfo = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&unit={metric}&appid=${API}`
    );
    const resp = await fetchWeatherInfo.json();
    console.log(resp);

    renderInfo(resp, location);
}
