'use strict';

let money = +prompt('Введите ваш доход?');
let income = 'ценные бумаги';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

console.log(addExpenses.split(', '));

let deposit = confirm('Есть ли у вас депозит в банке?');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

let strictExpensesName1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let strictExpensesSum1 = +prompt('Во сколько это обойдется?');
let strictExpensesName2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let strictExpensesSum2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - strictExpensesSum1 - strictExpensesSum2;
let mission = 10000000;
let period = 11;
let budgetDay = budgetMonth / 30;

console.log('budgetMonth: ', budgetMonth);
console.log(`Цель в ${mission} будет достигнута через ${Math.ceil(mission / budgetMonth)}`);
console.log('budgetDay: ', Math.floor(budgetDay));

if (budgetDay >= 800) {
    console.log('Высокий уровень дохода');
} else if (budgetDay >= 300) {
    console.log('Средний уровень дохода');
} else if (budgetDay >= 0) {
    console.log('Низкий уровень дохода');
} else {
    console.log('Что-то пошло не так');
}
