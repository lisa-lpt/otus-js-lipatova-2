export function weatherApp(el) {
  el.innerHTML = `
    <div class="container">
      <h1>Прогноз погоды</h1>
      <form>
        <input
          id="cityName"
          placeholder="Введите название города"
          autofocus
        />
        <div class = "btn-container">
         <button>Получить прогноз погоды по названию города</button>
         <button type="button" class ="geo-btn">Получить прогноз погоды по геолокации</button>
        </div>
      </form>
      <div class="weather-map-container">
        <div class="weather-info"></div>
        <div class="map-container">
          <img src=" " class="map"/>
        </div>
      </div>
      <ul class="local-storage">Ранее просмотренные города:</ul>
  `;
  
  const formEl = document.querySelector("form");
  const weatherInfoEl = document.querySelector(".weather-info");
  const mapImgEl = document.querySelector(".map");
  const geoBtn = document.querySelector(".geo-btn");
  const APP_ID = "97d93f1704dcb8e35dd2045c8e75710d";
  const yandex_api ="5d3d4d78-9c36-47e2-ab56-ad47da89e018";
  const localStore = document.querySelector(".local-storage");
  const cityData = [];// array for local storage

  //показывает погодные параметры
  function showWeather(el, weatherInfo) {
    if(weatherInfo["cod"] !=="404" ) {
      el.innerHTML = `
      <h2>Погода в городе ${weatherInfo["name"]}</h2>
        <div class="card-slider">
          <div class="card"> Погода: ${weatherInfo.weather[0].main}</div>
          <div class="card">Температура: ${weatherInfo["main"]["temp"]}</div>
          <div class="card">Ощущается как: ${weatherInfo["main"]["feels_like"]}</div>
          <div class="card">Давление: ${weatherInfo["main"]["pressure"]}</div>
          <div class="card">Влажность: ${weatherInfo["main"]["humidity"]}</div>
        </div>
    `;
    } else {
      el.innerHTML = `<div class="error-message">Город не найден</div>`;
    }
  }

  // погода по городу
  async function getWeather(cityName) {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${APP_ID}`
    );
    return await response.json();
  }
  // получения долготы и широты по названию города
  async function getCoords(cityName) {
    let response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APP_ID}`
    );
    return await response.json();
  }
  
  // погода по геолокации
  geoBtn.addEventListener('click', async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${APP_ID}`
          );
          const positionInfo = await response.json();
          let cityName = positionInfo[0].name;
          const weatherInfo = await getWeather(cityName);
          showWeather(weatherInfoEl, weatherInfo);
        },
        function(_error) {
          weatherInfoEl.innerHTML = `<div class="error-message">Ошибка геолокации</div>`;
        }
      );
    } else {
      weatherInfoEl.innerHTML = `<div class="error-message">Геолокация не поддерживается в этом браузере.</div>`;
    }
  });
  
  // local storage
  if (localStorage.getItem('city')) {
    JSON.parse(localStorage.getItem('city')).forEach(item => {
      const liEl = document.createElement('li');
      cityData.push(item);
      liEl.textContent = item;
      localStore.append(liEl);
    });
  };
  
  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formElement = e.target;
    const inputElement = formElement.querySelector("input");
    const cityName = inputElement.value;
    
    const weatherInfo = await getWeather(cityName);
  
    const coordinate = await getCoords(cityName);
    let latitude = coordinate[0].lat;
    let longitude = coordinate[0].lon;
    const mapImg = `https://static-maps.yandex.ru/v1?lang=ru_RU&ll=${longitude},${latitude}&z=10&size=450,450&maptype=map&apikey=${yandex_api}`;
    mapImgEl.src = `${mapImg}`;


    showWeather(weatherInfoEl, weatherInfo);
    
    //local storage
    if (inputElement.value) { 
      const liEl = document.createElement('li');
      liEl.textContent = inputElement.value;
      
      //если город уже есть в списке
      if (!cityData.includes(inputElement.value)) {
        cityData.push(inputElement.value);
        localStorage.setItem('city', JSON.stringify(cityData));
        localStore.append(liEl);
        inputElement.value = "";
        
        // нельзя больше 10 параграфов
        const itemCounter = el.querySelectorAll("li");
        if (itemCounter.length>10) {
          itemCounter[0].remove();
          cityData.splice(0,1);
        }
      } else {
        inputElement.value = "";
      }
    }
  });
}