/* eslint-disable no-loop-func */
import { Solver } from "../../runner";

type NeighbourStrategy = (
  world: string[],
  rowSize: number,
  columnSize: number,
  idx: number
) => number[];

const adjacentSeatsStrategy: NeighbourStrategy = (
  world,
  rowSize,
  columnSize,
  idx
) => {
  const mod = idx % rowSize;
  const seats: number[] = [];

  const canMoveUp = idx - rowSize >= 0;
  const canMoveDown = idx + rowSize < world.length;
  const canMoveLeft = idx - 1 >= 0 && (idx - 1) % rowSize < mod;
  const canMoveRight = idx + 1 < world.length && (idx + 1) % rowSize > mod;

  if (canMoveLeft && world[idx - 1] === "L") seats.push(idx - 1);
  if (canMoveRight && world[idx + 1] === "L") seats.push(idx + 1);

  if (canMoveUp) {
    const tempIdx = idx - rowSize;
    if (world[tempIdx] === "L") seats.push(tempIdx);
    if (canMoveLeft && world[tempIdx - 1] === "L") seats.push(tempIdx - 1);
    if (canMoveRight && world[tempIdx + 1] === "L") seats.push(tempIdx + 1);
  }
  if (canMoveDown) {
    const tempIdx = idx + rowSize;
    if (world[tempIdx] === "L") seats.push(tempIdx);
    if (canMoveLeft && world[tempIdx - 1] === "L") seats.push(tempIdx - 1);
    if (canMoveRight && world[tempIdx + 1] === "L") seats.push(tempIdx + 1);
  }

  return seats;
};

const visibleSeatsStrategy: NeighbourStrategy = (
  world,
  rowSize,
  columnSize,
  idx
) => {
  const y = Math.floor(idx / rowSize);
  const x = idx % rowSize;

  const seats: number[] = [];

  for (
    let yy = y - 1, xx = x;
    yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
    yy--
  ) {
    if (world[yy * rowSize + xx] === "L") {
      seats.push(yy * rowSize + xx);
      break;
    }
  }
  for (
    let yy = y - 1, xx = x + 1;
    yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
    yy--, xx++
  ) {
    if (world[yy * rowSize + xx] === "L") {
      seats.push(yy * rowSize + xx);
      break;
    }
  }
  for (
    let yy = y, xx = x + 1;
    yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
    xx++
  ) {
    if (world[yy * rowSize + xx] === "L") {
      seats.push(yy * rowSize + xx);
      break;
    }
  }
  for (
    let yy = y + 1, xx = x + 1;
    yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
    xx++, yy++
  ) {
    if (world[yy * rowSize + xx] === "L") {
      seats.push(yy * rowSize + xx);
      break;
    }
  }
  for (
    let yy = y + 1, xx = x;
    yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
    yy++
  ) {
    if (world[yy * rowSize + xx] === "L") {
      seats.push(yy * rowSize + xx);
      break;
    }
  }
  for (
    let yy = y + 1, xx = x - 1;
    yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
    xx--, yy++
  ) {
    if (world[yy * rowSize + xx] === "L") {
      seats.push(yy * rowSize + xx);
      break;
    }
  }
  for (
    let yy = y, xx = x - 1;
    yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
    xx--
  ) {
    if (world[yy * rowSize + xx] === "L") {
      seats.push(yy * rowSize + xx);
      break;
    }
  }
  for (
    let yy = y - 1, xx = x - 1;
    yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
    xx--, yy--
  ) {
    if (world[yy * rowSize + xx] === "L") {
      seats.push(yy * rowSize + xx);
      break;
    }
  }

  return seats;
};

const solve = (
  world: string[],
  columnSize: number,
  rowSize: number,
  seatStrategy: NeighbourStrategy,
  occupancyLimit: number
) => {
  // relatedSeats is a static map that associates seats with an array of coordinates that are affected
  // by that seat (i.e. coordinates for its 8 neighbours)
  const relatedSeats: Map<number, number[]> = new Map();

  // Set of coordiantes to process on each iteration. This is used to avoid processing cells whose neighbourhood
  // has not changed in the previous iteration.
  let toProcess: Set<number> = new Set();

  // Prepare the initial structures. It assumes that all relevant seats will be empty ("L").
  // Initially, add all seats to be processed
  // For each seat, compute the list of related seats
  for (let idx = 0; idx < world.length; idx++) {
    const seat = world[idx];
    if (seat !== "L") continue;
    toProcess.add(idx);
    relatedSeats.set(idx, seatStrategy(world, rowSize, columnSize, idx));
  }

  // As long as we have things to process...
  while (toProcess.size) {
    // Prepare a copy of the world and the list of seats to process for the next iteration
    const nextWorld = [...world];
    const nextToProcess: Set<number> = new Set();

    // Go over all seats to be prcessed
    for (const num of toProcess.values()) {
      const seat = world[num];
      const seats = relatedSeats.get(num)!;

      if (seat === "#") {
        // If a seat is occupied, check how many related seats are also occupied.
        // If >= occupancyLimit, then the seat becomes empty.
        // If it changes, add all its related seats to be processed on next iteration.
        const occupied = seats.map((idx) => world[idx]).filter((c) => c === "#")
          .length;
        if (occupied >= occupancyLimit) {
          nextWorld[num] = "L";
          seats.forEach((idx) => nextToProcess.add(idx));
        }
      } else {
        // If a seat is empty, check how many related seats are occupied.
        // If all related seats are empty, the seat becomes occupied too.
        // If it changes, add all its related seats to be processed on next iteration.
        const allEmpty = seats.map((idx) => world[idx]).every((c) => c === "L");
        if (allEmpty) {
          nextWorld[num] = "#";
          seats.forEach((idx) => nextToProcess.add(idx));
        }
      }
    }

    // Prepare for the next iteration
    world = nextWorld;
    toProcess = nextToProcess;
  }

  // Count occupied seats in the world
  const total = world.filter((c) => c === "#").length;
  return String(total);
};

export const part1: Solver = (input) => {
  const world: string[] = input.join("").split("");
  const rowSize = input[0].length;
  const columnSize = input.length;
  const result = solve(world, columnSize, rowSize, adjacentSeatsStrategy, 4);
  return String(result);
};

export const part2: Solver = (input) => {
  const world: string[] = input.join("").split("");
  const rowSize = input[0].length;
  const columnSize = input.length;
  const result = solve(world, columnSize, rowSize, visibleSeatsStrategy, 5);
  return String(result);
};
