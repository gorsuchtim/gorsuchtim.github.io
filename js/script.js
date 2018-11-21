'use strict'

function startFlash() {
  var randomNumber = animateTiles.getRandomNumber(tiles);
  var randomTile = animateTiles.getRandomTile(randomNumber);
  var colorsArray = ['red', 'green', 'blue', 'orange', 'yellow'];
  var randomColor = animateTiles.getRandomNumber(colorsArray);
  animateTiles.addColorClass(randomTile, colorsArray[randomColor]);

  // use 825 for bach
  // use 425.531914893617 for figaro or 851.063829787234

  setTimeout(() => {
    animateTiles.removeColorClass(randomTile, colorsArray[randomColor]);
    startFlash();
  }, 925);
}


var animateTiles = {
  getRandomNumber(arr) {
    var randomNumber = Math.floor(arr.length * Math.random());
    return randomNumber;
  },
  getRandomTile() {
    var tile = tiles[Math.floor(Math.random() * tiles.length)];
    return tile;
  },
  addColorClass(tile, color) {
    tile.classList.add(color);
  },
  removeColorClass(tile, color) {
    tile.classList.remove(color);
  },
}
var gamePlay = {
  score: 0,
  checkForColor(tile) {
    if (tile.classList.length === 2) {
      gamePlay.score++;
      return tile;
    } else {
      if (gamePlay.score > 0) {
        //gamePlay.score--;
      }
    }
  },
  updateScoreElements() {
    var gameBoardScores = [].slice.call(document.querySelectorAll('.score'));
    gameBoardScores.forEach(function (gameBoardScore) {
      gameBoardScore.textContent = String(gamePlay.score);
    });
  },
  highlightTile(tile, score) {
    tile.classList.add('lit');
    score.classList.add('animateScore');
    setTimeout(function () {
      tile.classList.remove('lit');
      score.classList.remove('animateScore');
    }, 500);
  },
}
// have to set the text of the score in all scores


var tiles = [].slice.call(document.querySelectorAll('.tile'));
// Click event for tiles
tiles.forEach((tile) => {
  tile.addEventListener('click', function () {
    // Check to see if the clicked tile has color and increment/decrement gameplay.score
    var check = gamePlay.checkForColor(tile);
    // Update the html .score spans
    gamePlay.updateScoreElements();
    // Flash the points, set lite brite glow if check is true
    if (check) {
      gamePlay.highlightTile(tile, tile.firstElementChild);
    }
  });
});
var audio = document.querySelector('.audio__player');

var playButton = document.querySelector('.play');
playButton.addEventListener('click', function () {
  // use 1250 for bach
  // use 1100 for figaro
  try {
    audio.play();
    setTimeout(() => {
      startFlash();
    }, 1100);
  } catch (ev) {
    console.log(ev);
  }
});

var pause = document.querySelector('.pause');
pause.addEventListener('click', function () {
  audio.pause()
});
