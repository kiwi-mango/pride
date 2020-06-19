const genderBread = {
  render: () => {
    return `
      <div>Genderbread</div>
      <div class="display-flex">
        <div class="alto-estandar">
          <img src="../image/genderColor.png"/>
        </div>
        <div class="alto-estandar">
          <div class="pieza corazon" draggable="true">
          </div>
          <div class="pieza cerebro" draggable="true">
          </div>
          <div class="pieza expresion" draggable="true">
          </div>
          <div class="pieza gender" draggable="true">
          </div>
        </div>
      </div>
    `  
  },
  afterrender : () => {

    const random = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    const piezas = document.getElementsByClassName('pieza');
    console.log(piezas);
    
    for (let i in piezas) {
      let pieza = piezas[i];
      let x = random(0,90);
      let y = random(0,90);
      if (typeof pieza.style != 'undefined') {
        pieza.style.top = `${y}%`;
        pieza.style.left = `${x}%`;

      }
    }
  }

}

export default genderBread;