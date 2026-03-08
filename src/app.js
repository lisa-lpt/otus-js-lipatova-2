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
         <button class ="geo-btn">Получить прогноз погоды по геолокации</button>
        </div>
      </form>
      <div class="weather-info"></div>
      <div class="img-container"></div>
      <ul class="local-storage">Ранее просмотренные города:</ul>
    </div>
  `;
  
  const formEl = document.querySelector("form");
  const weatherInfoEl = document.querySelector(".weather-info");
  const geoBtn = document.querySelector(".geo-btn");
  const APP_ID = "97d93f1704dcb8e35dd2045c8e75710d";
  // const imgContainer = document.querySelector(".img-container");
  const localStore = document.querySelector(".local-storage");
  const cityData = [];// array for local storage
  
  function showWeather(el, weatherInfo) {
    if(weatherInfo["cod"] !=="404" ) {
      el.innerHTML = `
      <h2>Погода в городе ${weatherInfo["name"]}</h2>
      <div class="card-slider">
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
    showWeather(weatherInfoEl, weatherInfo);
    
    //local storage
    if (inputElement.value) { 
      const liEl = document.createElement('li');
      liEl.textContent = inputElement.value;
      
      //если город уже есть в списке
      if (cityData.includes(inputElement.value) == 0) {
        cityData.push(inputElement.value);
        localStorage.setItem('city', JSON.stringify(cityData));
        localStore.append(liEl);
        inputElement.value = "";
        
        // нельзя больше 10 параграфов
        const itemCounter = el.querySelectorAll("li");
        if (itemCounter.length>10) {
          itemCounter[0].remove();
        }
      } else {
        inputElement.value = "";
      }
    }
  });
}