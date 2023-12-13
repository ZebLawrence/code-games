
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
