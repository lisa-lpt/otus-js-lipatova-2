import { renderMainLayout } from './renderMainLayout';

describe('render', () => {
  it('renderMainLayout', () => {
    const rootEl = document.body;
    renderMainLayout(rootEl);

    const navEl = rootEl.querySelector('nav');

    expect(navEl instanceof HTMLElement).toBe(true);
    expect(navEl.children.length).toBe(3);

    const routeEl = rootEl.querySelector('#route');

    expect(navEl instanceof HTMLElement).toBe(true);
  });
});
