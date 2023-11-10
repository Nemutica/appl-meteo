//*** Récuperer formulaire */
const form = document.querySelector("form")
const input = document.querySelector("input")
const meteoHtml = document.querySelector(".meteo")
// *** écouter lévemenent de soumission du formilaire */

//*** Clé API */
const API_Key = "654009fc49be06400187e6b88bab8c59"

form.addEventListener("submit", function (event){
    event.preventDefault()
    getData(input.value)
    form.reset() 
})

//*** Programme qui recupere les données méteo */

async function getData(city ){
    // ***Fetch permet de faire un appel http
   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=654009fc49be06400187e6b88bab8c59&units=metric&lang=fr`)
   const weather = await response.json()
   displayWeather(weather)

}

//*** Programme qui affiche les donnée méteo */

function displayWeather(weather) {
    meteoHtml.innerHTML = `
    <h1>Données Meteo pour ${weather.name}</h1>
    <h2>Temps ${(weather.weather[0].description)}</h2>
    <p>Température ${Math.round(weather.main.temp)} °C </p>
    <p>Température ressenti ${Math.round(weather.main.feels_like)} °C </p>
    <p>Humidité ${Math.round(weather.main.humidity)} </p>
    
    `
    
}

//*** Geolocalisatio
navigator.geolocation.getCurrentPosition(success, error)

//***En cas de succés */
async function success(pos) {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=654009fc49be06400187e6b88bab8c59`
    const response = await fetch (url)
    const weather = await response.json (url)
    displayWeather(weather)
}

//*** En cas d'erreur (l'utilisateur refuse de donner sa position) */
function error() {}
meteoHtml.innerHTML = "<h1> vous avez refusé la localisation. <br> Entrez le nom d'une ville </h1>"