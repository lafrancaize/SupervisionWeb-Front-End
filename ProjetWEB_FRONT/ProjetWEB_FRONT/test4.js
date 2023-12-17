var WeatherData = {
    ville:"Paris",
    temperature: "20°C",
    humidite:"5%",
    windspeed:"50km/h",
    weather:"soleil",
}

var villeWeatherData = WeatherData.ville;
var temperatureWeatherData = WeatherData.temperature;
var humiditeWeatherData = WeatherData.humidite;
var windspeedWeatherData = WeatherData.windspeed;
var weatherWeatherData = WeatherData.weather;


var villeElement = document.getElementById("city");
villeElement.innerText = villeWeatherData;

var temperatureElement = document.getElementById("temperature");
temperatureElement.innerText = temperatureWeatherData;

var weatherElement = document.getElementById("weather");
switch (weatherWeatherData) {
    case "soleil":
        weatherElement.innerHTML = '<img src="sun.png" height=100px width=100px alt="Soleil">';
        break;
    case "nuageux":
        weatherElement.innerHTML = '<img src="nuageux.png" alt="Nuageux">';
        break;
    case "pluie":
        weatherElement.innerHTML = '<img src="pluie.png" alt="Pluie">';
        break;
    case "neige":
        weatherElement.innerHTML = '<img src="neige.png" alt="Pluie">';
        break;
    default:
        weatherElement.innerHTML = "Aucune image disponible";
}

var windspeedElement = document.getElementById("windspeed");
windspeedElement.innerText = windspeedWeatherData;

var humiditeElement = document.getElementById("humidity");
humiditeElement.innerText = humiditeWeatherData;