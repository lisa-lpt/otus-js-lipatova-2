import {
  getLocalStorageCityList,
  setLocalStorageCityList,
  CITY_LIST_KEY,
} from './localStorage';

describe('localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('getLocalStorageCityList', () => {
    expect(getLocalStorageCityList(null)).toStrictEqual([]);

    setLocalStorageCityList(['Moscow', 'Tokyo']);

    expect(getLocalStorageCityList()).toStrictEqual(['Moscow', 'Tokyo']);
  });

  it('setLocalStorageCityList', () => {
    const getList = () => JSON.parse(localStorage.getItem(CITY_LIST_KEY));

    expect(getList()).toBe(null);

    setLocalStorageCityList();

    expect(getList()).toBe(null);

    setLocalStorageCityList(['Moscow', 'St Petersburg']);

    expect(getList()).toStrictEqual(['Moscow', 'St Petersburg']);

    setLocalStorageCityList(['Tokyo']);

    expect(getList()).toStrictEqual(['Tokyo']);

    localStorage.clear();
  });
});
