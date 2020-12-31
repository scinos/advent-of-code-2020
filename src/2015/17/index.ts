import type { Solver } from "../../runner";

export function* sumCombinations(
  target: number,
  containers: number[]
): Generator<number[], void, void> {
  // Sort the containers for easier processing
  const sortedContainers = [...containers].sort((a, b) => a - b);

  function* f(
    containers: number[],
    solution: number[]
  ): Generator<number[], void, void> {
    const remaining = target - solution.reduce((a, b) => a + b, 0);
    if (remaining === 0) {
      yield solution;
    }
    const availableContainers = [...containers];
    while (availableContainers.length) {
      const candidateContainer = availableContainers.shift()!;
      if (candidateContainer <= remaining) {
        // Valid solution, keep adding more bottles
        yield* f(availableContainers, [...solution, candidateContainer]);
      }
    }
  }

  yield* f(sortedContainers, []);
}

export const part1: Solver = (input) => {
  const containers = input.map(Number);
  return String(Array.from(sumCombinations(150, containers)).length);
};

export const part2: Solver = (input) => {
  const containers = input.map(Number);
  const solutions: Record<number, number> = {};
  let minLength = +Infinity;

  for (const solution of sumCombinations(150, containers)) {
    const len = solution.length;
    solutions[len] = (solutions[len] ?? 0) + 1;
    minLength = Math.min(len, minLength);
  }

  return String(solutions[minLength]);
};
