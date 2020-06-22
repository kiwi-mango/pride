const Home = {
  render: () => {
    return `
      <div class="home">
        <img class="image-home" src="../image/genderbreadComplete.jpg"/>
        <div class="buttons">
          <a href="#/genderbread" class="btn">Drag & Drop</a>
          <a href="#/memory" class="btn">Memory</a>
          <a href="#/puzzle" class="btn">Puzzle</a>
        </div>
      </div>
    `  
  },
  afterrender : () => {
  }
}
  
export default Home;