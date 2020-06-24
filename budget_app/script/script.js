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
        this.income = [];
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = [];
        this.expensesMonth = 0;  
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = '';
        this.selectedIndex = 0;
        this.period = 1;
        this.goal = '';
        this.accumulation = 0;
        this.months = 0;
        this.isLoad = false;
        this.disabled = true;
    }
    start() {
        this.budget = +salaryAmount.value;
        this.isLoad = true;

        this.disableInputs();
        this.getExpenses();
        this.getIncome();
        this.getInfoDeposit();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAdd(...additionalExpensesItem.value.split(','), ...additionalIncomeItems);
        this.getBudget();

        this.showResult();
        this.save();
    }
    reset() { //доп функция 9 урок
        let inputs = document.querySelectorAll('input, button.btn_plus');

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
        depositPercent.style.display = `none`;
        depositAmount.value = '';
        depositCheck.checked = false;
        periodAmount.textContent = 1;
        periodSelect.value = 1;

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.addExpenses = [];
        this.addIncome = [];
        this.expenses = [];
        this.income = [];
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = '';
        this.selectedIndex = 0;
        this.period = 1;
        this.goal = '';
        this.accumulation = 0;
        this.months = 0;
        this.isLoad = false;
        this.disabled = false;
        
        localStorage.removeItem('inf');
        for(const key in this) {this.deleteCookie(key);}
    }
    showResult() {
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
            incomePeriodValue.value = this.calcPeriod();
        });
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        this.addExpenses = this.addExpenses.map((item) => {
            return item.trim();
        });
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ').replace(/^, |, $/g, '');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
    }
    addBlock() {
        let cloneItem = this.previousElementSibling.cloneNode(true),
            cloneItemInputs = cloneItem.querySelectorAll('input'),
            addItems;
        
        cloneItemInputs.forEach((item) => {
            item.value = '';
        });

        this.insertAdjacentElement('beforeBegin', cloneItem);
        if(this.classList.contains('expenses_add')) {
            addItems = document.querySelectorAll('.expenses-items');
        } else {addItems = document.querySelectorAll('.income-items');}

        if(addItems.length === 3) {
            this.style.display = 'none';
        }
        return cloneItem;
    }
    getExpenses() {
        document.querySelectorAll('.expenses-items').forEach((item, i) => {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            
            this.expenses[i] = {
                name: itemExpenses,
                value: cashExpenses
            };
        });
    }
    getIncome() {
        document.querySelectorAll('.income-items').forEach((item, i) => {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
            
            this.income[i] = {
                name: itemIncome,
                value: cashIncome
            };
        });
    }
    getAdd(...args) {
        args.forEach((item) => {
            if(item.value || item.value === '') {
                this.addIncome[[...additionalIncomeItems].indexOf(item)] = item.value;
            } else if(item && typeof item === 'string') {
                this.addExpenses = additionalExpensesItem.value.split(',');
            }
        });
    }
    getExpensesMonth() {
        this.expenses.forEach(obj => this.expensesMonth += +obj.value);
    }
    getIncomeMonth() {
        this.income.forEach(obj => this.incomeMonth += +obj.value);
    }
    getBudget() {
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12;
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
            btns = document.querySelectorAll('.btn_plus, #deposit-check, .period-select'),
            inputsTypeText = [];
        
        btns.forEach(btn => btn.setAttribute('disabled', ''));
        
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
            if (item.placeholder == 'Сумма' || item.placeholder == 'Процент') {
                item.addEventListener('keypress', (evt) => {
                    if((evt.charCode > 47 && evt.charCode < 58) || evt.charCode == 46) {
                        return;
                    } else {return evt.preventDefault();}
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
            item.addEventListener('input', () => this.save());
        });
    }
    eventsListeners() {//слушатели
        window.addEventListener('DOMContentLoaded', () => {
            if(salaryAmount.value == '' || salaryAmount.value == 0) {
                start.setAttribute('disabled', '');
            }
        });
        salaryAmount.addEventListener('keyup', () => {
            if(salaryAmount.value == '' || salaryAmount.value == 0) {
                start.setAttribute('disabled', '');
            } else {
                start.removeAttribute('disabled', '');
            }
        });

        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addBlock);
        expensesPlus.addEventListener('click', this.checkInputFunct.bind(this));
        incomePlus.addEventListener('click', this.addBlock);
        incomePlus.addEventListener('click', this.checkInputFunct.bind(this));
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
            this.save();
        });

        depositCheck.addEventListener('change', () => {
            this.check();
        });
        depositBank.addEventListener('change', evt => {
            let selectIndex = evt.target.options[evt.target.selectedIndex].value;
            if(selectIndex === 'other') {
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = selectIndex;
            }
            this.selectedIndex = evt.target.selectedIndex;
            this.save();
        });
    }
    check(){
        if(depositCheck.checked) {
            depositBank.style.display = `inline-block`;
            depositAmount.style.display = `inline-block`;
            this.deposit = true;
        } else {
            depositBank.style.display = `none`;
            depositAmount.style.display = `none`;
            depositAmount.value = '';
            depositPercent.style.display = 'none';
            this.deposit = false;
        }
        this.save();
    }
    getCookie(name) {
        const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    setCookie(name, value, days) {
        let expires;
        if(days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {expires = "";}
        
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    deleteCookie(name) {
        this.setCookie(name, '', -1);
    }
    checkCookie(){ //проверка на соответствие куки и ls
        const ls = JSON.parse(localStorage.getItem('inf'));
		
		if(ls) {
			for(const key in ls){
				if(this.getCookie(key) !== JSON.stringify(ls[key])) {
					this.reset();
					window.location.reload();
					return false;
				}
			}
			
			return true;
		}
		
        return false;
    }
    save(){
        if(this.checkCookie()){
            this.budget = salaryAmount.value;
            this.goal = targetAmount.value;
            this.period = periodSelect.value;
            this.accumulation = incomePeriodValue.value;
            this.months = targetMonthValue.value;
            this.getExpenses();
            this.getIncome();
            this.getInfoDeposit();
            this.getAdd(...additionalExpensesItem.value.split(','), ...additionalIncomeItems);

            localStorage.setItem('inf', JSON.stringify({...this}));
            for(const key in this) {this.setCookie(key, JSON.stringify(this[key]), 24*365*10);}
        }
    }
    load(){
        const props = JSON.parse(localStorage.getItem('inf') || null); // Получение данных из из ls
        if(props && this.checkCookie()){ // Если cookie и ls одинаковы и props !== null, то загружаем данные из ls
            for(const key in props) {this[key] = props[key];} //Перезаписываем свойства this на свойства из объекта в ls
            
            if(!this.disabled) {start.removeAttribute('disabled');}
            else {start.setAttribute('disabled', '');}
            
            salaryAmount.value = this.budget; // Выполняем подстановку значений в html
            for(let i = 0; i < this.income.length; i++){
                let item;

                if(i === 0) {item = incomeItems[0];}
                else {item = this.addBlock.call(incomePlus);}

                item.querySelector('.income-title').value = this.income[i].name;
                item.querySelector('.income-amount').value = this.income[i].value;
            }
            this.addIncome.forEach((value, i) => additionalIncomeItems[i].value = value);
            
            for(let i = 0; i < this.expenses.length; i++){
                let item;

                if(i === 0) {item = expensesItems[0];}
                else {item = this.addBlock.call(expensesPlus);}

                item.querySelector('.expenses-title').value = this.expenses[i].name;
                item.querySelector('.expenses-amount').value = this.expenses[i].value;
            }
            additionalExpensesItem.value = this.addExpenses.join(',');
            targetAmount.value = this.goal;
            periodSelect.value = this.period;
            periodAmount.textContent = this.period;
            
            if(this.deposit) { 
                depositAmount.value = this.moneyDeposit;
                depositPercent.value = this.percentDeposit;
                depositCheck.checked = true;
                this.check();
                depositBank.value = depositBank.options[this.selectedIndex].value;
                
                if(depositBank.value === 'other') {depositPercent.style.display = 'inline-block';}
            }
            if(this.isLoad) {
                this.disableInputs();
                this.showResult();
                this.save();
            }
        }
    }
}

let appData = new AppData();
appData.eventsListeners();
appData.load();
appData.checkInputFunct();
