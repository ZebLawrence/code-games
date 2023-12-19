
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

export const calcPolygonArea = coords => {
  var total = 0;

  for (var i = 0, l = coords.length; i < l; i++) {
    var addX = coords[i][1];
    var addY = coords[i == coords.length - 1 ? 0 : i + 1][0];
    var subX = coords[i == coords.length - 1 ? 0 : i + 1][1];
    var subY = coords[i][0];

    total += (addX * addY * 0.5);
    total -= (subX * subY * 0.5);
  }

  return Math.abs(total);
}
