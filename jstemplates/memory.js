$(document).ready(function () {
  /*---------------------
  Program variables
  --------------------*/
  const themeArrays = [ // create array of theme themeArrays
    animalsTheme = ['bunny.svg', 'dog.svg', 'fish.svg', 'horse.svg', 'penguin.svg', 'reindeer.svg'],
    monumentsTheme = ['bigben.svg', 'eiffel.svg', 'liberty.svg', 'parthenon.svg', 'redeemer.svg', 'taj.svg'],
    partyTheme = ['bottles.svg', 'cake.svg', 'confetti.svg', 'fireworks.svg', 'present1.svg', 'present2.svg'],
    transportTheme = ['airplane.svg', 'bicycle.svg', 'bus.svg', 'car.svg', 'rocket.svg', 'truck.svg'],
    weatherTheme = ['cloud.svg', 'lightning.svg', 'rain.svg', 'snow.svg', 'sun.svg', 'umbrella.svg'],
  ];
  let gameStartArray = [];
  let showingCardsArray = [];
  let points = 0;

  const themeImage = document.querySelectorAll('.themeImage');
  for (var i = 0; i < themeImage.length; i++) {
    themeImage[i].addEventListener('click', function () {
      resetGame();
      $(this).addClass('selected');
      var selected = this.classList[1];
      var split = selected.split('');
      var number = split.pop();
      gameStartArray.push(...themeArrays[number - 1]);
      doubleStartingArray(gameStartArray);
    });
  }

  selectTheme();
  function selectTheme() { // on page load, set up board with randomly selected array        
    const randomNumber = Math.floor(themeArrays.length * Math.random()); // range dynamically based on number of indexes in themeArrays                
    $('.theme' + (randomNumber + 1)).addClass('selected'); // add .selected to active theme image tile        
    gameStartArray.push(...themeArrays[randomNumber]); // push random number's index for arrays[x] to gameStartArray
    doubleStartingArray(gameStartArray);
  }

  function doubleStartingArray(arrayToDouble) { // double the size of the array so instead of 6 items there are 12 (each item has one match)        
    const cloneArray = arrayToDouble.slice(0);
    arrayToDouble.push(...cloneArray);
    shuffleArray(gameStartArray);
  }

  function shuffleArray(arrayToShuffle) { // Randomize array element order in-place: return code for sort found at: https://css-tricks.com/snippets/javascript/shuffle-array/        
    arrayToShuffle.sort((currentItem, nextItem) => { // Can also use Durstenfeld shuffle algorithm: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      return 0.5 - Math.random()
    });
    setBackImage(document.querySelector('.selected').getAttribute('src'));
  }

  function setBackImage(imgSrc) {
    const backImages = Array.from(document.querySelectorAll('.backImage'));
    const stampedBacks = backImages.map(backImage => {
      return backImage.setAttribute('src', imgSrc)
    });
    setFaceImages(gameStartArray);
  }

  function setFaceImages(array) { // show face images on load  
    const faceImages = Array.from(document.querySelectorAll('.faceImage'));
    faceImages.forEach((image, i) => { // for each string passed, change str to equal the string + value index
      return image.setAttribute('src', 'images/memoryIcons/' + array[i] + '');
    });
    tease__revealCards(1000);
  }

  function tease__revealCards(revealTime) {
    setTimeout(function () { // after x milliseconds flip cards to start game    
      $('.memory__container--play').removeClass('hidden__none');
      $('.card').toggleClass('flipped').find('.back').toggleClass('backfaceToggle');
    }, revealTime);
  }

  const playButton = document.querySelector('.memory__button--play');
  playButton.addEventListener('click', function () {
    $('.memory__container--play').addClass('hidden__none');
    $('.card').toggleClass('flipped').find('.back').toggleClass('backfaceToggle');
  });

  /*----------------------
  Card click event
  -------------------*/
  const cards = $('.card');
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
      if (showingCardsArray.length < 2) { // if less than two cards are showing  
        if ($(this).hasClass('matched') === false) {
          flipCard(this);
        }
      }
    });
  }

  function flipCard(card) {
    $(card).toggleClass('flipped').find('.back').toggleClass('backfaceToggle');
    checkShowingCardsLength(card.firstElementChild.firstElementChild.src);
  }

  function checkShowingCardsLength(faceImage) {
    increaseShowingCardsArray(faceImage); // if < 2 cards showing, increase showingCards count and push this card's backImage src                
    showingCardsArray.length === 2 ? checkShowingForMatch(showingCardsArray) : ''; // and if, on return from increaseShowingCards(), the array now has 2 items, check for a match      
    // could also move checkShowingForMatch here as part of condition  
  }

  function increaseShowingCardsArray(faceImage) {
    return showingCardsArray.push(faceImage); // return back to checkShowingCardsLength() the new array
  }

  function checkShowingForMatch(array) {
    showingCardsArray[0] === showingCardsArray[1] ? matchFound() : unflipCards();
    showingCardsArray = [];
  }

  function unflipCards() {
    setTimeout(function () {
      $('.flipped').toggleClass('flipped').children('.back').toggleClass('backfaceToggle');
    }, 250);
  }

  function matchFound() {
    setTimeout(function () {
      $('.flipped').addClass('matched').toggleClass('flipped').find('.faceImage').attr('src', 'images/memoryIcons/checkmark.svg');
    }, 500);
    points++;
    points === gameStartArray.length / 2 ? celebration() : ''; // if points = total needed then celebrate - if not, run match found
  }

  function celebration() {
    setTimeout(function () {
      $('.memory__container--congrats').removeClass('hidden__none');
      resetGame();
    }, 1000);
  }

  function resetGame() {
    points = 0;
    $('.themeImage').removeClass('selected');
    $('.card').removeClass('matched').children('.back').toggleClass('backfaceToggle');
    $('.faceImage, .backImage').attr('src', '');
    gameStartArray = [];
  }

  const congratsButton = document.querySelector('.memory__button--congrats');
  congratsButton.addEventListener('click', function () {
    $('.memory__container--congrats').addClass('hidden__none');
    selectTheme();
  });
});