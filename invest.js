
import numeral from 'numeral';
import chalk from 'chalk';

const months = 12;
const savingYears = 15;
const retireYears = 10;
const deposit = 8000;
const percent = 0.08;

let total = 0;

console.log('Monthly Investment Deposit:', deposit);
console.log('Yearly Growth Percent:', percent);
console.log('Investing Years:', savingYears, 'Retire Years:', retireYears);

for (let i = 0; i < savingYears; i++) {

  for (let i = 0; i < months; i++) {
    total += deposit;
  }
  const interest = total * percent;
  total += interest;
  console.log('\nNew Interest:               ', chalk.green(numeral(interest).format('$0,0')));
  console.log('Saving Year:', i + 1, 'Total:    ', chalk.greenBright(numeral(total).format('$0,0')));
}

console.log('-------------- Stop Saving --------------');

for (let i = 0; i < retireYears; i++) {
  const interest = total * percent;
  total += interest;
  console.log('\nNew Interest:               ', chalk.green(numeral(interest).format('$0,0')));
  console.log('Retire Year:', i + 1, 'Total:    ', chalk.greenBright(numeral(total).format('$0,0')));
}

console.log('After: ', savingYears + retireYears, 'years. Total:  ', chalk.greenBright(numeral(total).format('$0,0')));

// 8000 
// 16000