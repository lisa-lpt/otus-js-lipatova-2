const mapPlaceholderSrc = 'images/map-placeholder.png';

jest.mock('../images/map-placeholder.png', () => mapPlaceholderSrc);

import { getWeather, getMap, getPosition } from './openWeatherMap';

describe('Check getWeatherData function', () => {
  global.fetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // getWeather tests
  it('getWeather success', async () => {
    const mockFetchResult = {};

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockFetchResult),
    });

    await expect(getWeather()).resolves.toBe(mockFetchResult);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('getWeather error fetch resolved', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getWeather()).resolves.toBe(null);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('getWeather error fetch rejected', async () => {
    fetch.mockRejectedValueOnce(null);

    await expect(getWeather()).resolves.toBe(null);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // getMap tests
  it('getMap error fetch rejected', async () => {
    fetch.mockRejectedValueOnce(null);

    await expect(getMap()).resolves.toBe(mapPlaceholderSrc);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('getMap success', async () => {
    const lon = 30.2642;
    const lat = 59.8944;
    const mockFetchResult = [
      {
        lon,
        lat,
      },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockFetchResult),
    });
    await expect(getMap()).resolves.toBe(
      `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=450,450&z=10&l=map`,
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('getMap error fetch resolved', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getMap()).resolves.toBe(mapPlaceholderSrc);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  //getPosition tests
  it('getPosition success', async () => {
    const name = 'Moscow';
    const position = {
      coords: {
        latitude: 59.8944,
        longitude: 30.2642,
      },
    };
    const mockFetchResult = [
      {
        name,
      },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockFetchResult),
    });

    await expect(getPosition(position)).resolves.toBe(name);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('getPosition error fetch resolved', async () => {
    const position = {
      coords: {
        latitude: 59.8944,
        longitude: 30.2642,
      },
    };
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getPosition(position)).resolves.toBe(null);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('getPosition error fetch rejected', async () => {
    const position = {
      coords: {
        latitude: 59.8944,
        longitude: 30.2642,
      },
    };
    fetch.mockRejectedValueOnce(null);

    await expect(getPosition(position)).resolves.toBe(null);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
