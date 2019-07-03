'use strict';

let money = +prompt('Введите ваш доход?');
let income = 'ценные бумаги';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');

let showTypeof = function(item) {
    console.log(item, typeof item);
};

showTypeof(money);
showTypeof(income);
showTypeof(deposit);

let strictExpensesName1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let strictExpensesSum1 = +prompt('Во сколько это обойдется?');
let strictExpensesName2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let strictExpensesSum2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - strictExpensesSum1 - strictExpensesSum2;
let mission = 10000000;
let period = 11;
let budgetDay = budgetMonth / 30;


function getStatusIncome() {
    if (budgetDay >= 800) {
        return ('Высокий уровень дохода');
    } else if (budgetDay >= 300) {
        return ('Средний уровень дохода');
    } else if (budgetDay >= 0) {
        return ('Низкий уровень дохода');
    } else {
        return ('Что-то пошло не так');
    }
}

console.log('getStatusIncome: ', getStatusIncome());

//ДЗ по 4 уроку
//задание 1а
let getExpensesMonth = function() {
    return `Cумма всех расходов за месяц: ${strictExpensesSum1 + strictExpensesSum2}`;
}
console.log(getExpensesMonth());
//задание 1b
function getAccumulatedMonth() {
    return money - strictExpensesSum1 - strictExpensesSum2;
}

let accumulatedMonth = getAccumulatedMonth();

//задание 1с
let getTargetMonth = function() {
    return mission / accumulatedMonth;
}
console.log('За какой период будет достигнута цель: ' + getTargetMonth());

//Задание 2b
console.log('Накопления за период: ' + accumulatedMonth);
//Задание 2c
console.log('Cрок достижения цели в месяцах: ' + Math.floor(getTargetMonth()));