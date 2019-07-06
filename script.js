'use strict';

let money,
    start = function() {
        do {
            money = +prompt('Введите ваш доход?', 1000000);
            console.log(money);
        } while (isNaN(money));
};
start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,  
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 10000000,
    period: 11,
    asking: function() {

        if(confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome = '';
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'фриланс');
            } while (itemIncome == '' || itemIncome == null);
            
            let cashIncome = 0;
            do {
                cashIncome = +prompt('Сколько в месяц вы на этом зарабатываеет?', 100000);
            } while (isNaN(cashIncome) || cashIncome == '' || cashIncome == null);
            
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'развлечения, недвижимость, машина');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            for(let i = 0; i < 2; i++) {
                let arrExpenses = [];
                let expenseCheck = [];

                arrExpenses[i] = prompt('Какие обязательные ежемесячные расходы у вас есть?',
                'питание');

                do {
                    expenseCheck[i] = +prompt('Во сколько это обойдется?', 30000);
                    appData.expenses[arrExpenses[i]] = expenseCheck[i];
                } while (isNaN(expenseCheck[i]) || expenseCheck[i] == '' || expenseCheck[i] == null);
            }
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }  
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 800) {
            return ('Высокий уровень дохода');
        } else if (appData.budgetDay >= 300 && appData.budgetDay < 800) {
            return ('Средний уровень дохода');
        } else if (appData.budgetDay >= 0 && appData.budgetDay < 300) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так');
        }
    },
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            do {
                appData.percentDeposit = +prompt('Какой годовой процент?', 7);
            } while (isNaN(appData.percentDeposit) || appData.percentDeposit == '' || appData.percentDeposit == null);
            
            do {
                appData.moneyDeposit = +prompt('Какая сумма заложена?', 600000);
            } while (isNaN(appData.moneyDeposit) || appData.moneyDeposit == '' || appData.moneyDeposit == null);
            
        }
    },
    calcSaveMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

//Задание на вывод строки
let expensesIncomeArr = appData.addExpenses;

for (let key in appData.income) {
    expensesIncomeArr.push(key);
}

expensesIncomeArr = expensesIncomeArr.map(function(item){
    return item.slice(0, 1).toUpperCase() + item.slice(1, item.length);
  });

expensesIncomeArr = expensesIncomeArr.join(', '); 

console.log('Возможные доходы и расходы за месяц: ' + expensesIncomeArr);


