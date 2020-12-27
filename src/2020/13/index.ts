import { Solver } from "../../runner";

const GCD = (a: number, b: number): number => {
  if (b === 0) return a;
  return GCD(b, a % b);
};

const LCM = (a: number, b: number): number => {
  return (a * b) / GCD(a, b);
};

export const part1: Solver = (input) => {
  const time = Number(input[0]);
  const buses = input[1].split(",");

  const activeBuses = buses
    .map((bus) => ({ id: Number(bus) }))
    .filter(({ id }) => id)
    .map(({ id }) => ({ id, nextStop: id - (time % id) }))
    .sort((a, b) => a.nextStop - b.nextStop);

  return String(activeBuses[0].nextStop * activeBuses[0].id);
};

export const part2: Solver = (input) => {
  const buses = input[1]
    .split(",")
    .map((id, idx) => ({ offset: idx, frequency: Number(id) }))
    .filter(({ frequency }) => frequency);

  // This algorithm works by picking a bus from the list, and move 't' in
  // discrete steps until we find a 't' so 't+offset' is a multiple of 'offset'.
  //
  // For a simplified model, let's assume there is a bus in offset 0 with
  // frequency 1. In other words, every 't' works for this bus.
  //
  // To find a valid 't' for bus N, 't' increments must be the LCM of
  // bus N-1, bus N-2... This ensure that the new 't' is still in sync for all
  // previous buses.
  //
  // - For the fake bus#0, t=1 and accumulated LCM is 1
  // - For bus#1, we move 't' in increments of 1, when we find it, the accumulated
  //   LCM is LCM(1, bus#1 frequency)
  // - For bus#2, we move 't' in increments of LCM(1, bus#1 frequency), and when we
  //   find it, the new accumulated value is LCM(LCM(1, bus#1 frequency), bus#2 frequency)
  // - Repeat until we are out of buses.
  let t = 1;
  let aggregatedLCM = 1;
  while (buses.length) {
    const { offset, frequency } = buses.shift();
    while ((t + offset) % frequency !== 0) {
      t += aggregatedLCM;
    }
    aggregatedLCM = LCM(aggregatedLCM, frequency);
  }

  return String(t);
};
