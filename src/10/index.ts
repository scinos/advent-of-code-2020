import { Solver } from "../run";

export const part1: Solver = (input) => {
  const numbers = input.map(Number).sort((a, b) => a - b);
  const max = Math.max(...numbers);
  const adapters = [0, ...numbers, max + 3];

  const diffs: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
  };
  for (let i = 0; i < adapters.length - 1; i++) {
    const adapter = adapters[i];
    const adapterNext = adapters[i + 1];
    diffs[adapterNext - adapter]++;
  }
  return String(diffs[3] * diffs[1]);
};

export const part2: Solver = (input) => {
  const memo: Record<string, number> = {};

  const adapters = input.map(Number).sort((a, b) => a - b);
  const max = Math.max(...adapters);

  const buildChain = (adapters: number[], chain: number[]) => {
    const lastInChain = chain[chain.length - 1];
    const candidateAdapters = adapters.slice(0, 3);
    const key = [lastInChain, ...candidateAdapters].join("-");
    if (key in memo) return memo[key];

    if (lastInChain === max) {
      return 1;
    }
    if (candidateAdapters.length === 0) {
      return 0;
    }

    let validCount = 0;
    for (let i = 0; i < candidateAdapters.length; i++) {
      const next = candidateAdapters[i];
      if (next - lastInChain > 3) continue;
      validCount += buildChain([...adapters.slice(i + 1)], [...chain, next]);
    }
    memo[key] = validCount;

    return validCount;
  };
  const count = buildChain(adapters, [0]);

  return String(count);
};
