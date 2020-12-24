import { Solver } from "../run";

const parseTiles = (
  input: string[]
): {
  tiles: Map<number, Map<number, boolean>>;
  maxQ: number;
  minQ: number;
  maxR: number;
  minR: number;
} => {
  const tiles: Map<number, Map<number, boolean>> = new Map();
  let maxQ = 0;
  let minQ = 0;
  let maxR = 0;
  let minR = 0;

  for (const line of input) {
    let q = 0;
    let r = 0;
    for (let i = 0; i < line.length; i++) {
      let dir = line[i];
      if (dir === "s" || dir === "n") dir += line[++i];
      switch (dir) {
        // prettier-ignore
        case "w": q++; break;
        // prettier-ignore
        case "e": q--; break;
        // prettier-ignore
        case "sw": r++; break;
        // prettier-ignore
        case "ne": r--; break;
        // prettier-ignore
        case "se": q--; r++; break;
        // prettier-ignore
        case "nw": q++; r--; break;
      }
    }
    if (!tiles.has(q)) tiles.set(q, new Map());
    tiles.get(q).set(r, tiles.get(q).get(r) !== true);

    maxQ = Math.max(maxQ, q);
    minQ = Math.min(minQ, q);
    maxR = Math.max(maxR, q);
    minR = Math.min(minR, q);
  }

  return { tiles, maxQ, minQ, maxR, minR };
};

export const part1: Solver = (input) => {
  const { tiles } = parseTiles(input);

  return String(
    Array.from(tiles.values())
      .flatMap((r) => Array.from(r.values()))
      .filter((t) => t).length
  );
};

export const part2: Solver = (input) => {
  const result = parseTiles(input);
  let { tiles } = result;
  const { maxQ, minQ, maxR, minR } = result;

  let day = 0;
  while (day++ < 100) {
    const todayTiles = new Map();

    for (let q = minQ - day; q <= maxQ + day; q++) {
      for (let r = minR - day; r <= maxR + day; r++) {
        const tile = tiles.get(q)?.get(r) ?? false;
        const adjent = [
          tiles.get(q - 1)?.get(r) ?? false,
          tiles.get(q + 1)?.get(r) ?? false,
          tiles.get(q)?.get(r - 1) ?? false,
          tiles.get(q)?.get(r + 1) ?? false,
          tiles.get(q - 1)?.get(r + 1) ?? false,
          tiles.get(q + 1)?.get(r - 1) ?? false,
        ];
        const blackAdjent = adjent.filter((t) => t).length;

        if (!todayTiles.has(q)) todayTiles.set(q, new Map());

        if (tile === true && (blackAdjent === 0 || blackAdjent > 2)) {
          todayTiles.get(q).set(r, false);
        } else if (tile === false && blackAdjent === 2) {
          todayTiles.get(q).set(r, true);
        } else {
          todayTiles.get(q).set(r, tile);
        }
      }
    }
    tiles = todayTiles;
  }
  return String(
    Array.from(tiles.values())
      .flatMap((r) => Array.from(r.values()))
      .filter((t) => t).length
  );
};
