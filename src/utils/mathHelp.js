
export const addNumbers = (numbers) => {
  return numbers.reduce((acc, number) => {
    return acc + number
  })
}

export const addNumbersDeep = (...numbers) => {
  let total = 0;
  for (const num of numbers) {
    if (typeof num === 'number') {
      total += num;
    } else {
      for (const n of num) {
        total += n;
      }
    }
  }
  return total;
}

export function toInt(x) {
  return parseInt(x, 10);
}

export function toNumber(x) {
  return Number(x);
}

export const multiplyNumbers = (numbers) => {
  return numbers.reduce((acc, number) => {
    return acc * number
  })
}

export const greatestCommonDivisor = (a, b) => {
  return !b ? a : greatestCommonDivisor(b, a % b);
}

export const lowestCommonMultiple = (a, b) => {
  return (a * b) / greatestCommonDivisor(a, b);   
}

export const lowestCommonMultipleList = list => {
  let multiple = 1;
  list.forEach(n => {
    multiple = lowestCommonMultiple(multiple, n);
  });
  return multiple;
}
