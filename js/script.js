'use strict'

function flashColor() {
  var animate = {
    getRandomNumber(arr) {
      var randomNumber = Math.floor(arr.length * Math.random());
      return randomNumber;
    },
    getRandomTile() {
      var tile = tiles[Math.floor(Math.random() * tiles.length)];
      return tile;
    },
    addColor(tile, color) {
      tile.classList.add(color);
    },
    removeColor(tile, color) {
      tile.classList.remove(color);
    },
  }
  var randomNumber = animate.getRandomNumber(tiles);
  var randomTile = animate.getRandomTile(randomNumber);
  var colorsArray = ['red', 'green', 'blue', 'orange', 'yellow'];
  var randomColor = animate.getRandomNumber(colorsArray);
  animate.addColor(randomTile, colorsArray[randomColor]);

  // use 825 for bach
  // use 425.531914893617 for figaro or 851.063829787234

  setTimeout(() => {
    animate.removeColor(randomTile, colorsArray[randomColor]);
    flashColor();
  }, 925);
}

var gamePlay = {
  yes: 0,
  yesText: document.querySelector('.yesText'),
  checkForColor(tile) {
    if (tile.classList.length === 2) {
      gamePlay.yes++;
      return tile;
    } else {
      gamePlay.yes--;
    }
  },
  yesTextColor(check) {
    if (check) {
      gamePlay.yesText.classList.remove('no');
    } else {
      if (!gamePlay.yesText.classList.contains('no')) {
        gamePlay.yesText.classList.add('no');
      }
    }
  },
  tallyScore() {
    gamePlay.yesText.textContent = String(gamePlay.yes);
  },
  togglePulse(tile) {
    tiles.forEach((tile) => {
      tile.classList.remove('pulse');
    });
    tile.classList.add('pulse');
  },
}
var tiles = [].slice.call(document.querySelectorAll('.tile'));
// Click event for tiles
tiles.forEach((tile) => {
  tile.addEventListener('click', function () {
    //gamePlay.togglePulse(this);    
    var check = gamePlay.checkForColor(tile);
    gamePlay.yesTextColor(check);
    gamePlay.tallyScore();
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
      flashColor();
    }, 1100);
  } catch (ev) {
    console.log(ev);
  }
});

var pause = document.querySelector('.pause');
pause.addEventListener('click', function () {
  audio.pause()
});
/*
60 bpm means 1 beat occurs per second
console.log((60000 / 141) * 2);
convert that to milliseconds 60,000*bpm
Let the speed of the setTimeout be equal to either a difficulty setting, progression of game or BPM of song or something like that?
based on bpm dynamic colors change each time
*/
