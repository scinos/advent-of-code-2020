import { readFileSync } from "fs";
import { join } from "path";

// Explicit imports for easier static analysis
import * as solverDay01 from "./01";
import * as solverDay02 from "./02";
import * as solverDay03 from "./03";
import * as solverDay04 from "./04";
import * as solverDay05 from "./05";
import * as solverDay06 from "./06";
import * as solverDay07 from "./07";
import * as solverDay08 from "./08";
import * as solverDay09 from "./09";
import * as solverDay10 from "./10";
import * as solverDay11 from "./11";
import * as solverDay12 from "./12";
import * as solverDay13 from "./13";
import * as solverDay14 from "./14";
import * as solverDay15 from "./15";
import * as solverDay16 from "./16";
import * as solverDay17 from "./17";
import * as solverDay18 from "./18";
import * as solverDay19 from "./19";
import * as solverDay20 from "./20";
import * as solverDay21 from "./21";
import * as solverDay22 from "./22";
import * as solverDay23 from "./23";
import * as solverDay24 from "./24";
import * as solverDay25 from "./25";

export type Solver = (lines: string[]) => string;
export interface Arguments {
  day: number;
  input: string;
}

const solvers: { day: number; part1: Solver; part2: Solver }[] = [
  { day: 1, part1: solverDay01.part1, part2: solverDay01.part2 },
  { day: 2, part1: solverDay02.part1, part2: solverDay02.part2 },
  { day: 3, part1: solverDay03.part1, part2: solverDay03.part2 },
  { day: 4, part1: solverDay04.part1, part2: solverDay04.part2 },
  { day: 5, part1: solverDay05.part1, part2: solverDay05.part2 },
  { day: 6, part1: solverDay06.part1, part2: solverDay06.part2 },
  { day: 7, part1: solverDay07.part1, part2: solverDay07.part2 },
  { day: 8, part1: solverDay08.part1, part2: solverDay08.part2 },
  { day: 9, part1: solverDay09.part1, part2: solverDay09.part2 },
  { day: 10, part1: solverDay10.part1, part2: solverDay10.part2 },
  { day: 11, part1: solverDay11.part1, part2: solverDay11.part2 },
  { day: 12, part1: solverDay12.part1, part2: solverDay12.part2 },
  { day: 13, part1: solverDay13.part1, part2: solverDay13.part2 },
  { day: 14, part1: solverDay14.part1, part2: solverDay14.part2 },
  { day: 15, part1: solverDay15.part1, part2: solverDay15.part2 },
  { day: 16, part1: solverDay16.part1, part2: solverDay16.part2 },
  { day: 17, part1: solverDay17.part1, part2: solverDay17.part2 },
  { day: 18, part1: solverDay18.part1, part2: solverDay18.part2 },
  { day: 19, part1: solverDay19.part1, part2: solverDay19.part2 },
  { day: 20, part1: solverDay20.part1, part2: solverDay20.part2 },
  { day: 21, part1: solverDay21.part1, part2: solverDay21.part2 },
  { day: 22, part1: solverDay22.part1, part2: solverDay22.part2 },
  { day: 23, part1: solverDay23.part1, part2: solverDay23.part2 },
  { day: 24, part1: solverDay24.part1, part2: solverDay24.part2 },
  { day: 25, part1: solverDay25.part1, part2: solverDay25.part2 },
];

const measure = (fn: () => string): { duration: number; result: string } => {
  const start = process.hrtime.bigint();
  const result = fn();
  const end = process.hrtime.bigint();
  return {
    duration: Number(end - start) / 1e6,
    result,
  };
};

export function* run(args: Arguments): Generator<string, void, void> {
  const filteredSolvers = args.day
    ? solvers.filter(({ day }) => day === args.day)
    : solvers;

  const inputs = filteredSolvers.map(({ day }) => {
    try {
      const file = `${day.toString().padStart(2, "0")}.txt`;
      const result = readFileSync(join(args.input, file), "utf-8");
      return result.split("\n");
    } catch {
      return [""];
    }
  });

  let durationAll = 0;
  for (let i = 0; i < filteredSolvers.length; i++) {
    const { day, part1, part2 } = filteredSolvers[i];
    const input = inputs[i];

    try {
      const { duration: dur1, result: res1 } = measure(() => part1(input));
      yield `2020 Day ${day
        .toString()
        .padStart(2, "0")} Part 1: ${res1.padStart(20)} [${dur1
        .toFixed(3)
        .padStart(10)}ms]`;

      const { duration: dur2, result: res2 } = measure(() => part2(input));
      yield `2020 Day ${day
        .toString()
        .padStart(2, "0")} Part 2: ${res2.padStart(20)} [${dur2
        .toFixed(3)
        .padStart(10)}ms]`;

      durationAll += dur1 + dur2;
    } catch {}
  }

  yield `${`Total time:`.padEnd(44)}${durationAll.toFixed(3)}ms`;
}
