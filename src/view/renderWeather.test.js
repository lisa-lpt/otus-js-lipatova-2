import {
  appendCity,
  renderWeatherLayout,
  showErrorMessage,
  showWeather,
} from './renderWeather';

describe('render', () => {
  it('renderLayout', () => {
    const rootEl = document.body;
    renderWeatherLayout(rootEl);

    const containerEl = rootEl.querySelector('.container');

    expect(containerEl instanceof HTMLElement).toBe(true);
    expect(containerEl.children.length).toBe(4);
  });

  it('appendCity', () => {
    const ul = document.createElement('ul');

    appendCity(ul, 'aaa');

    expect(ul.children.length).toBe(1);
    expect(ul.children[0].textContent).toBe('aaa');

    appendCity(ul, 'bbb');
    appendCity(ul, 'ccc');

    expect(ul.children.length).toBe(3);

    const texts = [];
    for (const li of ul.children) {
      texts.push(li.textContent);
    }
    expect(texts).toStrictEqual(['aaa', 'bbb', 'ccc']);
  });

  it('showErrorMessage', () => {
    const div = document.createElement('div');
    showErrorMessage(div, 'test');
    expect(div.innerHTML).toBe('<div class="error-message">test</div>');
  });

  it('showWeather', () => {
    const weatherEl = document.body;

    let weatherInfo = {
      weather: [
        {
          main: 'clear',
        },
      ],
      main: {
        temp: 20,
        feels_like: 10,
        pressure: 740,
        humidity: 70,
      },
      name: 'Moscow',
      cod: '200',
    };

    showWeather(weatherEl, weatherInfo);
    expect(weatherEl.children.length).toBe(2);

    const cod = '404';
    weatherInfo = { ...weatherInfo, cod };
    showWeather(weatherEl, weatherInfo);
    expect(weatherEl.textContent).toBe('Город не найден');
  });
});
