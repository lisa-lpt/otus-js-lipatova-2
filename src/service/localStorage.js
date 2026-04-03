export const CITY_LIST_KEY = 'cityList';

export const getLocalStorageCityList = () => {
  const list = localStorage.getItem(CITY_LIST_KEY);
  if (!list) return [];
  return JSON.parse(list);
};

export const setLocalStorageCityList = (cityList) => {
  if (!cityList) return;
  localStorage.setItem(CITY_LIST_KEY, JSON.stringify(cityList));
};
