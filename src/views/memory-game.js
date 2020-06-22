const memoryGame = {
  render: () => {
    return `
      <div class="home_buttons">
        <a href="/#/home" class="btn"><img src="../image/bienes-raices.svg" alt="home"/></a>
      </div>
      <section class="memory-game">
        <div class="memory-card" data-framework="identity">
          <img class="front-face" src="../image/image-memory-game/cerebro.png" alt="identity" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>
        <div class="memory-card" data-framework="identity">
          <img class="front-face" src="../image/image-memory-game/cerebro.png" alt="identity" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>

        <div class="memory-card" data-framework="expression">
          <img class="front-face" src="../image/image-memory-game/genderColor.png" alt="expression" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>
        <div class="memory-card" data-framework="expression">
          <img class="front-face" src="../image/image-memory-game/genderColor.png" alt="expression" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>

        <div class="memory-card" data-framework="anatomical-Sex">
          <img class="front-face" src="../image/image-memory-game/corazon.png" alt="anatomical Sex" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>
        <div class="memory-card" data-framework="anatomical-Sex">
          <img class="front-face" src="../image/image-memory-game/corazon.png" alt="anatomical Sex" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>

        <div class="memory-card" data-framework="SexAssigedAtBirth">
          <img class="front-face" src="../image/image-memory-game/gender.png" alt="SexAssigedAtBirth" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>
        <div class="memory-card" data-framework="SexAssigedAtBirth">
          <img class="front-face" src="../image/image-memory-game/gender.png" alt="SexAssigedAtBirth" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>

        <div class="memory-card" data-framework="SexuallyAttracted">
          <img class="front-face" src="../image/image-memory-game/Sexually-Attracted.png" alt="SexuallyAttracted" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>
        <div class="memory-card" data-framework="SexuallyAttracted">
          <img class="front-face" src="../image/image-memory-game/Sexually-Attracted.png" alt="SexuallyAttracted" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>

        <div class="memory-card" data-framework="RomanticallyAttracted">
          <img class="front-face" src="../image/image-memory-game/Romantically-Attracted.png" alt="RomanticallyAttracted" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>
        <div class="memory-card" data-framework="RomanticallyAttracted">
          <img class="front-face" src="../image/image-memory-game/Romantically-Attracted.png" alt="RomanticallyAttracted" />
          <img class="back-face" src="../image/image-memory-game/hashtag.png" alt="hashtag" />
        </div>
      </section>
    `  
  },
  afterrender : () => {
    const cards = document.querySelectorAll('.memory-card');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add('flip');

      if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
      }

      // second click
      secondCard = this;

      checkForMatch();
    }

    function checkForMatch() {
      let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

      isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);

      resetBoard();
    }

    function unflipCards() {
      lockBoard = true;

      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
      }, 1500);
    }

    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }

    (function shuffle() {
      cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
      });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));
        
  }

}

export default memoryGame;