
/*
BUGS!


after syncFlash runs there is one flash with no color and then it goes to beatflash or there is a 1 beat delay in going back to beatflash

scores flash up and leave too fast

need to look at timecode properties to see if there is a trigger when play() executes and what other properties exist to help w/
flashing on the beat

IDEAS
keep track of how many syncflash length is and how many of syncflashes were hit and as you hit more in a row
do some cool biggering animation and at the last one do something awesome like flash the screen or something
and add a bonus of 50 or 100 points or something
*/

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
var dynamic = {
  score: 0,
  streak: 0,
  syncLength: 0,
  startSync: 0,
  syncCount: 0,
  beatCount: 0,
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

var utilities = {
  checkForMatch(currentNumber, randomNumber) {
    if (currentNumber === randomNumber) {
      randomNumber = utilities.createRandomNumber(elements.tiles.length, 0);
      utilities.checkForMatch(currentNumber, randomNumber);
    } else {
      animations.beatOrSync(randomNumber);
    }
  },
  classCheck(element, className) {
    //element.classList.contains(className) ? true : false;
    if (element.classList.contains(className) === true) {
      return true;
    } else {
      return false;
    }
  },
  classClear(elements) {
    elements.forEach((element) => {
      element.classList = element.classList[0];
    });
  },
  classSwap(element, className) {
    // find out how to use spread so we can pass both classes to classSwap as ...className
    return element.classList.toggle(className);
  },
  classSwapDelay(element, className, speed) {
    element.classList.add(className);
    setTimeout(() => {
      element.classList.remove(className);
    }, speed);
  },
  createRandomNumber(max, min, v, currentNum) {
    if (v) {
      return v = Math.floor(Math.random() * (max - min) + min);
    } else {
      return Math.floor(Math.random() * (max - min) + min);
    }
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
}

var animations = {
  beatOrSync(randomNumber) {
    if (dynamic.beatCount < dynamic.startSync || dynamic.beatCount === 0) {
      setTimeout(() => {
        animations.beatFlash(randomNumber);
      }, music.bpm[1]);
    } else {
      setTimeout(() => {
        animations.syncFlash(randomNumber);
      }, music.bpm[1] * 0.75);
    }
  },
  beatFlash(randomTile) {
    utilities.classClear(elements.tiles);
    gamePlay.checkSyncCount();
    dynamic.beatCount++;
    // find out how to use spread so we can pass both classes to classSwap as ...className
    utilities.classSwap(elements.tiles[randomTile], 'lit--blue');
    utilities.classSwap(elements.tiles[randomTile], 'beatFlash');
    console.log(elements.tiles[randomTile]);
    gamePlay.setNumbers('lit--blue');
  },
  changeBackground(tile) {
    var color;
    tile.classList.contains('beatFlash') ? color = 'blue' : color = 'purple';
    utilities.classSwapDelay(tile, `changeColor--${color}`, 250);
    console.log(tile);
  },
  startCountdown() {
    setTimeout(() => {
      utilities.classSwap(elements.wrapTimer, 'hidden');
      timer.timedCount();
      music.audio.play();
    }, 1100);
    setTimeout(() => {
      utilities.classSwap(elements.wrapTimer, 'hidden');
      gamePlay.setNumbers();
    }, 3000 + music.bpm[0]);
  },
  syncFlash(randomTile) {
    utilities.classClear(elements.tiles);
    if (dynamic.syncCount < dynamic.syncLength) {
      dynamic.syncCount++;
      utilities.classSwap(elements.tiles[randomTile], 'lit--purple');
      utilities.classSwap(elements.tiles[randomTile], 'syncFlash');
      console.log(elements.tiles[randomTile]);
    } else {
      gamePlay.resetCounts();
    }
    gamePlay.setNumbers('lit--purple');
  },
}

var gamePlay = {
  checkForColor(tile) {
    var check = utilities.classCheck(tile, 'lit--blue') || utilities.classCheck(tile, 'lit--purple');
    if (check) {
      gamePlay.increaseScore(tile);
      gamePlay.streakBonus(tile);
      gamePlay.updateScoreElements();
      animations.changeBackground(tile);
      utilities.classSwapDelay(tile.firstElementChild, 'animateScore', 250);
    } else {
      dynamic.streak = 0;
      // use rightAnswer to add negative animation on the tap?
    }
  },
  increaseScore(tile) {
    var hasSync = utilities.classCheck(tile, 'syncFlash');
    hasSync ? dynamic.score = dynamic.score + 3 : dynamic.score++;
    dynamic.streak++;
  },
  resetCounts() {
    dynamic.syncCount = 0;
    dynamic.beatCount = 0;
  },
  checkSyncCount() {
    if (dynamic.beatCount === 0) {
      dynamic.startSync = utilities.createRandomNumber(20, 10, dynamic.startSync);
      dynamic.syncLength = utilities.createRandomNumber(12, 3, dynamic.syncLength);
    }
  },
  setNumbers(className) {
    var currentElement = utilities.getIndexByClass(elements.tiles, className);
    var randomNumber = utilities.createRandomNumber(elements.tiles.length, 0);
    utilities.checkForMatch(currentElement, randomNumber);
  },
  streakBonus(tile) {
    if (dynamic.streak % 10 === 0) {
      dynamic.score += dynamic.streak;
      utilities.classSwapDelay(tile.firstElementChild.nextElementSibling, 'animateScore', 250);
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
}
// Tile click event
elements.tiles.forEach((tile) => {
  tile.addEventListener('click', function () {
    gamePlay.checkForColor(tile);
  });
});
// Play button event
elements.playButton.addEventListener('click', function () {
  animations.startCountdown();
});
music.setBPM('synth1'); // page load, load figaro by default
//gamePlay.setNumbers();
