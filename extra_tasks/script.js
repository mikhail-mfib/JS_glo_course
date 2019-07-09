'use strict';
// Задание 1
let currentDate = new Date(),
    options = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    },
    dateFormat = currentDate.toLocaleDateString('ru-RU', options),
    timeFormat = currentDate.toLocaleTimeString('ru-RU');

document.body.setAttribute('style', 'color: red; font-weight: bold');
document.body.textContent = `${timeFormat} ${dateFormat}`;

//Задание 2
function formatDate(date) {
  let dateList = date.split('.'),
      someDate = new Date(dateList[2], dateList[1] - 1, dateList[0]);
  return someDate.toLocaleDateString();
}
console.log(formatDate('1.6.2018'));