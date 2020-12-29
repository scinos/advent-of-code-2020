import type { Solver } from "../../runner";

type GenericArray = unknown[];
type GenericObject = Record<string, unknown>;

type FilterFunction = (data: GenericObject) => boolean;
type IterFunction = (data: unknown, filterObject: FilterFunction) => number;

function processArray(
  data: GenericArray,
  filterObject: FilterFunction,
  iterFn: IterFunction
) {
  return data.reduce((sum: number, i) => sum + iterFn(i, filterObject), 0);
}

function processObject(
  data: GenericObject,
  filterObject: FilterFunction,
  iterFn: IterFunction
) {
  if (!filterObject(data)) return 0;
  return Object.values(data).reduce(
    (acc: number, val) => acc + iterFn(val, filterObject),
    0
  );
}

const sumNumbers: IterFunction = (data, filterObject) => {
  if (typeof data === "number") return data;
  if (Array.isArray(data)) return processArray(data, filterObject, sumNumbers);
  if (typeof data === "object")
    return processObject(data as GenericObject, filterObject, sumNumbers);
  return 0;
};

export const part1: Solver = (input) => {
  const json = JSON.parse(input.join("\n"));
  return String(sumNumbers(json, () => true));
};

export const part2: Solver = (input) => {
  const json = JSON.parse(input.join("\n"));
  return String(
    sumNumbers(json, (data) => !Object.values(data).includes("red"))
  );
};
