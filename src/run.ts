import { promises as fs, readFileSync } from "fs";
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
export type Day =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25";
export type Part = "1" | "2";
export type Solvers = Record<string, Record<Part, Solver>>;
export interface Arguments {
  day: Day;
  part: Part;
  input: string;
}

const solvers: Solvers = {
  "01": { "1": solverDay01.part1, "2": solverDay01.part2 },
  "02": { "1": solverDay02.part1, "2": solverDay02.part2 },
  "03": { "1": solverDay03.part1, "2": solverDay03.part2 },
  "04": { "1": solverDay04.part1, "2": solverDay04.part2 },
  "05": { "1": solverDay05.part1, "2": solverDay05.part2 },
  "06": { "1": solverDay06.part1, "2": solverDay06.part2 },
  "07": { "1": solverDay07.part1, "2": solverDay07.part2 },
  "08": { "1": solverDay08.part1, "2": solverDay08.part2 },
  "09": { "1": solverDay09.part1, "2": solverDay09.part2 },
  "10": { "1": solverDay10.part1, "2": solverDay10.part2 },
  "11": { "1": solverDay11.part1, "2": solverDay11.part2 },
  "12": { "1": solverDay12.part1, "2": solverDay12.part2 },
  "13": { "1": solverDay13.part1, "2": solverDay13.part2 },
  "14": { "1": solverDay14.part1, "2": solverDay14.part2 },
  "15": { "1": solverDay15.part1, "2": solverDay15.part2 },
  "16": { "1": solverDay16.part1, "2": solverDay16.part2 },
  "17": { "1": solverDay17.part1, "2": solverDay17.part2 },
  "18": { "1": solverDay18.part1, "2": solverDay18.part2 },
  "19": { "1": solverDay19.part1, "2": solverDay19.part2 },
  "20": { "1": solverDay20.part1, "2": solverDay20.part2 },
  "21": { "1": solverDay21.part1, "2": solverDay21.part2 },
  "22": { "1": solverDay22.part1, "2": solverDay22.part2 },
  "23": { "1": solverDay23.part1, "2": solverDay23.part2 },
  "24": { "1": solverDay24.part1, "2": solverDay24.part2 },
  "25": { "1": solverDay25.part1, "2": solverDay25.part2 },
};

export const run = async (args: Arguments): Promise<string> => {
  const { day, part, input: inputDir } = args;
  const solver = solvers[day][part];
  const input = await fs.readFile(join(inputDir, `${day}.txt`), "utf-8");
  const lines = input.split("\n");
  return solver(lines);
};

const measure = (fn: () => string): { duration: number; result: string } => {
  const start = process.hrtime.bigint();
  const result = fn();
  const end = process.hrtime.bigint();
  return {
    duration: Number(end - start) / 1e6,
    result,
  };
};

export function* runAll(inputDir: string): Generator<string, void, void> {
  const inputs = (Object.keys(solvers) as Day[]).reduce<Record<Day, string[]>>(
    (acc, day) => {
      try {
        return {
          ...acc,
          [day]: readFileSync(join(inputDir, `${day}.txt`), "utf-8").split(
            "\n"
          ),
        };
      } catch {
        return acc;
      }
    },
    {} as Record<Day, string[]>
  );

  let durationAll = 0;

  for (const [day, solver] of Object.entries(solvers).sort(
    ([day1], [day2]) => Number(day1) - Number(day2)
  ) as [Day, Record<Part, Solver>][]) {
    const input = inputs[day];

    try {
      const { duration: duration1, result: result1 } = measure(() =>
        solver["1"](input)
      );
      yield `2020 Day ${day} Part 1: ${result1.padStart(
        20
      )} [${duration1.toFixed(3).padStart(10)}ms]`;

      const { duration: duration2, result: result2 } = measure(() =>
        solver["2"](input)
      );
      yield `2020 Day ${day} Part 2: ${result2.padStart(
        20
      )} [${duration2.toFixed(3).padStart(10)}ms]`;

      durationAll += duration1 + duration2;
    } catch {}
  }

  yield `${`Total time:`.padEnd(44)}${durationAll.toFixed(3)}ms`;
}
