const genderBread = {
  render: () => {
    return `
    <svg width="600" height="600" id="entorno">
      <g><image xlink:href="../image/image-drag/genderColor.png" width="401" height="494" x="200" y="100"/></g>
      <g class="padre" id="0"><image xlink:href="../image/image-drag/cerebro.png" class="movil"/></g>
      <g class="padre" id="1"><image xlink:href="../image/image-drag/gender.png" class="movil"/></g>
      <g class="padre" id="2"><image xlink:href="../image/image-drag/expression.png" class="movil"/></g>
      <g class="padre" id="3"><image xlink:href="../image/image-drag/corazon.png" class="movil"/></g>
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
    const origY = [97,403,76,283];
    
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
      if (bien_ubicada == 4) {
        alert('muy bien')
    
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
    
    const reordenar =  (evt) => {
      let padre = evt.target.parentNode;
      let clone = padre .cloneNode(true);
      let id = padre.getAttribute('id');
      clone.addEventListener("mousedown", seleccionarPieza);
      entorno.removeChild(document.getElementById(id));
      entorno.appendChild(clone);
      return entorno.lastChild.firstChild;
    };
    
    const deseleccionarPieza = (evt) => {
      if (elementSelect != 0 ) {
        elementSelect.removeEventListener('mousemove', moverPieza);
        elementSelect.removeEventListener('mouseout', deseleccionarPieza);
        elementSelect.removeEventListener('mouseup', deseleccionarPieza);
        elementSelect = 0;
      }
    
      testing()
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
      element.setAttribute("width",tamWidht[i]);
      element.setAttribute("height",tamHeight[i]);
      element.setAttribute("x",Math.floor((Math.random() * 10) + 1));
      element.setAttribute("y",Math.floor((Math.random() * 409) + 1));
      element.addEventListener("mousedown",seleccionarPieza);
    }

  }

}

export default genderBread;