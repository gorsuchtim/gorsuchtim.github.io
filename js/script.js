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
  streak: 0,
  checkForColor(tile) {
    if (tile.classList.length === 2) {
      gamePlay.score++;
      gamePlay.streak++;
      gamePlay.checkStreakBonus(gamePlay.streak);
      return tile;
    } else {
      gamePlay.streak = 0;
    }
  },
  checkStreakBonus(streak) {
    if (streak === 2) {
      gamePlay.score += 10;
    } else if (streak === 10) {
      gamePlay.score += 20;
    } else if (streak === 20) {
      gamePlay.score += 40;
    } else if (streak === 50) {
      gamePlay.score += 100;
    }
  },
  showStreak(streak) {
    streak.classList.add('animateScore');
    setTimeout(function () {
      streak.classList.remove('animateScore');
    }, 500);
  },
  updateScoreElements() {
    titleScore.textContent = String(`Points: ${gamePlay.score}`);
    titleStreak.textContent = String(`Streak: ${gamePlay.streak}`);
    var gameBoardScores = [].slice.call(document.querySelectorAll('.score'));
    gameBoardScores.forEach(function (gameBoardScore) {
      gameBoardScore.textContent = String(gamePlay.score);
    });
    var gameBoardStreaks = [].slice.call(document.querySelectorAll('.streak'));
    gameBoardStreaks.forEach(function (gameBoardStreak) {
      gameBoardStreak.textContent = String(gamePlay.streak);
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

var tiles = [].slice.call(document.querySelectorAll('.tile'));
var titleScore = document.querySelector('.score--title');
var titleStreak = document.querySelector('.streak--title');
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
      if (gamePlay.streak === 5 || gamePlay.streak === 10 || gamePlay.streak === 20 || gamePlay.streak === 50) {
        gamePlay.showStreak(tile.firstElementChild.nextElementSibling);
      }
    }
  });
});

// Audio Events
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

/*
 Algorithm for off-beat/synchronized patters
Set a syncro counter at 0 on page load.  When the game loads, each tile flash increases syncro++
Always when syncro is at no less than 10 and no more than 20 run the offbeat program
Off beat program should determine to override the once per beat pattern and flash the tiles at intervals
and 1 and 2 and or 1e and a 2e and a ... for x number of offbeats, all in one special color (neon?) 
when the player hits 1 individually it counts for 2 or 3 points.  if he hits all of the synchros without missing one
then he gets like a 10 point bonus?
 */
