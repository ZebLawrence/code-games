
export function memoize(func) {
  const stored = new Map();

  return (...args) => {
    const key = JSON.stringify(args);
    if (stored.has(key)) {
      return stored.get(key);
    }
    const result = func(...args);
    stored.set(key, result);
    return result;
  };
}

export const pivotTable = (table) => {
  const result = Array(table[0].length).fill('')
  for (const row of table) {
      [...row].forEach((char, i) => result[i] += char)
  }
  return result
}

export const rotateTable = (table) => {
  const result = []
  // console.log('result', result)
  for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
    const row = table[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      result[colIndex] = result[colIndex] || []
      result[colIndex].unshift(row[colIndex])
    }
  }

  // for (const row of table) {
  //     [...row].forEach((char, i) => {
  //       result[i].push(char)
  //       console.log('char', char)
  //     })
  // }
  return result
}
