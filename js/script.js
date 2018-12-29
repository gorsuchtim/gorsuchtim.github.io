/*
have background of title and setup screens, tiles on the screen, dropping off in the background
use our function for setting blocks and create an animation that shows and turns the letters for the game in the same time it takes to draw blocks to the screen
 */
'use strict';

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
  windowHeight: window.innerHeight
};
var blockElements = {
  xPos: 0,
  yPos: 0,
  rowWidth: 0,
  allBlocksHeight: 0,
  allBlocks: [],
  fallenBlocks: [],
  replacedBlocks: [],
  blockTimeoutSpeed: 0
};
var dynamic = {
  blocksToDrop: 1,
  score: 0,
  streak: 0,
  syncLength: 0,
  startSync: 0,
  syncCount: 0,
  syncStreakCount: 0,
  beatCount: 0,
  pauseFlag: false
};
var blockElements = {
  xPos: 0,
  yPos: 0,
  rowWidth: 0,
  allBlocksHeight: 0,
  allBlocks: [],
  fallenBlocks: [],
  replacedBlocks: []
};
var music = {
  audio: document.querySelector('.audio__player'),
  bpm: [1500, 880]
};

/* ****************** */
// Utility Functions
var utilities = {
  classAdd(elements, ...className) {
    if (elements.length) {
      elements.forEach(element => {
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
      elements.forEach(element => {
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
      elements.forEach(element => {
        element.classList.add(...className);
        setTimeout(() => {
          element.classList.remove(...className);
        }, speed);
      });
    } else {
      elements.classList.add(...className);
      setTimeout(() => {
        elements.classList.remove(...className);
      }, speed);
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
  sequenceFade(element, style, speed, directive) {
    if (directive === 'add') {
      $(element).each(function (i) {
        setTimeout(function () {
          $(element)
            .eq(i)
            .addClass(style);
        }, speed * (i + 1));
      });
    } else if (directive === 'remove') {
      $(element).each(function (i) {
        setTimeout(function () {
          $(element)
            .eq(i)
            .removeClass(style);
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
  shuffleArray(array) {
    // Randomize array element order in-place: Durstenfeld shuffle algorithm.
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
    tile.classList.contains('lit--white')
      ? (color = 'white')
      : (color = 'green');
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
      blocks.removeBlocks(blockElements.allBlocks[0]);
    }, 3000 + music.bpm[0]);
  }
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
    dynamic.pauseFlag = true;
    console.log('game over, loser');
    // game over needs to reset score and streak, pauseFlag, empty arrays (allblocks, fallenblocks)
    // reset all variables in blockElements and dynamic
  },
  getCurrentTile() {
    var current =
      utilities.getIndexByClass(elements.tiles, 'lit--white') ||
      utilities.getIndexByClass(elements.tiles, 'lit--green');
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
  }
};

/* ***************** */
// Score-related Functions
var score = {
  increaseScore(tile) {
    var hasSync = utilities.classCheck(tile, 'lit--green');
    if (hasSync) {
      //dynamic.score += 3;
      blocks.replaceBlocks(3); // test: give back 3 blocks for every sync hit but only increase score by 1 to help adjust balance between falling blocks and what we can replace
      score.trackSyncStreak(tile);
    } else {
      //dynamic.score++;
      blocks.replaceBlocks(1);
    }
    dynamic.score++;
    dynamic.streak++;
  },
  streakBonus(tile) {
    if (dynamic.streak % 10 === 0) {
      dynamic.score += dynamic.streak;
      utilities.classSwapDelay(
        tile.firstElementChild.nextElementSibling,
        250,
        'flashScore'
      );
    }
  },
  trackSyncStreak(tile) {
    dynamic.syncStreakCount++;
    if (dynamic.syncStreakCount === dynamic.syncCount) {
      utilities.classSwapDelay(tile, 250, 'lit--blue');
      if (dynamic.syncStreakCount === dynamic.syncLength) {
        dynamic.score += dynamic.syncLength * 10;
        //blocks.replaceBlocks(10); replace 10 blocks if they nail the sync
        blocks.replaceBlocks(dynamic.syncLength * 10); // replace synclength * 10 worth of blocks when they nail the sync
        elements.syncStreakScore.firstElementChild.textContent = String(
          `+${dynamic.syncLength * 10}!`
        );
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
  checkBlocksToSend() {
    if (dynamic.score >= 20) {
      dynamic.blocksToDrop = Math.floor(dynamic.score / 10);
    }
    var arr = [];
    // before we send this we have to verify that there are enough blocks in blockElements.allBlocks to pull from or we get an error and break the game
    if (dynamic.blocksToDrop === 1) {
      blocks.removeBlocks(blockElements.allBlocks[0]);
    } else {
      for (var i = 0; i < dynamic.blocksToDrop; i++) {
        arr.push(blockElements.allBlocks[i]);
      }
      blocks.removeBlocks(...arr);
    }
  },
  verifyBlocksExist() {
    if (dynamic.score >= 20) {
      dynamic.blocksToDrop = Math.floor(dynamic.score / 10);
    }
    var arr = [];
    if (blockElements.allBlocks.length === 1 || dynamic.blocksToDrop === 1) {
      blocks.removeBlocks(blockElements.allBlocks[0]);
    } else if (blockElements.allBlocks.length >= dynamic.blocksToDrop) {
      for (var i = 0; i < dynamic.blocksToDrop; i++) {
        arr.push(blockElements.allBlocks[i]);
      }
      blocks.removeBlocks(...arr);
    } else {
      gamePlay.gameOver();
    }
  }
};

/* ***************** */
// User action-related Functions
var userAction = {
  checkForColor(tile) {
    var check =
      utilities.classCheck(tile, 'lit--white') ||
      utilities.classCheck(tile, 'lit--green');
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
    }
  }
};

/* ***************** */
// Block Falling Functions
var blocks = {
  setBlocks(container) {
    var block = document.createElement('div');
    utilities.setAttributes(block, {
      class: 'block show',
      style: `top: ${blockElements.yPos}px; left: ${blockElements.xPos}px`
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
      //animations.startCountdown();
    }
  },
  removeBlocks(...blocks) {
    if (blockElements.allBlocks.length) {
      // only drop blocks if blocks exist
      var len = blocks.length;
      blockElements.fallenBlocks.push(...blocks);
      utilities.classAdd(blocks, 'falling');
      utilities.classRemove(blocks, 'show');
      blockElements.allBlocks.splice(0, len);
      if (!dynamic.pauseFlag) {
        // if not paused, see what the points are and drop blocks accordingly
        setTimeout(function () {
          //score.checkBlocksToSend();
          score.verifyBlocksExist();
        }, music.bpm[1]); // set at bpm instead of based on 2mins now that number of blocks that falls is based on points
        //blockElements.blockTimeoutSpeed
      }
    } else {
      // if no more blocks run game over
      gamePlay.gameOver();
    }
  },
  replaceBlocks(repScore) {
    // set repscore in beatflash and sync flash and sync streak bonus!
    blockElements.replacedBlocks = []; // empty blockElements.replacedBlocks from previous replacement
    if (blockElements.fallenBlocks.length >= 1) {
      for (var i = 0; i < repScore; i++) {
        blockElements.replacedBlocks.push(blockElements.fallenBlocks[0]);
        blockElements.fallenBlocks.shift();
      }
      blockElements.replacedBlocks.forEach(function (block) {
        utilities.classRemove(block, 'falling');
        utilities.classAdd(block, 'show');
        blockElements.allBlocks.push(block);
      });
    }
  }
};

/* ***************** */
// Mission Control
var init = {
  run() {
    if (!dynamic.pauseFlag) {
      // this stops it at the right time
      var currentNumber = gamePlay.getCurrentTile();
      var randomNumber = utilities.createRandomNumber(
        elements.tiles.length,
        0,
        currentNumber
      );
      gamePlay.resetBeatCount();
      gamePlay.resetSyncCounts();
      utilities.classRemove(elements.tiles, 'lit--white', 'lit--green');
      var beatOrSync = gamePlay.beatOrSync();
      beatOrSync
        ? animations.beat(randomNumber)
        : animations.sync(randomNumber);
    }
  }
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
    elements.tiles.forEach(tile => {
      tile.addEventListener('click', function () {
        userAction.checkForColor(tile);
      });
    });
    elements.placeButton.addEventListener('click', function () {
      animations.startCountdown();
      // blocks.removeBlocks(blockElements.allBlocks[0]);
      // init.run();
    });
    elements.pauseButton.addEventListener('click', function () {
      dynamic.pauseFlag = !dynamic.pauseFlag;
      if (dynamic.pauseFlag === false) {
        init.run();
        blocks.removeBlocks(blockElements.allBlocks[0]);
      }
    });
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
/* if user hits wrong tile
 // if (blockElements.allBlocks.length >= 3) {
      //   removeBlocks(
      //     blockElements.allBlocks[0],
      //     blockElements.allBlocks[1],
      //     blockElements.allBlocks[2]
      //   );
      // } */

/*
variable in var blocks:  blockTimeoutSpeed: 0,
// placed in setblocks in the else: blockElements.blockTimeoutSpeed = blocks.setBlockFallSpeed(
        blockElements.allBlocks.length
      );
       setBlockFallSpeed(totalBlocks) {
    // var duration = music.audio.duration; use in production
    // rate = distance/time.  in our test distance is the number of blocks that have to fall and time is how many seconds that they have available to fall
    var time = 120; // testing w/out audio file default duration 2mins: CONVERT TO SECONDS FROM MS (120,000) because we are dropping at 1bps and we want to find the speed there
    var rate = totalBlocks / time;
    var timeoutSpeed = 1000 / rate; // divide by 1000 to put back into milliseconds for timeout
    return timeoutSpeed;
  },*/
