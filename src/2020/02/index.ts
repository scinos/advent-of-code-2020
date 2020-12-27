import { Solver } from "../../runner";

const re = /^(?<min>\d+)-(?<max>\d+) (?<character>.): (?<pass>.*)$/;

export const part1: Solver = (lines) => {
  let valid = 0;

  for (const line of lines) {
    const { min, max, character, pass } = line.match(re)?.groups ?? {};
    const repeats = pass.split("").filter((c) => c === character).length;
    if (repeats <= Number(max) && repeats >= Number(min)) valid++;
  }

  return String(valid);
};

export const part2: Solver = (lines) => {
  let valid = 0;

  for (const line of lines) {
    const { min, max, character, pass } = line.match(re)?.groups ?? {};
    const c1 = pass[Number(min) - 1];
    const c2 = pass[Number(max) - 1];

    if (c1 === character && c2 !== character) valid++;
    else if (c1 !== character && c2 === character) valid++;
  }

  return String(valid);
};
