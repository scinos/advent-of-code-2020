import { massToFuel, massToFuelComplex } from "./lib";
import { Solver } from "../run";

const aggregateModules = (
  modules: string[],
  fn: (n: number) => number
): string => {
  return String(
    modules.reduce((acc, module) => {
      const m = Number(module);
      if (m <= 0) return acc;
      return acc + fn(m);
    }, 0)
  );
};

export const part1: Solver = (input) => {
  return aggregateModules(input, massToFuel);
};

export const part2: Solver = (input) => {
  return aggregateModules(input, massToFuelComplex);
};
