import { Solver } from "../run";

export const part1: Solver = (input) => {
  let world: string[][] = input.map((r) => r.split(""));

  let changed = false;
  do {
    changed = false;
    const next = world.map((r) => [...r]);

    for (let y = 0; y < world.length; y++) {
      for (let x = 0; x < world[y].length; x++) {
        const cell = world[y][x];
        const cells = [];

        switch (cell) {
          case "#":
            if (y >= 1) {
              if (x >= 1) cells.push(world[y - 1][x - 1]);
              cells.push(world[y - 1][x]);
              if (x < world[y].length - 1) cells.push(world[y - 1][x + 1]);
            }
            if (x >= 1) cells.push(world[y][x - 1]);
            if (x < world[y].length - 1) cells.push(world[y][x + 1]);
            if (y < world.length - 1) {
              if (x >= 1) cells.push(world[y + 1][x - 1]);
              cells.push(world[y + 1][x]);
              if (x < world[y].length - 1) cells.push(world[y + 1][x + 1]);
            }
            if (cells.filter((c) => c === "#").length >= 4) {
              changed = true;
              next[y][x] = "L";
            }
            break;
          case "L":
            if (y >= 1) {
              if (x >= 1) cells.push(world[y - 1][x - 1]);
              cells.push(world[y - 1][x]);
              if (x < world[y].length - 1) cells.push(world[y - 1][x + 1]);
            }
            if (x >= 1) cells.push(world[y][x - 1]);
            if (x < world[y].length - 1) cells.push(world[y][x + 1]);
            if (y < world.length - 1) {
              if (x >= 1) cells.push(world[y + 1][x - 1]);
              cells.push(world[y + 1][x]);
              if (x < world[y].length - 1) cells.push(world[y + 1][x + 1]);
            }
            if (cells.filter((c) => c === "#").length === 0) {
              changed = true;
              next[y][x] = "#";
            }
            break;
          default:
            continue;
        }
      }
    }

    world = next;
  } while (changed === true);

  const total = world.reduce(
    (total, row) => total + row.filter((r) => r === "#").length,
    0
  );
  return String(total);
};

export const part2: Solver = (input) => {
  let world: string[][] = input.map((r) => r.split(""));
  const columnSize = world.length;
  const rowSize = world[0].length;

  const seats = new Array(columnSize).fill([]).map(() => []);

  for (let y = 0; y < columnSize; y++) {
    for (let x = 0; x < rowSize; x++) {
      const cellSeats: [number, number][] = [];
      if (world[y][x] !== "L") continue;

      for (
        let yy = y - 1, xx = x;
        yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
        yy--
      ) {
        if (world[yy][xx] === "L") {
          cellSeats.push([yy, xx]);
          break;
        }
      }
      for (
        let yy = y - 1, xx = x + 1;
        yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
        yy--, xx++
      ) {
        if (world[yy][xx] === "L") {
          cellSeats.push([yy, xx]);
          break;
        }
      }
      for (
        let yy = y, xx = x + 1;
        yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
        xx++
      ) {
        if (world[yy][xx] === "L") {
          cellSeats.push([yy, xx]);
          break;
        }
      }
      for (
        let yy = y + 1, xx = x + 1;
        yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
        xx++, yy++
      ) {
        if (world[yy][xx] === "L") {
          cellSeats.push([yy, xx]);
          break;
        }
      }
      for (
        let yy = y + 1, xx = x;
        yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
        yy++
      ) {
        if (world[yy][xx] === "L") {
          cellSeats.push([yy, xx]);
          break;
        }
      }
      for (
        let yy = y + 1, xx = x - 1;
        yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
        xx--, yy++
      ) {
        if (world[yy][xx] === "L") {
          cellSeats.push([yy, xx]);
          break;
        }
      }
      for (
        let yy = y, xx = x - 1;
        yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
        xx--
      ) {
        if (world[yy][xx] === "L") {
          cellSeats.push([yy, xx]);
          break;
        }
      }
      for (
        let yy = y - 1, xx = x - 1;
        yy >= 0 && yy < columnSize && xx >= 0 && xx < rowSize;
        xx--, yy--
      ) {
        if (world[yy][xx] === "L") {
          cellSeats.push([yy, xx]);
          break;
        }
      }

      seats[y][x] = cellSeats;
    }
  }

  let changed = false;
  do {
    changed = false;
    const next = world.map((r) => [...r]);

    for (let y = 0; y < world.length; y++) {
      for (let x = 0; x < world[y].length; x++) {
        const cell = world[y][x];
        let occupied: number;

        switch (cell) {
          case "#":
            // eslint-disable-next-line no-loop-func
            occupied = seats[y][x].filter(([y, x]: [number, number]) => {
              return world[y][x] === "#";
            }).length;

            if (occupied >= 5) {
              changed = true;
              next[y][x] = "L";
            }

            break;
          case "L":
            // eslint-disable-next-line no-loop-func
            occupied = seats[y][x].filter(([y, x]: [number, number]) => {
              return world[y][x] === "#";
            }).length;

            if (occupied === 0) {
              changed = true;
              next[y][x] = "#";
            }

            break;
          default:
            continue;
        }
      }
    }

    world = next;
  } while (changed === true);

  const total = world.reduce(
    (total, row) => total + row.filter((r) => r === "#").length,
    0
  );
  return String(total);
};
