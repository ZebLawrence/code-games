
export const addNumbers = (numbers) => {
  return numbers.reduce((acc, number) => {
    return acc + number
  })
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
