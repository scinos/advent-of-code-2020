/* eslint-disable prefer-destructuring */
import type { Solver } from "../../runner";

class Cup {
  next!: Cup;

  dest!: Cup;

  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export const solve = (
  cups: number[],
  maxCup: number,
  maxTurn: number
): Map<number, Cup> => {
  const linkedCups: Cup[] = [];
  const cupIndex: Map<number, Cup> = new Map();

  for (let i = 0; i < maxCup; i++) {
    // Get cup from the provided initial config, or using the id
    const cup = new Cup(i < cups.length ? cups[i] : i + 1);
    linkedCups[i] = cup;
    cupIndex.set(cup.id, cup);

    // Link next cup
    if (i > 0) {
      linkedCups[i - 1].next = cup;
    }
  }
  // Link the last cup
  linkedCups[maxCup - 1].next = linkedCups[0];

  // Link destinations
  for (let i = 0; i < linkedCups.length; i++) {
    const destId = linkedCups[i].id - 1;
    linkedCups[i].dest = cupIndex.get(destId <= 0 ? maxCup : destId)!;
  }

  let turn = 0;
  let cup = linkedCups[0];
  while (turn++ < maxTurn) {
    const pick = [cup.next, cup.next.next, cup.next.next.next];

    let { dest } = cup;
    while (pick.includes(dest)) {
      dest = dest.dest;
    }

    const { next } = dest;
    cup.next = pick[2].next;
    dest.next = pick[0];
    pick[2].next = next;
    cup = cup.next;
  }

  return cupIndex;
};

export const part1: Solver = (input) => {
  const cupIndex = solve(
    input[0].split("").map((c) => Number(c)),
    9,
    100
  );

  let firstCup = cupIndex.get(1)!;
  const result = new Array(8).fill(0).reduce((acc) => {
    firstCup = firstCup.next;
    acc += `${firstCup.id}`;
    return acc;
  }, "");
  return result;
};

export const part2: Solver = (input) => {
  const cupIndex = solve(
    input[0].split("").map((c) => Number(c)),
    1e6,
    1e7
  );
  const firstCup = cupIndex.get(1)!;
  return String(firstCup.next.id * firstCup.next.next.id);
};
