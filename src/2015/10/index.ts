import type { Solver } from "../../runner";

export const sequence = (seed: string): string => {
  let result = "";
  let currentChar = seed[0];
  let currentLength = 0;

  for (let i = 0, len = seed.length; i <= len; i++) {
    if (currentChar === seed[i]) {
      currentLength++;
      continue;
    }
    result += currentLength + currentChar!;
    currentLength = 1;
    currentChar = seed[i];
  }
  return result;
};

export const part1: Solver = (input) => {
  let seed = input[0];
  for (let i = 0; i < 40; i++) {
    seed = sequence(seed);
  }
  return String(seed.length);
};

export const part2: Solver = (input) => {
  let seed = input[0];
  for (let i = 0; i < 50; i++) {
    seed = sequence(seed);
  }
  return String(seed.length);
};
