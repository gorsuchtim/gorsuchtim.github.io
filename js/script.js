'use strict'

var elements = {
  tiles: [].slice.call(document.querySelectorAll('.tile')),
  titleScore: document.querySelector('.score--title'),
  titleStreak: document.querySelector('.streak--title'),
  playButton: document.querySelector('.play'),
  gameBoardScores: [].slice.call(document.querySelectorAll('.score')),
  gameBoardStreaks: [].slice.call(document.querySelectorAll('.streak')),
  songChoice: document.querySelector('.songChoice'),
  wrapTimer: document.querySelector('.wrap__timer'),
}
// need a variable to see if player hit all of the syncs so if that var === syncLength then they get like +50
var dynamicVars = {
  score: 0,
  streak: 0,
  syncLength: undefined,
  startSync: undefined,
  syncCount: 0,
  beatCount: 0,
}
var utilities = {
  clearClasses(elements) {
    elements.forEach((element) => {
      element.classList = element.classList[0];
    });
  },
  createRandomNumber(max, min, v) {
    if (v) {
      return v = Math.floor(Math.random() * (max - min) + min);
    } else {
      return Math.floor(Math.random() * (max - min) + min);
    }
  },
  swapClass(element, ...className) {
    return element.classList.toggle(...className);
  },
  // failing here - running late after it adds the class
  delaySwap(element, className) {
    utilities.swapClass(element, className);
    setTimeout(() => {
      utilities.swapClass(element, className);
    }, 500);
  },
  checkClass(element, className) {
    if (element.classList.contains(className) === true) {
      return true;
    } else {
      return false;
    }
  },
}
var music = {
  audio: document.querySelector('.audio__player'),
  bpm: [],
  setSong(choice) {
    audio.pause();
    audio.setAttribute('src', `audio/${choice}.mp3`);
  },
  setBPM(choice) {
    // bpm[0] is delay to start actual song after countdown.  bpm[1] is actual bpm of song offset by transition timing
    music.bpm = '';
    if (choice === 'synth1') {
      // synth1 is 120bpm
      music.bpm = [1500, 880];
    } else if (choice === 'bach') {
      music.bpm = [1150, 825];
    }
  },
}
var animations = {
  beatFlash() {
    utilities.clearClasses(elements.tiles);
    gamePlay.checkSyncCount();
    dynamicVars.beatCount++;
    var randomTile = utilities.createRandomNumber(elements.tiles.length, 0);
    utilities.swapClass(elements.tiles[randomTile], 'lit--blue', 'beatFlash');
    gamePlay.beatOrSync();
  },
  syncFlash() {
    utilities.clearClasses(elements.tiles);
    if (dynamicVars.syncCount < dynamicVars.syncLength) {
      dynamicVars.syncCount++;
      var randomTile = utilities.createRandomNumber(elements.tiles.length, 0);
      utilities.swapClass(elements.tiles[randomTile], 'lit--purple', 'syncFlash');
      gamePlay.beatOrSync();
    } else {
      gamePlay.resetCounts();
      animations.beatFlash();
    }
  },
}
var gamePlay = {
  beatOrSync() {
    if (dynamicVars.beatCount < dynamicVars.startSync) {
      setTimeout(() => {
        animations.beatFlash();
      }, music.bpm[1]);
    } else {
      setTimeout(() => {
        animations.syncFlash();
      }, music.bpm[1] * 0.75);
    }
  },
  checkForColor(tile) {
    var check = utilities.checkClass(tile, 'lit--blue') || utilities.checkClass(tile, 'lit--purple');
    if (check) {
      // utilities.delaySwap(tile, 'getBig');
      utilities.delaySwap(tile.firstElementChild, 'animateScore');
      gamePlay.increaseScore(tile);
      gamePlay.streakBonus(tile);
    } else {
      dynamicVars.streak = 0;
      // use rightAnswer to add negative animation on the tap?
    }
  },
  checkSyncCount() {
    // if syncCount is reset to 0 then set goal and length
    if (dynamicVars.beatCount === 0) {
      dynamicVars.startSync = utilities.createRandomNumber(20, 10, dynamicVars.startSync);
      dynamicVars.syncLength = utilities.createRandomNumber(12, 3, dynamicVars.syncLength);
    }
  },
  increaseScore(tile) {
    if (tile.classList.contains('syncFlash')) {
      dynamicVars.score = dynamicVars.score + 3;
    } else {
      dynamicVars.score++;
    }
    dynamicVars.streak++;
  },
  resetCounts() {
    dynamicVars.syncCount = 0;
    dynamicVars.beatCount = 0;
  },
  startCountdown() {
    setTimeout(() => {
      utilities.swapClass(elements.wrapTimer, 'hidden');
      timer.timedCount();
      music.audio.play();
    }, 1100);

    setTimeout(() => {
      utilities.swapClass(elements.wrapTimer, 'hidden');
      animations.beatFlash();
      //music is coming in too late after first flash
    }, 3000 + music.bpm[0]); // + music.bpm[0]
  },
  streakBonus(tile) {
    if (dynamicVars.streak === 10) {
      dynamicVars.score += 10;
      utilities.delaySwap(tile.firstElementChild.nextElementSibling, 'animateScore');
    } else if (dynamicVars.streak === 20) {
      dynamicVars.score += 20;
      utilities.delaySwap(tile.firstElementChild.nextElementSibling, 'animateScore');
    } else if (dynamicVars.streak === 50) {
      dynamicVars.score += 50;
      utilities.delaySwap(tile.firstElementChild.nextElementSibling, 'animateScore');
    } else if (dynamicVars.streak === 100) {
      dynamicVars.score += 100;
      utilities.delaySwap(tile.firstElementChild.nextElementSibling, 'animateScore');
    }
  },
  updateScoreElements() {
    elements.titleScore.textContent = String(`Points: ${dynamicVars.score}`);
    elements.titleStreak.textContent = String(`Streak: ${dynamicVars.streak}`);

    elements.gameBoardScores.forEach(function (gameBoardScore) {
      gameBoardScore.textContent = String(dynamicVars.score);
    });

    elements.gameBoardStreaks.forEach(function (gameBoardStreak) {
      gameBoardStreak.textContent = String(dynamicVars.streak);
    });
  },
}

// Tile click event
elements.tiles.forEach((tile) => {
  tile.addEventListener('click', function () {
    gamePlay.checkForColor(tile);
    gamePlay.updateScoreElements();
  });
});
// Play button event
elements.playButton.addEventListener('click', function () {
  gamePlay.startCountdown();
});
// Audio events
elements.songChoice.addEventListener('change', function () {
  var choice = elements.songChoice.value;
  music.setSong(choice);
  music.setBPM(choice);
});
music.setBPM('synth1'); // page load, load figaro by default

/*
add bonus 25+ points or 50+ if you hit all of them
maybe that should be like 10 x syncLength so if SL is 8 then it would be 80 bonus points
need a stop button 
need to tell flash functions to stop after audio.duration
*/
