// eslint-disable-next-line
const basePath = __BASE_PATH__;

export const createRoute = (route = '') => {
  return basePath + route;
};

export const createCityRoute = (cityName) => {
  let route = basePath + 'city';
  if (cityName && cityName.trim()) {
    route += '/' + encodeURIComponent(cityName.trim());
  }
  return route;
};

export const getLocationPath = () => {
  return window.location.pathname.replace(basePath, '/');
};
