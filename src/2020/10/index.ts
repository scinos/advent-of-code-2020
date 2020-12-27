import { Solver } from "../../runner";

export const part1: Solver = (input) => {
  const numbers = input.map(Number).sort((a, b) => a - b);
  const adapters = [0, ...numbers, numbers[numbers.length - 1] + 3];

  const diffs = [0, 0, 0];

  for (let i = 0; i < adapters.length - 1; i++) {
    const adapter = adapters[i];
    const adapterNext = adapters[i + 1];
    const diff = adapterNext - adapter;
    diffs[diff - 1]++;
  }
  return String(diffs[2] * diffs[0]);
};

export const part2: Solver = (input) => {
  const adapters = [...input.map(Number).sort((a, b) => b - a), 0];
  const subtrees: Map<number, number> = new Map();

  // Only one "adapter" (the device) can be plug into the largest adapter
  subtrees.set(adapters[0], 1);

  // For each adapter, find how many adapters can plug into it
  for (let i = 1; i < adapters.length; i++) {
    const adapter = adapters[i];
    subtrees.set(
      adapter,
      (subtrees.get(adapter + 1) ?? 0) +
        (subtrees.get(adapter + 2) ?? 0) +
        (subtrees.get(adapter + 3) ?? 0)
    );
  }

  return String(subtrees.get(0));
};
