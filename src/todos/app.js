import html from './app.component.html?raw';

export const App = (elementID) => {

  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementID).append(app);
  })();
}