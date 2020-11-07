function randomChoice(arr) {
  const randIdx = Math.floor(Math.random() * arr.length);
  return arr[randIdx];
}

export { randomChoice };
