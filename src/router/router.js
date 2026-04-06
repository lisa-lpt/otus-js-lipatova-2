import { renderCityPage } from '../pages/city.js';
import { renderAboutPage } from '../pages/about.js';
import { renderHomePage } from '../pages/home.js';
import { render404Page } from '../pages/404.js';

export const router = (parentEl) => {
  const path = window.location.pathname;

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
      city = city.trim();
      const route = city ? `/city/${encodeURIComponent(city)}` : '/city';
      history.pushState(null, null, route);
    };

    return renderCityPage(parentEl, cityName, setUrlCity);
  }

  return render404Page(parentEl);
};

export const navigateTo = (url, el) => {
  history.pushState(null, null, url);
  router(el);
};
