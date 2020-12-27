import { readFileSync } from "fs";
import { join } from "path";
import { measure } from "./lib/measure";

import * as solvers2020 from "./2020";

export type Solver = (lines: string[]) => string;
export interface Arguments {
  day: number;
  input: string;
}

const solvers: {
  day: number;
  year: number;
  part1: Solver;
  part2: Solver;
}[] = [
  ...Object.entries(solvers2020).map(([day, solver]) => ({
    part1: solver.part1,
    part2: solver.part2,
    day,
    year: 2020,
  })),
].map((solver) => ({
  year: solver.year,
  day: Number(solver.day.match(/^day(?<day>\d+)$/).groups.day),
  part1: solver.part1,
  part2: solver.part2,
}));

// eslint-disable-next-line import/prefer-default-export
export function* run(args: Arguments): Generator<string, void, void> {
  const filteredSolvers = args.day
    ? solvers.filter(({ day }) => day === args.day)
    : solvers;

  const inputs = filteredSolvers.map(({ day, year }) => {
    try {
      const file = `${day.toString().padStart(2, "0")}.txt`;
      const dir = year.toString();
      const result = readFileSync(join(args.input, dir, file), "utf-8");
      return result.split("\n");
    } catch {
      return [""];
    }
  });

  let durationAll = 0;
  const printTime = (time: number): string =>
    `[${time.toFixed(3).padStart(12)}ms]`;
  const printDay = (day: number): string => day.toString().padStart(2, "0");

  for (let i = 0; i < filteredSolvers.length; i++) {
    const { day, part1, part2 } = filteredSolvers[i];
    const input = inputs[i];

    try {
      const { duration: dur1, result: res1 } = measure(() => part1(input));
      yield `2020 Day ${printDay(day)} Part 1: ${printTime(dur1)} ${res1} `;

      const { duration: dur2, result: res2 } = measure(() => part2(input));
      yield `2020 Day ${printDay(day)} Part 2: ${printTime(dur2)} ${res2} `;

      durationAll += dur1 + dur2;
    } catch {}
  }

  yield `Total time:         ${printTime(durationAll)}`;
}
