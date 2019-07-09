'use strict';

let books = document.querySelector('.books'),
    bookElems = document.querySelectorAll('.book'),
    body = document.body,
    bookLink4 = bookElems[4].querySelector('a'),
    adv = document.querySelector('.adv'),
    book2ChapterList = bookElems[0].querySelector('ul'),
    book2Chapters = book2ChapterList.querySelectorAll('li'),
    book5ChapterList = bookElems[5].querySelector('ul'),
    book5Chapters = book5ChapterList.querySelectorAll('li'),
    book6ChapterList = bookElems[2].querySelector('ul'),
    book6Chapters = book6ChapterList.querySelectorAll('li'),
    chapter8Book6 = document.createElement('li');

books.insertBefore(bookElems[1], bookElems[0]);
books.appendChild(bookElems[2]);
books.insertBefore(bookElems[4], bookElems[3]);
body.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');
bookLink4.textContent = 'Книга 3. this и Прототипы Объектов';
body.removeChild(adv);
chapter8Book6.textContent = 'Глава 8: За пределами ES6';
book2ChapterList.insertBefore(book2Chapters[2], book2Chapters[10]);
book2ChapterList.insertBefore(book2Chapters[6], book2Chapters[4]);
book2ChapterList.insertBefore(book2Chapters[8], book2Chapters[4]);
book5ChapterList.insertBefore(book5Chapters[5], book5Chapters[10]);
book5ChapterList.insertBefore(book5Chapters[8], book5Chapters[10]);
book5ChapterList.insertBefore(book5Chapters[2], book5Chapters[6]);
book5ChapterList.insertBefore(book5Chapters[9], book5Chapters[3]);
book6ChapterList.insertBefore(chapter8Book6, book6Chapters[9]);