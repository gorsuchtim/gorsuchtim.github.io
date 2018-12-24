/*
have background of title and setup screens, tiles on the screen, dropping off in the background
use our function for setting blocks and create an animation that shows and turns the letters for the game in the same time it takes to draw blocks to the screen
 */
'use strict'

/* ***************** */
// Variables
var elements = {
  toSetupButton: document.querySelector('.button--toSetup'),
  toStartButton: document.querySelector('.button--toStart'),
  setupButtons: [].slice.call(document.querySelectorAll('.button--setup')),
  titleWrap: document.querySelector('.wrap__config--title'),
  setupWrap: document.querySelector('.wrap__config--setup'),
  tileWrap: document.querySelector('.wrap__tiles'),
  tiles: [].slice.call(document.querySelectorAll('.tile')),
  titleScore: document.querySelector('.score--title'),
  titleStreak: document.querySelector('.streak--title'),
  placeButton: document.querySelector('.place'),
  removeButton: document.querySelector('.remove'),
  replaceButton: document.querySelector('.replace'),
  pauseButton: document.querySelector('.pause'),
  gameBoardScores: [].slice.call(document.querySelectorAll('.score')),
  gameBoardStreaks: [].slice.call(document.querySelectorAll('.streak')),
  syncStreakScore: document.querySelector('.wrap__syncStreakScore'),
  wrapTimer: document.querySelector('.wrap__timer'),
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,

  //area: elements.windowWidth * elements.windowHeight,
}
var blockElements = {
  xPos: 0,
  yPos: 0,
  rowWidth: 0,
  allBlocksHeight: 0,
  allBlocks: [],
  fallenBlocks: [],
  replacedBlocks: [],
  blockTimeoutSpeed: 0,
  area: elements.windowWidth * elements.windowHeight,
}
var dynamic = {
  score: 0,
  streak: 0,
  syncLength: 0,
  startSync: 0,
  syncCount: 0,
  syncStreakCount: 0,
  beatCount: 0,
  pauseFlag: false,
}
var blockElements = {
  xPos: 0,
  yPos: 0,
  rowWidth: 0,
  allBlocksHeight: 0,
  allBlocks: [],
  fallenBlocks: [],
  replacedBlocks: [],
  blockTimeoutSpeed: 0,
  area: elements.windowWidth * elements.windowHeight,
}
var music = {
  audio: document.querySelector('.audio__player'),
  bpm: [1500, 880],
}

/* ****************** */
// Utility Functions
var utilities = {
  classAdd(elements, ...className) {
    if (elements.length) {
      elements.forEach((element) => {
        element.classList.add(...className);
      });
    } else {
      elements.classList.add(...className);
    }
  },
  classCheck(element, className) {
    if (element.classList.contains(className)) {
      return true;
    } else {
      return false;
    }
  },
  classRemove(elements, ...className) {
    if (elements.length) {
      elements.forEach((element) => {
        element.classList.remove(...className);
      });
    } else {
      elements.classList.remove(...className);
    }
  },
  classSwap(element, className) {
    element.classList.toggle(className);
  },
  classSwapDelay(elements, speed, ...className) {
    if (elements.length) {
      elements.forEach((element) => {
        element.classList.add(...className);
        setTimeout(() => {
          element.classList.remove(...className);
        }, speed)
      });
    } else {
      elements.classList.add(...className);
      setTimeout(() => {
        elements.classList.remove(...className);
      }, speed)
    }
  },
  createRandomNumber(max, min, currentNumber) {
    var newNumber = Math.floor(Math.random() * (max - min) + min);
    if (currentNumber !== undefined) {
      if (newNumber === currentNumber) {
        newNumber = utilities.createRandomNumber(
          elements.tiles.length,
          0,
          currentNumber
        );
      }
    }
    return newNumber;
  },
  getIndexByClass(elements, className) {
    var index;
    elements.forEach(function (element) {
      if (element.classList.contains(className)) {
        index = elements.indexOf(element);
      }
    });
    return index;
  },
  resize() {
    elements.windowWidth = window.innerWidth;
    elements.windowHeight = window.innerHeight;
    elements.area = elements.windowWidth * elements.windowHeight;
  },
  sequenceFade(element, style, speed, directive) {
    if (directive === 'add') {
      $(element).each(function (i) {
        setTimeout(function () {
          $(element).eq(i).addClass(style);
        }, speed * (i + 1));
      });
    } else if (directive === 'remove') {
      $(element).each(function (i) {
        setTimeout(function () {
          $(element).eq(i).removeClass(style);
        }, speed * (i + 1));
      });
    } else {
      return false;
    }
  },
  setAttributes(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  },
  shuffleArray(array) { // Randomize array element order in-place: Durstenfeld shuffle algorithm.         
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
};

/* ****************** */
// Animations
var animations = {
  beat(tile) {
    utilities.classAdd(elements.tiles[tile], 'lit--white');
    dynamic.beatCount++;
    gamePlay.reRun(music.bpm[1]);
  },
  sync(tile) {
    utilities.classAdd(elements.tiles[tile], 'lit--green');
    if (dynamic.syncCount < dynamic.syncLength) {
      dynamic.syncCount++;
    }
    gamePlay.reRun(music.bpm[1] * 0.75);
  },
  changeTileBackground(tile) {
    var color;
    tile.classList.contains('lit--white') ? color = 'white' : color = 'green';
    utilities.classSwapDelay(tile, 250, `changeColor--${color}`);
  },
  startCountdown() {
    setTimeout(() => {
      utilities.classSwap(elements.wrapTimer, 'hidden');
      timer.timedCount();
      music.audio.play();
    }, 1100);
    setTimeout(() => {
      utilities.classSwap(elements.wrapTimer, 'hidden');
      init.run();
      removeBlocks(blockElements.allBlocks[0]);
    }, 3000 + music.bpm[0]);
  },
};

/* ***************** */
// Gameplay Functions
var gamePlay = {
  beatOrSync() {
    if (dynamic.beatCount < dynamic.startSync || dynamic.beatCount === 0) {
      return true;
    } else {
      return false;
    }
  },
  gameOver() {
    console.log('game over, loser');
    // game over needs to reset score and streak, pauseFlag, empty arrays (allblocks, fallenblocks)
    // reset all variables in blockElements and dynamic
  },
  getCurrentTile() {
    var current = utilities.getIndexByClass(elements.tiles, 'lit--white') || utilities.getIndexByClass(elements.tiles, 'lit--green');
    if (current === undefined) {
      current = utilities.createRandomNumber(elements.tiles.length, 0);
    }
    return current;
  },
  reRun(speed) {
    setTimeout(() => {
      init.run();
    }, speed);
  },
  resetBeatCount() {
    if (dynamic.syncCount === dynamic.syncLength) {
      dynamic.beatCount = 0;
      dynamic.syncCount = 0;
    }
  },
  resetSyncCounts() {
    if (dynamic.beatCount === 0) {
      dynamic.startSync = utilities.createRandomNumber(15, 5); //20, 5
      dynamic.syncLength = utilities.createRandomNumber(12, 3); // 12, 3
      dynamic.syncStreakCount = 0;
    }
  },
  setSyncTime() {
    // create random timing of sync rhythm using create random
    // should always be faster than bpm?  or slower and faster?
    // to test, set to either 0.85,0.75,0.65, 0.5
    // maybe max then is 0.85 and min is 0.5
    // where do we set this up so it doesn't create the random number with each syncFlash? or do we want it to do that?!?
    dynamic.syncTiming = utilities.createRandomNumber(0.85, 0.5);
    return dynamic.syncTiming;
  },
};

/* ***************** */
// Score-related Functions
var score = {
  increaseScore(tile) {
    var hasSync = utilities.classCheck(tile, 'lit--green');
    if (hasSync) {
      dynamic.score += 3;
      blocks.replaceBlocks(3);
      score.trackSyncStreak(tile);
    } else {
      dynamic.score++;
      blocks.replaceBlocks(1);
    }
    dynamic.streak++;
  },
  streakBonus(tile) {
    if (dynamic.streak % 10 === 0) {
      dynamic.score += dynamic.streak;
      utilities.classSwapDelay(tile.firstElementChild.nextElementSibling, 250, 'flashScore');
    }
  },
  trackSyncStreak(tile) {
    dynamic.syncStreakCount++;
    if (dynamic.syncStreakCount === dynamic.syncCount) {
      utilities.classSwapDelay(tile, 250, 'lit--blue');
      if (dynamic.syncStreakCount === dynamic.syncLength) {
        dynamic.score += dynamic.syncLength * 10;
        blocks.replaceBlocks(10);
        elements.syncStreakScore.firstElementChild.textContent = String(`+${dynamic.syncLength * 10}!`);
        utilities.classRemove(elements.syncStreakScore, 'hidden');
        setTimeout(() => {
          utilities.classAdd(elements.syncStreakScore, 'hidden');
        }, 750);
      }
    }
  },
  updateScoreElements() {
    elements.titleScore.textContent = String(`Points: ${dynamic.score}`);
    elements.titleStreak.textContent = String(`Streak: ${dynamic.streak}`);

    elements.gameBoardScores.forEach(function (gameBoardScore) {
      gameBoardScore.textContent = String(dynamic.score);
    });

    elements.gameBoardStreaks.forEach(function (gameBoardStreak) {
      gameBoardStreak.textContent = String(dynamic.streak);
    });
  },
};

/* ***************** */
// User action-related Functions
var userAction = {
  checkForColor(tile) {
    var check = utilities.classCheck(tile, 'lit--white') || utilities.classCheck(tile, 'lit--green');
    if (check) {
      score.increaseScore(tile);
      score.streakBonus(tile);
      score.updateScoreElements();
      utilities.classSwapDelay(tile.firstElementChild, 250, 'flashScore');
      animations.changeTileBackground(tile);
    } else {
      dynamic.streak = 0;
      dynamic.syncStreakCount = 0;
      elements.titleStreak.textContent = String(`Streak: ${dynamic.streak}`);
      utilities.classSwapDelay(tile, 2000, 'shake');
      if (blockElements.allBlocks.length >= 3) {
        removeBlocks(blockElements.allBlocks[0], blockElements.allBlocks[1], blockElements.allBlocks[2]);
      }
    }
  }
};

//blockElements.blockTimeoutSpeed
// Why does this not work as a method of the var blocks object??
function removeBlocks(...blocks) {
  if (blockElements.allBlocks.length) { // only drop blocks if blocks exist
    var len = blocks.length;
    blockElements.fallenBlocks.push(...blocks);
    utilities.classAdd(blocks, 'falling');
    utilities.classRemove(blocks, 'show');
    blockElements.allBlocks.splice(0, len);
    if (!dynamic.pauseFlag) { // if not paused
      if (blocks.length === 1) { // so there is no repeat of dropping 3 on a wrong hit
        setTimeout(function () {
          removeBlocks(blockElements.allBlocks[0]);
        }, 500);
      }
    }
  } else { // if no more blocks run game over
    gamePlay.gameOver();
  }
}

/* ***************** */
// Block Falling Functions
var blocks = {
  setBlockFallSpeed(totalBlocks) {
    var duration = music.audio.duration
    // by the end of song, if nothing is done by user all blocks will have fallen by 0
    // to make it end by half song length, * blocks per second by 2?
    var blocksPerSecond = (totalBlocks / duration) * 2;
    var timeoutSpeed = 1000 / blocksPerSecond;
    return timeoutSpeed;
  },
  increaseBlockFallSpeed() {

  },
  setBlocks(container) {
    var block = document.createElement('div');
    utilities.setAttributes(block, {
      class: 'block show',
      style: `top: ${blockElements.yPos}px; left: ${blockElements.xPos}px`,
    });
    blockElements.allBlocks.push(block);

    var wrapBlocks = document.querySelector(container);
    wrapBlocks.appendChild(block);

    var rect = block.getBoundingClientRect();
    blockElements.rowWidth += rect.width;

    if (blockElements.rowWidth >= elements.windowWidth) {
      blockElements.yPos += rect.height;
      blockElements.allBlocksHeight = blockElements.yPos;
      blockElements.xPos = 0;
      blockElements.rowWidth = 0;
    } else {
      blockElements.xPos += rect.width;
    }

    if (blockElements.allBlocksHeight <= elements.windowHeight) {
      setTimeout(() => {
        blocks.setBlocks(container);
      }, 0);
    } else {
      utilities.shuffleArray(blockElements.allBlocks);
      blockElements.blockTimeoutSpeed = blocks.setBlockFallSpeed(blockElements.allBlocks.length);
      //animations.startCountdown();
    }
  },
  replaceBlocks(repScore) {
    // set repscore in beatflash and sync flash and sync streak bonus!
    if (blockElements.fallenBlocks.length >= 1) {
      for (var i = 0; i < repScore; i++) {
        blockElements.replacedBlocks.push(blockElements.fallenBlocks[0]);
        blockElements.fallenBlocks.shift();
      }
      utilities.classRemove(blockElements.replacedBlocks, 'falling');
      utilities.classAdd(blockElements.replacedBlocks, 'show');
      blockElements.allBlocks.push(blockElements.replacedBlocks);
    }
  }
}

/* ***************** */
// Mission Control
var init = {
  run() {
    if (!dynamic.pauseFlag) { // this stops it at the right time
      var currentNumber = gamePlay.getCurrentTile();
      var randomNumber = utilities.createRandomNumber(elements.tiles.length, 0, currentNumber);
      gamePlay.resetBeatCount();
      gamePlay.resetSyncCounts();
      utilities.classRemove(elements.tiles, 'lit--white', 'lit--green');
      var beatOrSync = gamePlay.beatOrSync();
      beatOrSync ? animations.beat(randomNumber) : animations.sync(randomNumber);
    }
  },
};

/* ***************** */
// Title screen functions
function init_titleScreen() {
  blocks.setBlocks('.wrap--blocks');
  utilities.sequenceFade('.setup__text--title', 'show', 100, 'add');
  utilities.sequenceFade('.setup__text--title', 'text--flipped', 100, 'remove');
  setTimeout(function () {
    elements.toSetupButton.classList.remove('clear');
  }, 1500);
}

/* ***************** */
// Event Listeners
var events = {
  setEvents() {
    elements.setupButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var parent = this.parentElement;
        utilities.classSwap(parent, 'offscreen--left');
        setTimeout(function () {
          utilities.classSwap(parent.nextElementSibling, 'offscreen--left');
        }, 500);
      });
    });
    elements.tiles.forEach((tile) => {
      tile.addEventListener('click', function () {
        userAction.checkForColor(tile);
      });
    });
    elements.placeButton.addEventListener('click', function () {
      // blocks.setBlocks('.wrap__blocks');
      // animations.startCountdown();
      // use the block placement as the countdown
      animations.startCountdown();
      //init.run();
    });
    elements.removeButton.addEventListener('click', function () {
      removeBlocks(blockElements.allBlocks[0]);
    });
    elements.replaceButton.addEventListener('click', function () {
      blocks.replaceBlocks(1);
    });
    elements.pauseButton.addEventListener('click', function () {
      dynamic.pauseFlag = !dynamic.pauseFlag;
      if (dynamic.pauseFlag === false) {
        init.run();
        removeBlocks(blockElements.allBlocks[0]);
      }
    });
    window.addEventListener('resize', utilities.resize);

  }
};

// On page load
events.setEvents();
init_titleScreen();
/*
try {
    events.setEvents();
    init_titleScreen();
} catch (ev) {
    console.log('error occured: ' + ev);
}




*/
