import type { Solver } from "../../runner";

const re = /^(?<name1>.+) would (?<mode>gain|lose) (?<happiness>\d+) happiness units by sitting next to (?<name2>.+)\.$/;

type People = Map<string, Map<string, number>>;

const extractNodes = (people: People, line: string): People => {
  const { name1, mode, happiness, name2 } = re.exec(line)!.groups!;

  const factor = mode === "lose" ? -1 : 1;
  const correctedHappines = Number(happiness) * factor;

  if (!people.has(name1)) people.set(name1, new Map());
  people.get(name1)!.set(name2, correctedHappines);

  return people;
};

function* generatePermutations(
  rest: string[],
  current: string[] = []
): Generator<string[], void, void> {
  if (rest.length === 0) {
    yield current;
  } else {
    const candidates = [...rest];
    while (candidates.length) {
      const candidate = candidates.pop()!;
      yield* generatePermutations(
        rest.filter((n) => n !== candidate),
        [...current, candidate]
      );
    }
  }
}

const happiness = (people: People, variation: string[]): number =>
  variation.reduce((totalHappines, val, idx) => {
    const nextVal = variation[idx + 1] || variation[0];
    return totalHappines + (people.get(val)?.get(nextVal) ?? 0);
  }, 0);

const process = (people: People): number => {
  // Fixing the first item of the permutation reduces lots of redudannt
  // combinations. Eg: A-B-C-D is the same tha B-C-D-A and C-D-B-A, so we only
  // take into account the combintations that start with A.
  const peopleNames = Array.from(people.keys());
  const startingPerson = peopleNames.shift()!;
  const everybodyElse = peopleNames;
  let bestHappines = -Infinity;

  for (const variation of generatePermutations(everybodyElse)) {
    // Add the starting person to the permutation
    variation.unshift(startingPerson);
    const happinessCW = happiness(people, variation);
    const happinessCCW = happiness(people, variation.reverse());
    bestHappines = Math.max(happinessCW + happinessCCW, bestHappines);
  }

  return bestHappines;
};

export const part1: Solver = (input) => {
  const people = input.reduce(extractNodes, new Map());
  const result = process(people);
  return String(result);
};

export const part2: Solver = (input) => {
  const people = input.reduce(extractNodes, new Map());
  people.set("me", new Map());
  const result = process(people);
  return String(result);
};
