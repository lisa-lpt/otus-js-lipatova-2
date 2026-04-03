import {
  getLocalStorageCityList,
  setLocalStorageCityList,
} from './service/localStorage.js';
import { getWeather, getPosition, getMap } from './service/openWeatherMap.js';
import {
  renderLayout,
  appendCity,
  showErrorMessage,
  showWeather,
} from './view/render.js';

export function weatherApp(el) {
  renderLayout(el);

  const cityHistoryUl = document.querySelector('.city-history');
  for (const city of getLocalStorageCityList()) {
    appendCity(cityHistoryUl, city);
  }

  const formEl = document.querySelector('form');
  const weatherInfoEl = document.querySelector('.weather-info');
  const mapImgEl = document.querySelector('.map');
  const geoBtn = document.querySelector('.geo-btn');

  // погода по геолокации
  geoBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const cityName = await getPosition(position);

          const weatherInfo = await getWeather(cityName);
          mapImgEl.src = await getMap(cityName);
          showWeather(weatherInfoEl, weatherInfo);
        },
        () => {
          showErrorMessage(weatherInfoEl, 'Ошибка геолокации');
        },
      );
    } else {
      showErrorMessage(weatherInfoEl, 'Геолокация не поддерживается в этом браузере');
    }
  });

  // поиск по наименованию города в инпуте
  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formElement = e.target;
    const inputElement = formElement.querySelector('input');
    const cityName = inputElement.value;

    const weatherInfo = await getWeather(cityName);
    mapImgEl.src = await getMap(cityName);
    showWeather(weatherInfoEl, weatherInfo);

    const cityList = getLocalStorageCityList();

    // если города нет в списке
    if (cityName && !cityList.includes(cityName)) {
      cityList.push(cityName);
      appendCity(cityHistoryUl, cityName);

      // нельзя больше 10 параграфов
      if (cityList > 10) {
        cityList.shift();
        const cityEls = cityHistoryUl.querySelectorAll('li');
        cityEls[0].remove();
      }

      setLocalStorageCityList(cityList);
    }

    inputElement.value = '';
  });
}
