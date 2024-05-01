import { apiKey } from "./config.js";

/*Функция для отправки запроса на сайт с погодой*/
const makeRequest = (cityName) => {

    const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`

    fetch(query)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        console.log(data.location.name)
        console.log(data.location.country)
        console.log(data.current.temp_c)
        console.log(data.current.condition.text)
    })
}

const showCityWeather = (event) => {
    // Отменяем отправку формы
    event.preventDefault()

    city = input.value.trim()
    
    makeRequest(city)
}

const form = document.querySelector('#form')
const input = document.querySelector('#city-input')
let city

form.addEventListener('submit', showCityWeather)

