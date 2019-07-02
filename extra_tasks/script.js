'use strict';

let lang = prompt('Укажите язык "ru" или "en"');
if (lang == 'ru') {
    console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
} else if (lang == 'en') {
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
} else {
    console.log('Что-то пошло не так');
}

switch(lang) {
    case 'ru':
        console.log('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
        break;
    case 'en':
            console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
            break;
    default:
        console.log('Что-то пошло не');
}

let weekDays = [
  ['ru'],
  ['Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье'],
  ['en'],
  ['Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday']
];
 
let sumIndex = 0;
for (let i = 0; i < weekDays.length; i++) {
  sumIndex += weekDays[i].indexOf(lang) * -(i + 1);
}

let reverseSumIndex = (function nSum(n) {
  return (n != 1) ? n + nSum(n - 1) : 1;
}(weekDays.length))

let indexKey = reverseSumIndex - sumIndex;
alert(weekDays[indexKey]);



let namePerson = prompt('Введите имя');
let position = (namePerson == 'Артем') ? 'директор' :
  (namePerson == 'Максим') ? 'преподаватель' : 'студент';

  console.log(position);