import { renderCityPage } from '../pages/city.js';
import { renderAboutPage } from '../pages/about.js';
import { renderHomePage } from '../pages/home.js';
import { render404Page } from '../pages/404.js';
import { createCityRoute, getLocationPath } from '../utils/route.js';

export const router = (parentEl) => {
  const path = getLocationPath();

  if (path === '/') {
    return renderHomePage(parentEl);
  }

  if (path === '/about') {
    return renderAboutPage(parentEl);
  }

  if (path.startsWith('/city')) {
    let cityName = path.split('/')[2];
    if (cityName) {
      cityName = decodeURIComponent(cityName).trim();
    }

    const setUrlCity = (city) => {
      history.pushState(null, null, createCityRoute(city));
    };

    return renderCityPage(parentEl, cityName, setUrlCity);
  }

  return render404Page(parentEl);
};

export const navigateTo = (fullRoute, el) => {
  history.pushState(null, null, fullRoute);
  router(el);
};
