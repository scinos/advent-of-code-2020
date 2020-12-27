import { Solver } from "../../runner";

const countTrees = (map: string[][], right: number, down: number) => {
  let x = right;
  let y = down;
  let trees = 0;

  do {
    const row = map[y];
    if (row[x % row.length] === "#") trees++;
    y += down;
    x += right;
  } while (y < map.length);

  return trees;
};

const buildMap = (lines: string[]): string[][] => {
  return lines.map((l) => l.split(""));
};

export const part1: Solver = (lines) => {
  const map = buildMap(lines);
  const trees = countTrees(map, 3, 1);
  return String(trees);
};

export const part2: Solver = (lines) => {
  const map = buildMap(lines);
  const trees =
    countTrees(map, 1, 1) *
    countTrees(map, 3, 1) *
    countTrees(map, 5, 1) *
    countTrees(map, 7, 1) *
    countTrees(map, 1, 2);

  return String(trees);
};
