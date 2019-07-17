'use strict';

let square =  document.querySelector('.square'),
    startStop = document.querySelector('.startStop'),
    reset = document.querySelector('.reset'),
    count = 0,
    animation = true,
    stepInterval;

function rightStep() {
  stepInterval = requestAnimationFrame(rightStep);
  count++;
  square.style.left = count + 'px';
}

function resetAnimation() {
  square.style.left = '0px';
  count = 0;
}

startStop.addEventListener('click', function() {
  if(animation) {
    stepInterval = requestAnimationFrame(rightStep);
    animation = false;
  } else {
    animation = true;
    cancelAnimationFrame(stepInterval);
  }
});

reset.addEventListener('click', resetAnimation);
