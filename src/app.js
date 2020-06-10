import GenderBread from './views/genderbread.js';

const routerApp = () => {
  const container = document.getElementById('page-container');
  container.innerHTML = GenderBread.render();
  GenderBread.afterrender()

};

window.addEventListener('hashchange',routerApp);
window.addEventListener('load',routerApp);