'use strict';

function DomElement(selector, height, width, bg, fontSize, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = position;
}

let elem = new DomElement ('.row', '100px', '100px', 'red', '12px', 'absolute'),
    row;

DomElement.prototype.createDomElem = function(text) {
    let newElem;

    if(this.selector[0] === '.') {
        newElem = document.createElement('div');
    } else if(this.selector[0] === '#') {
        newElem = document.createElement('p');
    }

    newElem.className = this.selector.substr(1);
    newElem.textContent = text;
    newElem.style.cssText = `
    height: ${this.height};
    width: ${this.width};
    background: ${this.bg};
    fontsize: ${this.fontSize};
    position: ${this.position};
    top: 100px;
    left: 500px;
    `;
    document.body.appendChild(newElem);
}; 

function shift(evt) {
  let posY = row.style.top.slice(0, row.style.top.length - 2),
      posX = row.style.left.slice(0, row.style.left.length - 2);
  if(evt.code == 'ArrowUp' && posY > 0) {
    posY = +posY - 10;
    row.style.top = posY + 'px';
  } else if(evt.code == 'ArrowRight') {
    posX = +posX + 10;
    row.style.left = posX + 'px';
  } else if(evt.code == 'ArrowDown') {
    posY = +posY + 10;
    row.style.top = posY + 'px';
  } else if(evt.code == 'ArrowLeft' && posX > 0) {
    posX = +posX - 10;
    row.style.left = posX + 'px';
  }
}

document.addEventListener("DOMContentLoaded", elem.createDomElem('Квадрат'));
document.addEventListener('keydown', shift);
row = document.querySelector('.row');