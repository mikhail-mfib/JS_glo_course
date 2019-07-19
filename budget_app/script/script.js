'use strict';

const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      depositCheck = document.querySelector('#deposit-check'),
      depositBank = document.querySelector('.deposit-bank'),
      depositPercent = document.querySelector('.deposit-percent'),
      depositAmount = document.querySelector('.deposit-amount'),
      additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
      additionalIncomeValue = document.querySelector('.additional_income-value'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      additionalExpensesValue = document.querySelector('.additional_expenses-value'),
      budgetDayValue = document.querySelector('.budget_day-value'),
      budgetMonthValue = document.querySelector('.budget_month-value'),
      expensesMonthValue = document.querySelector('.expenses_month-value'),
      accumulatedMonthValue = document.querySelector('.accumulated_month-value'),
      incomePeriodValue = document.querySelector('.income_period-value'),
      targetMonthValue = document.querySelector('.target_month-value'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      targetAmount = document.querySelector('.target-amount'),
      expensesTitle = document.querySelector('.expenses-title'),
      salaryAmount = document.querySelector('.salary-amount');
      
let   expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems = document.querySelectorAll('.income-items');

class AppData {
    constructor() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;  
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;    
    }
    start() {
        this.budget = +salaryAmount.value;

        this.disableInputs();
        this.getExpenses();
        this.getIncome();
        this.getInfoDeposit();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAdd(...additionalExpensesItem.value.split(','), ...additionalIncomeItems);
        this.getBudget();

        this.showResult();
    }
    reset() { //доп функция 9 урок
        let inputs = document.querySelectorAll('input');

        inputs.forEach((item) => {
            if (item.disabled) {
                item.removeAttribute('disabled', '');
                item.value = '';
            }
        });
        
        incomeItems = document.querySelectorAll('.income-items');
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
        }
        
        expensesItems = document.querySelectorAll('.expenses-items');
        for (let j = 1; j < expensesItems.length; j++) {
            expensesItems[j].remove();
        }

        expensesPlus.style.display = 'inline-block';
        incomePlus.style.display = 'inline-block';
        start.style.display = 'inline-block';
        start.setAttribute('disabled', '');
        cancel.style.display = 'none';
        depositBank.style.display = `none`;
        depositAmount.style.display = `none`;
        depositAmount.value = '';
        depositCheck.checked = false;
        periodAmount.textContent = 1;
        periodSelect.value = 1;

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.addExpenses = [];
        this.addIncome = [];
        this.expenses = {};
        this.income = {};
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.deposit = 'false';
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }
    showResult() {
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
            incomePeriodValue.value = this.calcPeriod();
        });
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
    }
    addBlock(evt) {
        let cloneItem = evt.target.previousElementSibling.cloneNode(true),
            cloneItemInputs = cloneItem.querySelectorAll('input'),
            addItems;
        
        cloneItemInputs.forEach((item) => {
            item.value = '';
        });

        evt.target.insertAdjacentElement('beforeBegin', cloneItem);
        if(evt.target.classList[1] == 'expenses_add') {
            addItems = document.querySelectorAll('.expenses-items');
        } else {addItems = document.querySelectorAll('.income-items');}

        if(addItems.length === 3) {
            evt.target.style.display = 'none';
        }
    }
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    getIncome() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
    }
    getAdd() {
        let args = [...arguments];

        args.forEach((item) => {
            if(item.value) {
                this.addIncome.push(item.value.trim());
            } else if(item && typeof item === 'string') {this.addExpenses.push(item);}
        });
    }
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }  
    }
    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }  
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getStatusIncome() {
        if (this.budgetDay >= 800) {
            return ('Высокий уровень дохода');
        } else if (this.budgetDay >= 300 && this.budgetDay < 800) {
            return ('Средний уровень дохода');
        } else if (this.budgetDay >= 0 && this.budgetDay < 300) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так');
        }
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getInfoDeposit() {
        if(this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    disableInputs() { //доп функция 8 урок
        let inputs = document.querySelectorAll('input'),
            inputsTypeText = [];

        inputs.forEach((item) => {
            if (item.getAttribute('type') == 'text') {
                inputsTypeText.push(item);
            }
        });

        inputsTypeText.forEach((item) => {
            item.setAttribute('disabled', '');
        });
        start.setAttribute('style', 'display: none');
        cancel.setAttribute('style', 'display: inline-block');
    }
    checkInputFunct() { //доп функция 8 урок
        let allInputs = document.querySelectorAll('input');
        allInputs.forEach((item) => {
            if (item.placeholder == 'Сумма') {
                item.addEventListener('keypress', (evt) => {
                    if(evt.charCode < 48 || evt.charCode > 57) {
                        return evt.preventDefault();
                    }
                });
            } else if (item.placeholder == 'Наименование' || item.placeholder == 'Наименования') {
                item.addEventListener('keypress', (evt) => {
                    if((evt.charCode > 1039 && evt.charCode < 1104) || evt.charCode == 32 || evt.charCode == 44 || evt.charCode == 46) {
                        return;
                    } else {
                        return evt.preventDefault();
                    }
                });
            }
        });
    }
    eventsListeners() {//11 задание слушатели
        this.checkInputFunct();
        start.setAttribute('disabled', '');
        salaryAmount.addEventListener('keyup', () => {
            if(salaryAmount.value == '') {
                start.setAttribute('disabled', '');
            } else {
                start.removeAttribute('disabled', '');
            }
        });

        let bindStart = this.start.bind(this),
            bindCancel = this.reset.bind(this);
        start.addEventListener('click', bindStart);
        cancel.addEventListener('click', bindCancel);
        expensesPlus.addEventListener('click', this.addBlock);
        expensesPlus.addEventListener('click', this.checkInputFunct);
        incomePlus.addEventListener('click', this.addBlock);
        incomePlus.addEventListener('click', this.checkInputFunct);
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        });

        depositCheck.addEventListener('change', () => {
            if(depositCheck.checked) {
                depositBank.style.display = `inline-block`;
                depositAmount.style.display = `inline-block`;
                this.deposit = 'true';
                depositBank.addEventListener('change', function() {
                    let selectIndex = this.options[this.selectedIndex].value;
                    if(selectIndex === 'other') {
                        depositPercent.style.display = 'inline-block';
                        depositPercent.value = '';
                    } else {
                        depositPercent.style.display = 'none';
                        depositPercent.value = selectIndex;
                    }
                });
            } else {
                depositBank.style.display = `none`;
                depositAmount.style.display = `none`;
                depositAmount.value = '';
                this.deposit = 'false';
            }
        });
    }
}

let appData = new AppData();
appData.eventsListeners();

