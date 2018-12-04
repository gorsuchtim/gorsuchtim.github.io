'use strict'
/*
BUGS!
scores flash up and leave too fast

need to look at timecode properties to see if there is a trigger when play() executes and what other properties exist to help w/
flashing on the beat

IDEAS


/* 
if you're on streak with syncstreakcount then the border should be neon red of the tile you hit - keep purple background but neon-red the border and then when you hit the final one BAMthey all go neon for 1 beat and you choose

hey maybe take advantage of the blank tile after sync runs.
      after you hit them all turn all neon red or red or red or something and "hide" some kind of prize behind
      one of them and the user taps any tile and if he hits one that's not the prize then all tiles turn red but if he hits
      the one with the prize then abracadabra something something - stop for a mini - game ? like slot machine style
      create these hidden bonuses in patterns that can be recognized like where the prize is going to be
      either draws something or is a secret code like toprow 2 midrow 1 nextrow 4 bottomrow 2
      have a set number of streaks per game and at the end of the game if you've hit them all and memorized where the prize was then you can enter that code in offgame screen to get a new song? or to be able to pick a new genre and unlock songs in that genre?

*/

var elements = {
  tileWrap: document.querySelector('.wrap__tiles'),
  tiles: [].slice.call(document.querySelectorAll('.tile')),
  titleScore: document.querySelector('.score--title'),
  titleStreak: document.querySelector('.streak--title'),
  playButton: document.querySelector('.play'),
  gameBoardScores: [].slice.call(document.querySelectorAll('.score')),
  gameBoardStreaks: [].slice.call(document.querySelectorAll('.streak')),
  syncStreakScore: document.querySelector('.wrap__syncStreakScore'),
  wrapTimer: document.querySelector('.wrap__timer'),
}
var dynamic = {
  score: 0,
  streak: 0,
  syncLength: 0,
  startSync: 0,
  syncCount: 0,
  syncStreakCount: 0,
  beatCount: 0,
}
var music = {
  audio: document.querySelector('.audio__player'),
  bpm: [1500, 880],
}
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
  }
};
var gamePlay = {
  beatOrSync() {
    if (dynamic.beatCount < dynamic.startSync || dynamic.beatCount === 0) {
      return true;
    } else {
      return false;
    }
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
    }, 3000 + music.bpm[0]);
  },
};

var score = {
  increaseScore(tile) {
    var hasSync = utilities.classCheck(tile, 'lit--green');
    if (hasSync) {
      dynamic.score += 3;
      score.trackSyncStreak(tile);
    } else {
      dynamic.score++;
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
    }
  }
};
var events = {
  setEvents() {
    elements.tiles.forEach((tile) => {
      tile.addEventListener('click', function () {
        userAction.checkForColor(tile);
      });
    });
    elements.playButton.addEventListener('click', function () {
      animations.startCountdown();
      //init.run();
    });
  }
};
var init = {
  run() {
    var currentNumber = gamePlay.getCurrentTile();
    var randomNumber = utilities.createRandomNumber(elements.tiles.length, 0, currentNumber);
    gamePlay.resetBeatCount();
    gamePlay.resetSyncCounts();
    utilities.classRemove(elements.tiles, 'lit--white', 'lit--green');
    var beatOrSync = gamePlay.beatOrSync();
    beatOrSync ? animations.beat(randomNumber) : animations.sync(randomNumber);
  },
};

// On page load
try {
  events.setEvents();
} catch (ev) {
  console.log('error occured: ' + ev);
}
