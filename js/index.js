import { apiKey } from "./config.js"

/*Функция создания карточки с погодой */
const buildWeatherCard = (data) => {
    const card = `
    <section class="weather-card">
        <p class="сity">${data.location.name}</p>
        <p class="country">${data.location.country}</p>
        <div class="info">
            <div class="temperature">
                <span class="number">${data.current.temp_c}</span>
                <span class="deg">&deg;с</span>
            </div>
            <div class="img">
                <img src="assets/img/sun.png" alt="sun">
            </div>
        </div>
        <p class="additional-information">${data.current.condition.text}</p>
    </section>
    `

    return card
}

/*Функция для проверки ответа на ошибку */
const checkData = (data) => {

}

const showCityWeather = (event) => {
    // Отменяем отправку формы
    event.preventDefault()

    /* Делаем проверку на попытку пользователя отправить пустую строку*/
    if (input.value.trim() === '') {
        return
    }
    
    const city = input.value.trim()
    const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    fetch(query).then(async (response) => {
        let card
        if (response.status == 400) {
            card = `<section class="weather-card empty-card error">
                        <p>Такой город не найден</p>
                    </section>`
        } else {
            const data = await response.json()
            console.log(data)
            card = buildWeatherCard(data)
        }

        // Удаляем старую карточку
        if (document.querySelector('.weather-card')) {
            document.querySelector('.weather-card').remove()
        }
        
        // Добавляем карточку на экран
        main.insertAdjacentHTML("afterbegin", card)
    })
}

/*Нужные нам элементы на странице*/
const form = document.querySelector('#form')
const input = document.querySelector('#city-input')
const main = document.querySelector('main')

form.addEventListener('submit', showCityWeather)