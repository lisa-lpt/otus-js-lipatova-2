import { createRoute } from '../utils/route';

export const renderMainLayout = (el) => {
  el.innerHTML = `
    <nav class="nav justify-content-center py-3">
      <a class="nav-link" href="${createRoute()}" data-link>Главная</a>
      <a class="nav-link" href="${createRoute('city')}" data-link>Прогноз погоды</a>
      <a class="nav-link" href="${createRoute('about')}" data-link>О приложении</a>
    </nav>
    <div
      id="route"
      class="d-flex flex-grow-1 flex-column align-items-center pt-3"
    ></div>
  `;
};
