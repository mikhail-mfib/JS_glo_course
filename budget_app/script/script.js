'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    accumulatedMonthValue = document.querySelector('.accumulated_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    targetAmount = document.querySelector('.target-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositCheckInput = document.querySelector('.deposit-check'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items');

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,  
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        if(salaryAmount.value === '') {
            alert('Ошибка, поле "месячный доход" должно быть заполнено');
            return;
        }
        appData.budget = +salaryAmount.value;

        appData.disableStart();
        appData.getExpenses();
        appData.getIncome();
        // appData.getInfoDeposit();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    disableStart: function() { //доп функция
        let inputs = document.querySelectorAll('input'),
            inputsTypeText = [];

        inputs.forEach(function(item) {
            if (item.getAttribute('type') == 'text') {
                inputsTypeText.push(item);
            }
        });

        inputsTypeText.forEach(function(item) {
            item.setAttribute('disabled', '');
        });
        start.setAttribute('style', 'display: none');
        cancel.setAttribute('style', 'display: inline-block');
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        let expensesItemInputs = cloneExpensesItem.querySelectorAll('input');
        expensesItemInputs.forEach(function(item){
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        let incomeItemInputs = cloneIncomeItem.querySelectorAll('input');
        incomeItemInputs.forEach(function(item) {
            item.value = '';
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            appData.income[itemIncome] = cashIncome;

            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if(item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItems.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    asking: function() {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }  
    },
    getIncomeMonth: function() {
        for (let key in appData.income) {
            appData.incomeMonth += appData.income[key];
        }  
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
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
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    },
    checkInputFunct: function() { //доп функция
        let allInputs = document.querySelectorAll('input');
        allInputs.forEach(function(item) {
            if (item.placeholder == 'Сумма') {
                item.addEventListener('keypress', function(evt) {
                    if(evt.charCode < 48 || evt.charCode > 57) {
                        return evt.preventDefault();
                    }
                });
            } else if (item.placeholder == 'Наименование') {
                item.addEventListener('keypress', function(evt) {
                    if((evt.charCode > 1039 && evt.charCode < 1104) || evt.charCode == 32 || evt.charCode == 44 || evt.charCode == 46) {
                        return;
                    } else {
                        return evt.preventDefault();
                    }
                });
            }
        });
    }
};

appData.checkInputFunct();
start.setAttribute('disabled', '');
salaryAmount.addEventListener('keyup', function() {
    if(salaryAmount.value == '') {
        start.setAttribute('disabled', '');
    } else {
        start.removeAttribute('disabled', '');
    }
});
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
expensesPlus.addEventListener('click', appData.checkInputFunct);
incomePlus.addEventListener('click', appData.addIncomeBlock);
incomePlus.addEventListener('click', appData.checkInputFunct);
periodSelect.addEventListener('change', function() {
    periodAmount.textContent = periodSelect.value;
});