export function score(rolls: number[]): number {
  let total = 0;
  let i = 0;

  for (let frame = 0; frame < 10; frame++) {
    const first = rolls[i] ?? 0;
    const second = rolls[i + 1] ?? 0;
    const third = rolls[i + 2] ?? 0;

    if (first === 10) {
      total += 10 + second + third;
      i += 1;
    } else if (first + second === 10) {
      total += 10 + third;
      i += 2;
    } else {
      total += first + second;
      i += 2;
    }
  }

  return total;
}