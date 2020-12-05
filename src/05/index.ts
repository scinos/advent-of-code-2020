import { Solver } from "../run";

const reduce = (
  input: string,
  min: number,
  max: number,
  lower: string
): number => {
  let lowerBound = min;
  let upperBound = max;

  for (let i = 0; i < input.length; i++) {
    const dir = input[i];
    const size = upperBound - lowerBound + 1;

    if (dir === lower) {
      upperBound -= size / 2;
    } else {
      lowerBound += size / 2;
    }
  }

  return upperBound;
};

const getRow = (input: string): number =>
  reduce(input.substr(0, 7), 0, 127, "F");

const getSeat = (input: string): number =>
  reduce(input.substr(7, 3), 0, 7, "L");

export const part1: Solver = (input) => {
  const seats = input.map((line) => getRow(line) * 8 + getSeat(line));
  return String(Math.max(...seats));
};

export const part2: Solver = (input) => {
  const seats = input.map((line) => getRow(line) * 8 + getSeat(line));
  seats.sort((a, b) => a - b);
  for (let i = 0; i < seats.length; i++) {
    if (seats[i + 1] - seats[i] === 2) return String(seats[i] + 1);
  }
};
