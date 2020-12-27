import type { Solver } from "../../runner";

export const part1: Solver = (input) => {
  return String(
    input[0].split("").reduce((total, val) => total + (val === "(" ? 1 : -1), 0)
  );
};

export const part2: Solver = (input) => {
  let total = 0;

  for (let i = 0; i < input[0].length; i++) {
    const char = input[0][i];
    if (char === "(") total++;
    else total--;

    if (total === -1) return String(i + 1);
  }
  return "";
};
