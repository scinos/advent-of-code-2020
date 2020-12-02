import { promises as fs } from "fs";

// Explicit imports for easier static analysis
import * as solverDay01 from "./01";
import * as solverDay02 from "./02";

const solvers = {
  "01": { "1": solverDay01.part1, "2": solverDay01.part2 },
  "02": { "1": solverDay02.part1, "2": solverDay02.part2 },
};

export type Day = "01" | "02";
export type Part = "1" | "2";

interface Arguments {
  day: Day;
  part: Part;
}

export type Solver = (lines: string[]) => string;

export const run = async (args: Arguments): Promise<string> => {
  const { day, part } = args;
  const solver = solvers[day][part];
  const input = await fs.readFile(`./inputs/${day}.txt`, "utf-8");
  const lines = input.split("\n");
  return solver(lines);
};
