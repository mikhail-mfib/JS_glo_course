let money = 130000;
let income = 'ценные бумаги';
let addExpenses = 'Питание, Недвижимость, Обучение';
let deposit = true;
let mission = 10000000;
let period = 11;
let budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit);
console.log(income.length);
console.log(`Период ${period} месяцев. Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(`Доход за месяц: ${budgetDay}. Остаток: ${money % 30}`);