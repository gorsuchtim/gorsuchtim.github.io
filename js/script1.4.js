'use strict'

// Page elements
var tiles = [].slice.call(document.querySelectorAll('.tile'));
var titleScore = document.querySelector('.score--title');
var titleStreak = document.querySelector('.streak--title');
var gameBoardScores = [].slice.call(document.querySelectorAll('.score'));
var gameBoardStreaks = [].slice.call(document.querySelectorAll('.streak'));

// Dynamic variables
var score = 0;
var streak = 0;
var syncLength = undefined;
var startSync = undefined;
var syncCount = 0;
var beatCount = 0;

// Global functions
function countDownStart() {
  classSwap(document.querySelector('.wrap__timer'), 'hidden');
  timer.timedCount();
  setTimeout(function () {
    classSwap(document.querySelector('.wrap__timer'), 'hidden');
    beatFlash();
  }, 5000 + bpm[0]); // set as 5000 + bpm[0]?
}
function clearClass(elements, className) {
  elements.forEach((element) => {
    element.classList.remove(className);
  });
}
function createRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
function classSwap(element, className) {
  return element.classList.toggle(className);
}
function checkForClass(element, className) {
  element.classList.contains(className) ? true : false;
}
function randomizeSyncVars(v, max, min) {
  v = createRandomNumber(max, min);
  return v;
}
function checkSyncCount() {
  // if syncCount is reset to 0 then set goal and length
  if (beatCount === 0) {
    startSync = randomizeSyncVars(startSync, 20, 10);
    syncLength = randomizeSyncVars(syncLength, 12, 3);
  }
}
function beatOrSync() {
  if (beatCount < startSync) {
    setTimeout(function () {
      beatFlash();
    }, bpm[1]);
  } else {
    setTimeout(function () {
      syncFlash();
    }, bpm[1] * 0.5);
  }
}
function resetCounts() {
  syncCount = 0;
  beatCount = 0;
}
function lightTile(color) {
  var randomNumber = createRandomNumber(tiles.length, 0);
  var litTile = classSwap(tiles[randomNumber], color);
}

// THE FIRST TIME SYNCFLASH RUNS HAS TO BE AT THE SAME TIMEOUT AS BEAT FLASH?
function beatFlash() {
  clearClass(tiles, 'neon--blue');
  clearClass(tiles, 'lit--green');
  checkSyncCount();
  beatCount++;
  lightTile('neon--blue');
  console.log(beatCount, startSync, 'running beatflash');
  beatOrSync();
}
function syncFlash() {
  clearClass(tiles, 'neon--blue');
  clearClass(tiles, 'lit--green');
  if (syncCount < syncLength) {
    syncCount++;
    lightTile('lit--green');
    console.log(syncCount, syncLength, 'running syncflash');
    beatOrSync();
  } else {
    resetCounts();
    beatFlash();
  }
}
function checkStreakBonus(streak) {
  if (streak === 10) {
    score += 10;
  } else if (streak === 20) {
    score += 20;
  } else if (streak === 50) {
    score += 50;
  } else if (streak === 100) {
    score += 100;
  }
}
function updateScoreElements() {
  titleScore.textContent = String(`Points: ${score}`);
  titleStreak.textContent = String(`Streak: ${streak}`);
  var gameBoardScores = [].slice.call(document.querySelectorAll('.score'));
  gameBoardScores.forEach(function (gameBoardScore) {
    gameBoardScore.textContent = String(score);
  });
  var gameBoardStreaks = [].slice.call(document.querySelectorAll('.streak'));
  gameBoardStreaks.forEach(function (gameBoardStreak) {
    gameBoardStreak.textContent = String(streak);
  });
}
function checkForColor(tile) {
  if (tile.classList.length === 2) {
    score++;
    streak++;
    checkStreakBonus(streak);
    return tile;
  } else {
    streak = 0;
  }
}
function showStreak(streak) {
  streak.classList.add('animateScore');
  setTimeout(function () {
    streak.classList.remove('animateScore');
  }, 500);
}
function highlightTile(tile, score) {
  tile.classList.add('lit--blue');
  score.classList.add('animateScore');
  setTimeout(function () {
    tile.classList.remove('lit--blue');
    score.classList.remove('animateScore');
  }, 500);
}
// Tile click events
tiles.forEach((tile) => {
  tile.addEventListener('click', function () {
    // Check to see if the clicked tile has color and increment/decrement gameplay.score
    var check = checkForColor(tile);
    // Update the html .score spans
    updateScoreElements();
    // Flash the points, set lite brite glow if check is true
    if (check) {
      highlightTile(tile, tile.firstElementChild);
      if (streak === 10 || streak === 20 || streak === 50) {
        showStreak(tile.firstElementChild.nextElementSibling);
      }
    }
  });
});
// Play button event
var playButton = document.querySelector('.play');
playButton.addEventListener('click', function () {
  countDownStart();
});
// Audio events
var songChoice = document.querySelector('.songChoice');
songChoice.addEventListener('change', function () {
  var choice = songChoice.value;
  setSong(choice);
  setBPM(choice);
});
function setSong(choice) {
  audio.pause();
  if (choice === 'figaro') {
    audio.setAttribute('src', 'audio/figaro.mp3');
  } else if (choice === 'bach') {
    audio.setAttribute('src', 'audio/bach.m4a');
  }
}
var bpm = []; // 2 values.  try/catch settimeout & beatFlash settimeout
setBPM('figaro'); // page load, load figaro by default
function setBPM(choice) {
  // bpm[0] is delay to start actual song after countdown.  bpm[1] is actual bpm of song offset by transition timing
  bpm = '';
  if (choice === 'figaro') {
    bpm = [1100, 925];
  } else if (choice === 'bach') {
    bpm = [1150, 825];
  }
}