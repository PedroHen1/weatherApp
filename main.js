let key ="0d983hudh29jddss0e2k44kd0dd34bf34djcce2e2d"
let units = "metric";
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.lenght === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = 'zip'
    else 
    searchMethod = 'q'
}

function searchWheater(searchTerm) {
    getSearchMethod(searchTerm)
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${numbers}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result)
    })
}

function init(resultFromServer) {
  document.getElementById('title').style.display= "none"
  document.getElementById('weatherContainer').style.display= "block"
  switch (resultFromServer.weather[0].main) {
    case "Clear":
          document.body.style.backgroundImage = 'url("./img/clear.jpg")'
          document.getElementById('weatherContainer').style.background ="rgba(0, 0, 0, 0.322)"
        break;
    case "Snow":
        document.getElementById('weatherContainer').style.background ="rgba(0, 0, 0, 0.322)"
        document.body.style.backgroundImage = 'url("./img/snow.jpg")'
        break;
    case "Clouds":
        document.getElementById('weatherContainer').style.background ="rgba(16, 16, 16, 0.622)"
        document.body.style.backgroundImage = 'url("./img/cloud.jpg")'
        break;
    case "Rain":
    case "Drizzle":
    case "Mist":
    case "Thunderstorm":
        document.getElementById('weatherContainer').style.background ="rgba(0, 0, 0, 0.722)"
        document.body.style.backgroundImage = 'url("./img/rain.jpg")'
        break; 
      default:
          break;
  }
  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader')
  let temperatureElement = document.getElementById('temperature')
  let humidityElement = document.getElementById('humidity')
  let windSpeedElement = document.getElementById('windSpeed')
  let cityHeader = document.getElementById('cityHeader')

  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1)
  windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'km/h';
  temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';

  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + "%"
}
let numbers= "0e4149ff0874a6c44a7dba4240cecd1a";
document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value
    if(searchTerm)
    searchWheater(searchTerm)
})