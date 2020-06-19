import GenderBread from './views/genderbread.js';
import MemoryGame from './views/memory-game.js';
import GenderPuzzle from './views/puzzle.js'
<<<<<<< HEAD
=======
import Home from './views/home.js';
>>>>>>> 43819361ceb07ba2e677a3af58101930f17cbd49

const route = [
  {
    path:'/',
<<<<<<< HEAD
=======
    component: Home,
  },
  {
    path:'/genderbread',
>>>>>>> 43819361ceb07ba2e677a3af58101930f17cbd49
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