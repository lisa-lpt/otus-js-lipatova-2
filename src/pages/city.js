import {
  getLocalStorageCityList,
  setLocalStorageCityList,
} from '../service/localStorage.js';
import { getWeather, getPosition, getMap } from '../service/openWeatherMap.js';
import {
  renderWeatherLayout,
  appendCity,
  showErrorMessage,
  showWeather,
  showSpinner,
} from '../view/renderWeather.js';
import mapPlaceholderSrc from '../images/map-placeholder.png';

export const renderCityPage = (parentEl, urlCityName, setUrlCity) => {
  renderWeatherLayout(parentEl);

  const cityHistoryUl = document.querySelector('.city-history');

  const renderCityList = (cityName) => {
    cityHistoryUl.innerHTML = '';
    for (const city of getLocalStorageCityList()) {
      appendCity(cityHistoryUl, city, city === cityName);
    }
  };

  renderCityList(urlCityName);

  const formEl = document.querySelector('form');
  const inputEl = formEl.querySelector('input');
  const weatherInfoEl = document.querySelector('.weather-info');
  const mapImgEl = document.querySelector('.map');
  const geoBtn = document.querySelector('.geo-btn');
  const clearHistoryBtn = document.querySelector('.clear-history-btn');

  const saveHistory = (cityName) => {
    const cityList = getLocalStorageCityList();

    cityName = cityName.trim();

    if (!cityName) return;

    // удаляем из истории если уже есть
    const cityIndex = cityList.indexOf(cityName);
    if (cityIndex > -1) {
      cityList.splice(cityIndex, 1);
    }

    // добавляем в историю
    cityList.unshift(cityName);

    // нельзя больше 10 параграфов
    if (cityList.length > 10) {
      cityList.pop();
    }

    setLocalStorageCityList(cityList);

    renderCityList(cityName);
  };

  const showWeatherForCity = async (cityName) => {
    mapImgEl.src = '';
    weatherInfoEl.innerHTML = '';
    if (!cityName) return;

    showSpinner(weatherInfoEl);
    const weatherInfo = await getWeather(cityName);
    if (weatherInfo) {
      mapImgEl.src = await getMap(cityName);
      showWeather(weatherInfoEl, weatherInfo);
    } else {
      mapImgEl.src = mapPlaceholderSrc;
      showErrorMessage(weatherInfoEl, 'Город не найден');
    }
    saveHistory(cityName);
  };

  // погода по геолокации
  geoBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const cityName = await getPosition(position);
          inputEl.value = cityName;
          setUrlCity(cityName);
          await showWeatherForCity(cityName);
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
    const cityName = inputElement.value.trim();
    setUrlCity(cityName);

    await showWeatherForCity(cityName);
  });

  clearHistoryBtn.addEventListener('click', () => {
    setLocalStorageCityList([]);
    renderCityList();
  });

  // обрабатываем город из url
  if (urlCityName) {
    inputEl.value = urlCityName;
    showWeatherForCity(urlCityName);
  }
};
