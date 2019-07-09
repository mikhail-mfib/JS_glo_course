'use strict';

let calcBtn = document.getElementById('start'),
    incomeAddBtn = document.getElementsByTagName('button')[0],
    expensesAddBtn = document.getElementsByTagName('button')[1],
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
    targetAmount = document.querySelector('.target-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositCheckInput = document.querySelector('.deposit-check'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    incomeAmount = document.querySelector('.income-amount'),
    incomeTitle = document.querySelector('.income-title'),
    salaryAmount = document.querySelector('.salary-amount');

    
    console.log(salaryAmount);