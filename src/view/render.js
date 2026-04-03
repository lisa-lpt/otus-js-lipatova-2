// скелет html страницы
export const renderLayout = (el) => {
  el.innerHTML = `
    <div class="container">
      <h1>Прогноз погоды</h1>
      <form>
        <input
          class="city-name"
          placeholder="Введите название города"
          autofocus
        />
        <div class = "btn-container">
         <button class="city-btn">Получить прогноз погоды по названию города</button>
         <button type="button" class="geo-btn">Получить прогноз погоды по геолокации</button>
        </div>
      </form>
      <div class="weather-map-container">
        <div class="weather-info"></div>
        <div class="map-container">
          <img src=" " class="map"/>
        </div>
      </div>
      <ul class="city-history">Ранее просмотренные города:</ul>
    </div>
  `;
};

export const appendCity = (el, text) => {
  const liEl = document.createElement('li');
  liEl.textContent = text;
  el.append(liEl);
};

export const showErrorMessage = (el, message) => {
  el.innerHTML = `<div class="error-message">${message}</div>`;
};

// погодные параметры
export const showWeather = (el, weatherInfo) => {
  if (weatherInfo.cod !== '404') {
    el.innerHTML = `
      <h2>Погода в городе ${weatherInfo['name']}</h2>
      <div class="card-slider">
        <div class="card"> Погода: ${weatherInfo.weather[0].main}</div>
        <div class="card">Температура: ${weatherInfo.main.temp}</div>
        <div class="card">Ощущается как: ${weatherInfo.main.feels_like}</div>
        <div class="card">Давление: ${weatherInfo.main.pressure}</div>
        <div class="card">Влажность: ${weatherInfo.main.humidity}</div>
      </div>
    `;
  } else {
    showErrorMessage(el, 'Город не найден');
  }
};
