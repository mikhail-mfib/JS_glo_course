'use strict';

window.addEventListener('DOMContentLoaded', function() {
    //timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        // добавление нуля к числам < 10
        function addZero(num) {
            if(num.toString().length < 2) {
                return '0' + num;
            } 
            return num.toString();
        }
        
        function getTimeRemainig() {
            let dateStop = new Date().setHours(...deadline),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = addZero(Math.floor(timeRemaining % 60)),
                minutes = addZero(Math.floor((timeRemaining / 60) % 60)),
                hours = addZero(Math.floor(timeRemaining / 60 / 60) % 24);

                return {timeRemaining, hours, minutes, seconds};

        }
        
        function updateClock() {
            let timer = getTimeRemainig();
            if(timer.timeRemaining <= 0) {
                let timeLeft = '<span style="color:red">00</span>';
                timerHours.innerHTML = timeLeft;
                timerMinutes.innerHTML = timeLeft;
                timerSeconds.innerHTML = timeLeft;
            } else {
                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;
            }
    
        }
        
        updateClock();

    }

    setInterval(countTimer, 1000, [24, 0, 0]);
});