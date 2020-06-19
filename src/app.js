import GenderBread from './views/genderbread.js';
import MemoryGame from './views/memory-game.js';
import GenderPuzzle from './views/puzzle.js'

const route = [
  {
    path:'/',
    component: GenderBread,
  },
  {
    path:'/memory',
    component: MemoryGame,
  },
  {
    path:'/puzzle',
    component: GenderPuzzle,
  }
  
]
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const routerApp = () => {
  const path = parseLocation();
  const { component = ErrorComponent } = findComponentByPath(path, route) || {};
  const container = document.getElementById('page-container');
  container.innerHTML = component.render();
  component.afterrender()

};

window.addEventListener('hashchange',routerApp);
window.addEventListener('load',routerApp);