import { navigateTo, router } from './router/router';
import { renderMainLayout } from './view/renderMainLayout';

export const app = (rootEl) => {
  renderMainLayout(rootEl);

  const routeEl = document.getElementById('route');
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href, routeEl);
    }
  });

  window.addEventListener('popstate', () => router(routeEl));

  router(routeEl);
};
