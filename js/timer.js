
var timer = {
  t: '',
  counter: 5,
  timer_is_on: 0,
  timedCount: function () {
    document.querySelector('.timer').innerHTML = timer.counter;
    // -- to count down, ++ to count up
    timer.counter--;
    timer.t = setTimeout(function () {
      timer.timedCount();
    }, 1000);
    // if timer hits 0
    if (timer.counter < 0) {
      timer.stopCount();
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
    timer.counter = 5;
    timer.timer_is_on = 0;
  }
};
