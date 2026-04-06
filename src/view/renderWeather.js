import { createCityRoute } from '../utils/route';

export const renderWeatherLayout = (el) => {
  el.innerHTML = `
    <div class="d-flex flex-column gap-3 align-items-center">
      <h1>Прогноз погоды</h1>
      <form class="d-flex flex-column gap-2">
        <input
          class="city-name form-control"
          placeholder="Введите название города"
          autofocus
        />
        <div class="d-flex flex-row gap-2">
         <button class="city-btn btn btn-primary">Получить прогноз погоды по названию города</button>
         <button type="button" class="geo-btn btn btn-secondary">Получить прогноз погоды по геолокации</button>
        </div>
      </form>
      <div class="weather-map-container">
        <div class="weather-info"></div>
        <div class="map-container">
          <img src=" " class="map"/>
        </div>
      </div>
      <h3>Ранее просмотренные города:</h3>
      <div class="city-history list-group"></div>
      <button type="button" class="clear-history-btn btn btn-secondary">Очистить историю</button>
    </div>
  `;
};

export const appendCity = (parentEl, cityName, active) => {
  const cityEl = document.createElement('a');
  cityEl.textContent = cityName;
  cityEl.className = 'list-group-item list-group-item-action';
  if (active) cityEl.className += ' active';
  cityEl.href = createCityRoute(cityName);
  cityEl.dataset.link = true;
  parentEl.append(cityEl);
};

export const showErrorMessage = (el, message) => {
  el.innerHTML = `<div class="error-message">${message}</div>`;
};

// погодные параметры
export const showWeather = (parentEl, weatherInfo) => {
  const info = [
    `Погода: ${weatherInfo.weather[0].main}`,
    `Температура: ${weatherInfo.main.temp}`,
    `Ощущается как: ${weatherInfo.main.feels_like}`,
    `Давление: ${weatherInfo.main.pressure}`,
    `Влажность: ${weatherInfo.main.humidity}`,
  ];
  parentEl.innerHTML = `
    <h2>Погода в городе ${weatherInfo.name}</h2>
    <div class="card">
      <ul class="list-group list-group-flush">
        ${info.map((text) => `<li class="list-group-item">${text}</li>`).join(' ')}
      </ul>
    </div>
  `;
};

export const showSpinner = (parentEl) => {
  parentEl.innerHTML = '<div class="spinner-border text-primary" role="status"/>';
};
