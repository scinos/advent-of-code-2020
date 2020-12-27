import { Solver } from "../../runner";

const hasSum = (numbers: number[], target: number) => {
  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    if (n >= target) continue;

    for (let h = i + 1; h < numbers.length; h++) {
      const m = numbers[h];
      if (n + m === target) {
        return true;
      }
    }
  }
  return false;
};

export const findGap = (input: number[], preamble: number): number => {
  const numbers = input.map(Number);

  for (let i = preamble; i < numbers.length; i++) {
    const num = numbers[i];
    if (!hasSum(numbers.slice(i - preamble, i), num)) return num;
  }
  throw new Error("Not found");
};

export const findMinMax = (
  numbers: number[],
  target: number
): [number, number] => {
  let sum = numbers[0];
  let a = 0;
  let b = 0;

  while (sum !== target) {
    if (sum < target) {
      sum += numbers[++b];
    } else {
      sum -= numbers[a++];
    }
  }
  const slice = numbers.slice(a, b);
  return [Math.min(...slice), Math.max(...slice)];
};

export const part1: Solver = (input) => {
  const numbers = input.map(Number);
  return String(findGap(numbers, 25));
};

export const part2: Solver = (input) => {
  const numbers = input.map(Number);
  const target = findGap(numbers, 25);
  const [min, max] = findMinMax(numbers, target);
  return String(min + max);
};
