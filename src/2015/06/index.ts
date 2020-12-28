import type { Solver } from "../../runner";

const re = /^(?<action>turn on|toggle|turn off) (?<x1>[0-9]+),(?<y1>[0-9]+) through (?<x2>[0-9]+),(?<y2>[0-9]+)$/;

export const part1: Solver = (input) => {
  const lights: boolean[][] = [];
  input.forEach((line) => {
    const { action, x1, y1, x2, y2 } = re.exec(line)!.groups!;
    const initX = Number(x1);
    const initY = Number(y1);
    const maxX = Number(x2);
    const maxY = Number(y2);

    for (let y = initY; y <= maxY; y++) {
      if (!lights[y]) lights[y] = [];
      const row: boolean[] = lights[y];
      let x = initX;

      switch (action) {
        case "turn on":
          while (x <= maxX) row[x++] = true;
          break;
        case "turn off":
          while (x <= maxX) row[x++] = false;
          break;
        case "toggle":
          while (x <= maxX) {
            row[x] = !(row[x] ?? false);
            x++;
          }
          break;
      }
    }
  });

  const total = lights.reduce(
    (total, row) => total + row.filter((l) => l).length,
    0
  );

  return String(total);
};

export const part2: Solver = (input) => {
  const lights: number[][] = [];
  input.forEach((line) => {
    const { action, x1, y1, x2, y2 } = re.exec(line)!.groups!;
    const initX = Number(x1);
    const initY = Number(y1);
    const maxX = Number(x2);
    const maxY = Number(y2);

    for (let y = initY; y <= maxY; y++) {
      if (!lights[y]) lights[y] = [];
      const row: number[] = lights[y];
      switch (action) {
        case "turn on":
          for (let x = initX; x <= maxX; x++) {
            row[x] = (row[x] ?? 0) + 1;
          }
          break;
        case "turn off":
          for (let x = initX; x <= maxX; x++) {
            row[x] = Math.max(0, (row[x] ?? 0) - 1);
          }
          break;
        case "toggle":
          for (let x = initX; x <= maxX; x++) {
            row[x] = Math.max(0, (row[x] ?? 0) + 2);
          }
          break;
      }
    }
  });

  const total = lights.reduce(
    (total, row) => total + row.reduce((a, b) => a + b),
    0
  );

  return String(total);
};
