'use strict';

function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

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
    `;
    document.body.appendChild(newElem);
}; 

let elem = new DomElement ('.row', '25px', '350px', 'red', '12px');
elem.createDomElem('Элемент, созданный на основе класса DomElement');

