
var timer = {
  t: '',
  counter: 3,
  timer_is_on: 0,
  timedCount: function () {
    document.querySelector('.timer').innerHTML = timer.counter;
    // -- to count down, ++ to count up
    timer.counter--;
    timer.t = setTimeout(function () {
      timer.timedCount();
    }, music.bpm[1]); // timer counts down at speed of song's bpm
    // if timer hits 0
    if (timer.counter < 1) {
      setTimeout(function () {
        timer.stopCount();
      }, 500);

    }
  },
  startCount: function () {
    if (!timer.timer_is_on) {
      timer.timer_is_on = 1;
      timer.timedCount();
    }
  },
  stopCount: function () {
    clearTimeout(timer.t);
    timer.counter = 3;
    timer.timer_is_on = 0;
  }
};
