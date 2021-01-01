import type { Solver } from "../../runner";

type Replacements = Record<string, string[]>;

export const extract = (
  input: string[]
): { replacements: Replacements; molecule: string } => {
  const reReplacements = /^([A-Za-z]+?) => ([A-Za-z]+?)$/;
  const replacements: Replacements = {};
  let molecule = "";

  for (const line of input) {
    if (!line) continue;

    const match = reReplacements.exec(line);
    if (match) {
      const [, from, to] = match;
      if (!replacements[from]) replacements[from] = [];
      replacements[from].push(to);
    } else {
      molecule = line;
    }
  }

  return { replacements, molecule };
};

export const invert = (
  replacements: Replacements
): { from: string; to: string }[] => {
  const result = [];

  for (const [from, replacement] of Object.entries(replacements)) {
    for (const to of replacements[from]) {
      result.push({ from: to, to: from });
    }
  }

  return result.sort((a, b) => {
    const r = b.from.length - a.from.length;
    if (r !== 0) return r;
    return a.from.localeCompare(b.from);
  });
};

export const part1: Solver = (input) => {
  const { replacements, molecule } = extract(input);
  const results: Set<string> = new Set();

  for (const [from, replacement] of Object.entries(replacements)) {
    for (const to of replacement) {
      const re = RegExp(from, "g");
      molecule.replace(re, (from, position): string => {
        const result =
          molecule.substring(0, position) +
          to +
          molecule.substring(position + from.length);
        results.add(result);
        return to;
      });
    }
  }

  return String(results.size);
};

export const part2: Solver = (input) => {
  const { replacements, molecule } = extract(input);
  const invertedReplacements = invert(replacements).map(({ from, to }) => ({
    to,
    re: RegExp(from, "g"),
  }));

  type Step = { source: string; step: number };
  let queue: Step[] = [
    {
      source: molecule,
      step: 0,
    },
  ];
  let candidate: Step;

  while (queue.length > 0) {
    candidate = queue.pop()!;
    const { source, step } = candidate;
    if (source === "e") break;

    for (const { re, to } of invertedReplacements) {
      source.replace(re, (from, pos, source): string => {
        queue.push({
          source:
            source.substring(0, pos) + to + source.substring(pos + from.length),
          step: step + 1,
        });
        return "";
      });
    }

    queue = queue.sort((a, b) => b.source.length - a.source.length);
  }

  return String(candidate!.step);
};
