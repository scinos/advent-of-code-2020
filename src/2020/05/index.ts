import { Solver } from "../../runner";

const reduce = (input: string, lower: string): number => {
  const size = 2 ** input.length;
  let upperBound = size;

  for (let i = 0; i < input.length; i++) {
    const dir = input[i];

    if (dir === lower) {
      upperBound -= size >> (i + 1);
    }
  }

  return upperBound - 1;
};

const getRow = (input: string): number => reduce(input.substr(0, 7), "F");

const getSeat = (input: string): number => reduce(input.substr(7, 3), "L");

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
  throw new Error("Seat not found!");
};
