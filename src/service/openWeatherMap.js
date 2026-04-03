import mapPlaceholderSrc from '../images/map-placeholder.png';

const APP_ID = '97d93f1704dcb8e35dd2045c8e75710d';

// погода по городу
export async function getWeather(cityName) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${APP_ID}`,
    );
    if (response.ok) return response.json();
  } catch {}
  return null;
}

//получаем город по геолокации
// async function getCity() {
//   let response = await fetch(
//     `https://get.geojs.io/v1/ip/geo.json`
//   );
//   return await response.json();
// }

// получение карты по долготе и широте
export async function getMap(cityName) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APP_ID}`,
    );
    if (response.ok) {
      const coordinate = await response.json();
      let latitude = coordinate[0].lat;
      let longitude = coordinate[0].lon;
      const mapImg = `https://static-maps.yandex.ru/1.x/?ll=${longitude},${latitude}&size=450,450&z=10&l=map`;
      return mapImg;
    }
  } catch {}
  return mapPlaceholderSrc;
}

// Reverse Geocoding
export async function getPosition(position) {
  try {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${APP_ID}`,
    );
    if (response.ok) {
      const positionInfo = await response.json();
      let cityName = positionInfo[0].name;
      return cityName;
    }
  } catch {}
  return null;
}
