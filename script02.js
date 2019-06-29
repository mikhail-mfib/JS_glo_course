let num = 266219;
let numToString = num.toString();
let numDigitMultiplication = Number(numToString[0]) * Number(numToString[1]) * Number(numToString[2]) * Number(numToString[3]) * Number(numToString[4]) * Number(numToString[5])

console.log(numDigitMultiplication);
console.log((numDigitMultiplication ** 3).toString().slice(0, 2));