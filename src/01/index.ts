import { Solver } from "../run";

const TARGET = 2020;

export const part1: Solver = (lines) => {
  const numbers = lines.map(Number);

  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    for (let h = i + 1; h < numbers.length; h++) {
      const m = numbers[h];
      if (n + m === TARGET) {
        return String(n * m);
      }
    }
  }
  return "";
};

export const part2: Solver = (lines) => {
  const numbers = lines.map(Number);

  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    for (let h = i + 1; h < numbers.length; h++) {
      const m = numbers[h];
      for (let j = h + 1; j < numbers.length; j++) {
        const o = numbers[j];

        if (n + m + o === TARGET) {
          return String(n * m * o);
        }
      }
    }
  }
  return "";
};
