/* eslint-disable no-loop-func */
import { Solver } from "../run";

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
  const y = Math.floor(idx / rowSize);
  const x = idx % rowSize;
  const seats: number[] = [
    // TODO Figure out the math for this without having to convert to x,y coords
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
    [y, x - 1],
    [y, x + 1],
  ]
    .filter(
      ([y, x]) =>
        x >= 0 &&
        x < rowSize &&
        y >= 0 &&
        y < columnSize &&
        world[y * rowSize + x] === "L"
    )
    .map(([y, x]) => y * rowSize + x);

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
      const seats = relatedSeats.get(num);

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
