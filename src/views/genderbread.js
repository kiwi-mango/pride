const genderBread = {
  render: () => {
    return `
    <div class="home_buttons">
      <a href="/" class="btn"><img src="../image/bienes-raices.svg" alt="home"/></a>
    </div>
    <section class="">
      <div  data-type="cerebro" class="animate__rotateIn mensaje msj-cerebro  hidden__mensaje">
        <h3>Identity</h3>
        <img src="../image/image-drag/Identity.png"/>
      </div>
      <div  data-type="corazon" class="mensaje msj-corazon  hidden__mensaje">
        <h3>Attraction</h3>
        <img src="../image/image-drag/Attracted.png"/>
      </div>
      <div  data-type="genero" class="animate__zoomInLeft mensaje msj-gender  hidden__mensaje">
        <h3>Gender</h3>
        <img src="../image/image-drag/Sex-message.png"/>
        <img src="../image/image-drag/Sex-Assigned.png"/>
      </div>
      <div  data-type="expresion" class="mensaje msj-expression  hidden__mensaje">
        <h3>Expression</h3>
        <img src="../image/image-drag/Expression-message.png"/>
      </div>
      
    </section>
    <svg width="800" height="600" id="entorno">
    
      <g><image xlink:href="../image/image-drag/genderColor.png" width="401" height="494" x="200" y="35"/></g>
      <g class="padre" id="0" data-type="cerebro"><image xlink:href="../image/image-drag/cerebro.png" class="movil"/></g>
      <g class="padre" id="1" data-type="genero"><image xlink:href="../image/image-drag/gender.png" class="movil"/></g>
      <g class="padre" id="2" data-type="expresion"><image xlink:href="../image/image-drag/expression.png" class="movil"/></g>
      <g class="padre" id="3" data-type="corazon"><image xlink:href="../image/image-drag/corazon.png" class="movil"/></g>
    </svg>
    `  
  },
  afterrender : () => {
    const piezas = document.getElementsByClassName('movil');

    const tamWidht = [98,87,262,72]; //[122,109,276,90];
    const tamHeight = [75,106,532,60]; //[93,132,560,75];
    
    let elementSelect = 0;
    let currentX = 0;
    let currentY = 0;
    let currentPosX = 0;
    let currentPosY = 0;
    
    var entorno = document.getElementById('entorno');
    
    const origX = [352,355,169,393];
    const origY = [27,333,6,213];
    
    const testing = (e) => {
      let bien_ubicada = 0
      let padres = document.getElementsByClassName('padre');
      for (let i = 0; i < piezas.length; i++) {
        let posx = parseFloat(padres[i].firstChild.getAttribute('x'));
        let posy = parseFloat(padres[i].firstChild.getAttribute('y'));
        let ide = padres[i].getAttribute('id');
        
        if (origX[ide] == posx && origY[ide] == posy) {
          bien_ubicada += 1;
        }
      }
      if (bien_ubicada == 4) {
        const getRandomInt = () => Math.floor(Math.random() * (4 - 0)) + 0;

        const imagesURL = [
          "https://media.giphy.com/media/Ga1UmWZ9jdYOc/giphy.gif",
          "https://media.giphy.com/media/3o72FbN0o9oTnGwiOs/giphy.gif",
          "https://media.giphy.com/media/3og0IRiPZ8mZoKa7te/giphy.gif",
          "https://media.giphy.com/media/fYNy092DoKNpshv70U/giphy.gif",
          "https://media.giphy.com/media/3ohs7MXqYDGtNzc3oQ/giphy.gif"
        ];

        const phrases = [
          "You are amazing!",
          "You are super cool!",
          "You are special!",
          "You are unique!",
          "You are important"
        ];

        swal({
          title: phrases[getRandomInt()],
          icon: imagesURL[getRandomInt()],
        });
    
      }
    };

    const showMessage = (e) => {
      let piezaToMove = e.target.parentNode.dataset.type;
      const listaMensajes = document.querySelectorAll('.mensaje');
      let posx = e.target.getAttribute('x')
      let posy = e.target.getAttribute('y')
      let ide = e.target.parentNode.id;
      
      if (origX[ide] == posx && origY[ide] == posy) {
        e.target.removeEventListener('mousedown',seleccionarPieza)
        listaMensajes.forEach(item => {
          if (item.dataset.type == piezaToMove && item.classList.contains('hidden__mensaje')) {
            item.classList.remove('hidden__mensaje');
          }
          
        });
        
      }
    };
    
    const iman = () => {
      for (let i = 0; i < piezas.length; i++) {  
        if (Math.abs(currentPosX - origX[i]) < 15 && Math.abs(currentPosY - origY[i]) < 15) {
          elementSelect.setAttribute('x',origX[i]);
          elementSelect.setAttribute('y',origY[i]);
        }
      }
    }
    
    const reordenar =  (evt) => {
      let padre = evt.target.parentNode;
      let clone = padre .cloneNode(true);
      let id = padre.getAttribute('id');
      clone.addEventListener("mousedown", seleccionarPieza);
      entorno.removeChild(document.getElementById(id));
      entorno.appendChild(clone);
      return entorno.lastChild.firstChild;
    };
    
    const deseleccionarPieza = (e) => {
      if (elementSelect != 0 ) {
        elementSelect.removeEventListener('mousemove', moverPieza);
        elementSelect.removeEventListener('mouseout', deseleccionarPieza);
        elementSelect.removeEventListener('mouseup', deseleccionarPieza);
        elementSelect = 0;
      }
      showMessage(e)
      testing(e)
    }
    
    const moverPieza= (e) => {
      var dx = e.clientX - currentX;
      var dy = e.clientY - currentY;
      currentPosX = currentPosX + dx;
      currentPosY = currentPosY + dy;
      elementSelect.setAttribute("x", currentPosX);
      elementSelect.setAttribute("y", currentPosY);
      currentX = e.clientX;
      currentY = e.clientY;
      elementSelect.addEventListener('mouseout',deseleccionarPieza);
      elementSelect.addEventListener('mouseup',deseleccionarPieza);
      iman()
    }
    
    const seleccionarPieza = (e) => {
      elementSelect = reordenar(e);
      currentX = e.clientX;
      currentY = e.clientY;
      currentPosX = parseFloat(elementSelect.getAttribute("x"));
      currentPosY = parseFloat(elementSelect.getAttribute("y"));
      elementSelect.addEventListener("mousemove", moverPieza);
      
    }
    
    for (let i = 0; i < piezas.length; i++) {
      const element = piezas[i];
      element.setAttribute('width',tamWidht[i]);
      element.setAttribute('height',tamHeight[i]);
      element.style.cursor = 'pointer';
      element.setAttribute('x',Math.floor((Math.random() * 10) + 1));
      element.setAttribute('y',Math.floor((Math.random() * 409) + 1));
      element.addEventListener('mousedown',seleccionarPieza);
    }
  }
}

export default genderBread;