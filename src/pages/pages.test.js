import { render404Page } from './404';
import { renderHomePage } from './home';
import { renderAboutPage } from './about';

describe('pages except city', () => {
  it('render404Page ', () => {
    const rootEl = document.body;
    render404Page(rootEl);

    expect(rootEl instanceof HTMLElement).toBe(true);
    expect(rootEl.children.length).toBe(2);
  });

  it('renderHomePage', () => {
    const rootEl = document.body;
    renderHomePage(rootEl);

    expect(rootEl instanceof HTMLElement).toBe(true);
    expect(rootEl.children.length).toBe(1);
  });

  it('renderAboutPage', () => {
    const rootEl = document.body;
    renderAboutPage(rootEl);

    expect(rootEl instanceof HTMLElement).toBe(true);
    expect(rootEl.children.length).toBe(2);
  });
});
