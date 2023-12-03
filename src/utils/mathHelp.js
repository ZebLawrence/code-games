
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
