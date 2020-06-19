const puzzle = {
  render: () => {
    return `
    <div class="buttons">
      <a href="/" class="btn">Home</a>
    </div>
    <svg width="600" height="600" id="entorno">
		<g id="fondo"><image xlink:href="../image/image-puzzle/genderbread.png" width="395" height="442" x="200" y="50"/></g>
		<g class="padre" id="0"><image xlink:href="../image/image-puzzle/fila-1-col-1.png" class="movil"/></g>
		<g class="padre" id="1"><image xlink:href="../image/image-puzzle/fila-1-col-2.png" class="movil"/></g>
		<g class="padre" id="2"><image xlink:href="../image/image-puzzle/fila-1-col-3.png" class="movil"/></g>
		<g class="padre" id="3"><image xlink:href="../image/image-puzzle/fila-2-col-1.png" class="movil"/></g>
		<g class="padre" id="4"><image xlink:href="../image/image-puzzle/fila-2-col-2.png" class="movil"/></g>
		<g class="padre" id="5"><image xlink:href="../image/image-puzzle/fila-2-col-3.png" class="movil"/></g>
		<g class="padre" id="6"><image xlink:href="../image/image-puzzle/fila-3-col-1.png" class="movil"/></g>
		<g class="padre" id="7"><image xlink:href="../image/image-puzzle/fila-3-col-2.png" class="movil"/></g>
		<g class="padre" id="8"><image xlink:href="../image/image-puzzle/fila-3-col-3.png" class="movil"/></g>
	</svg>
    `  
  },
  afterrender : () => {
    const piezas = document.getElementsByClassName('movil');
    
    const tamWidht = [133,132,132,133,134,134,133,132,132];
    const tamHeight = [147,147,147,147,147,147,147,147,147];

    let elementSelect = 0;
    let currentX = 0;
    let currentY = 0;
    let currentPosX = 0;
    let currentPosY = 0;

    var entorno = document.getElementById('entorno');

    const origX = [200,332,463,201,331,462,200,332,463];
    const origY = [50,50,50,197,197,197,344,344,344];

    const testing = () => {
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

      if (bien_ubicada == 9) {
        const getRandomInt = () => Math.floor(Math.random() * (4 - 0)) + 0;

        const imagesURL = [
          "https://media.giphy.com/media/Ga1UmWZ9jdYOc/giphy.gif",
          "hhttps://media.giphy.com/media/3o72FbN0o9oTnGwiOs/giphy.gif",
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
    } 


    const iman = () => {
      for (let i = 0; i < piezas.length; i++) {  
        if (Math.abs(currentPosX - origX[i]) < 15 && Math.abs(currentPosY - origY[i]) < 15) {
          elementSelect.setAttribute('x',origX[i]);
          elementSelect.setAttribute('y',origY[i]);
        }
      }
    }

    const reordenar =  (e) => {      
      let padre = e.target.parentNode;
      let clone = padre.cloneNode(true);
      let id = padre.getAttribute('id');
      clone.addEventListener('mousedown', seleccionarPieza)
      entorno.removeChild(document.getElementById(id));
      entorno.appendChild(clone);
      return entorno.lastChild.firstChild;
    };

    const deseleccionarPieza = (evt) => {
      if (elementSelect != 0 ) {
        elementSelect.removeEventListener('mousemove',moverPieza);
        elementSelect.removeEventListener('mouseout',deseleccionarPieza);
        elementSelect.removeEventListener('mouseup', deseleccionarPieza);
        elementSelect = 0;
      }

      testing()
    }
    
    const moverPieza = (e) => {
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
      elementSelect.addEventListener('mousemove', moverPieza);    
    }

    piezas
    for (let i = 0; i < piezas.length; i++) {
      const element = piezas[i];
      element.setAttribute("width",tamWidht[i]);
      element.setAttribute("height",tamHeight[i]);
      element.setAttribute("x",Math.floor((Math.random() * 10) + 1));
      element.setAttribute("y",Math.floor((Math.random() * 409) + 1));
      element.addEventListener('mousedown', seleccionarPieza);
    }   
  }

}

export default puzzle;