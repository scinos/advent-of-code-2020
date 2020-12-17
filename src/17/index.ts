/* eslint-disable no-labels */
/* eslint-disable no-loop-func */
import { Solver } from "../run";

const { getNeighborCoords, resetNeighborCoords } = (() => {
  let memoCoord: Map<string, string[]> = new Map();

  const resetNeighborCoords = () => {
    memoCoord = new Map();
  };

  const getNeighborCoords = (originalCoord: string): string[] => {
    if (memoCoord.has(originalCoord)) {
      return memoCoord.get(originalCoord);
    }

    const expandedCoords = originalCoord.split(",").map(Number);

    // NOTE To future me: this harcoded list is ~0.5 faster
    // let coords: string[];
    // if (expandedCoords.length === 4) {
    //   const [x, y, z, w] = expandedCoords.map(Number);
    //   coords = [
    //     `${x - 1},${y},${z},${w}`,
    //     `${x + 1},${y},${z},${w}`,
    //     `${x},${y - 1},${z},${w}`,
    //     `${x - 1},${y - 1},${z},${w}`,
    //     `${x + 1},${y - 1},${z},${w}`,
    //     `${x},${y + 1},${z},${w}`,
    //     `${x - 1},${y + 1},${z},${w}`,
    //     `${x + 1},${y + 1},${z},${w}`,
    //     `${x},${y},${z + 1},${w}`,
    //     `${x - 1},${y},${z + 1},${w}`,
    //     `${x + 1},${y},${z + 1},${w}`,
    //     `${x},${y - 1},${z + 1},${w}`,
    //     `${x - 1},${y - 1},${z + 1},${w}`,
    //     `${x + 1},${y - 1},${z + 1},${w}`,
    //     `${x},${y + 1},${z + 1},${w}`,
    //     `${x - 1},${y + 1},${z + 1},${w}`,
    //     `${x + 1},${y + 1},${z + 1},${w}`,
    //     `${x},${y},${z - 1},${w}`,
    //     `${x - 1},${y},${z - 1},${w}`,
    //     `${x + 1},${y},${z - 1},${w}`,
    //     `${x},${y - 1},${z - 1},${w}`,
    //     `${x - 1},${y - 1},${z - 1},${w}`,
    //     `${x + 1},${y - 1},${z - 1},${w}`,
    //     `${x},${y + 1},${z - 1},${w}`,
    //     `${x - 1},${y + 1},${z - 1},${w}`,
    //     `${x + 1},${y + 1},${z - 1},${w}`,
    //     `${x},${y},${z},${w - 1}`,
    //     `${x - 1},${y},${z},${w - 1}`,
    //     `${x + 1},${y},${z},${w - 1}`,
    //     `${x},${y - 1},${z},${w - 1}`,
    //     `${x - 1},${y - 1},${z},${w - 1}`,
    //     `${x + 1},${y - 1},${z},${w - 1}`,
    //     `${x},${y + 1},${z},${w - 1}`,
    //     `${x - 1},${y + 1},${z},${w - 1}`,
    //     `${x + 1},${y + 1},${z},${w - 1}`,
    //     `${x},${y},${z + 1},${w - 1}`,
    //     `${x - 1},${y},${z + 1},${w - 1}`,
    //     `${x + 1},${y},${z + 1},${w - 1}`,
    //     `${x},${y - 1},${z + 1},${w - 1}`,
    //     `${x - 1},${y - 1},${z + 1},${w - 1}`,
    //     `${x + 1},${y - 1},${z + 1},${w - 1}`,
    //     `${x},${y + 1},${z + 1},${w - 1}`,
    //     `${x - 1},${y + 1},${z + 1},${w - 1}`,
    //     `${x + 1},${y + 1},${z + 1},${w - 1}`,
    //     `${x},${y},${z - 1},${w - 1}`,
    //     `${x - 1},${y},${z - 1},${w - 1}`,
    //     `${x + 1},${y},${z - 1},${w - 1}`,
    //     `${x},${y - 1},${z - 1},${w - 1}`,
    //     `${x - 1},${y - 1},${z - 1},${w - 1}`,
    //     `${x + 1},${y - 1},${z - 1},${w - 1}`,
    //     `${x},${y + 1},${z - 1},${w - 1}`,
    //     `${x - 1},${y + 1},${z - 1},${w - 1}`,
    //     `${x + 1},${y + 1},${z - 1},${w - 1}`,
    //     `${x},${y},${z},${w + 1}`,
    //     `${x - 1},${y},${z},${w + 1}`,
    //     `${x + 1},${y},${z},${w + 1}`,
    //     `${x},${y - 1},${z},${w + 1}`,
    //     `${x - 1},${y - 1},${z},${w + 1}`,
    //     `${x + 1},${y - 1},${z},${w + 1}`,
    //     `${x},${y + 1},${z},${w + 1}`,
    //     `${x - 1},${y + 1},${z},${w + 1}`,
    //     `${x + 1},${y + 1},${z},${w + 1}`,
    //     `${x},${y},${z + 1},${w + 1}`,
    //     `${x - 1},${y},${z + 1},${w + 1}`,
    //     `${x + 1},${y},${z + 1},${w + 1}`,
    //     `${x},${y - 1},${z + 1},${w + 1}`,
    //     `${x - 1},${y - 1},${z + 1},${w + 1}`,
    //     `${x + 1},${y - 1},${z + 1},${w + 1}`,
    //     `${x},${y + 1},${z + 1},${w + 1}`,
    //     `${x - 1},${y + 1},${z + 1},${w + 1}`,
    //     `${x + 1},${y + 1},${z + 1},${w + 1}`,
    //     `${x},${y},${z - 1},${w + 1}`,
    //     `${x - 1},${y},${z - 1},${w + 1}`,
    //     `${x + 1},${y},${z - 1},${w + 1}`,
    //     `${x},${y - 1},${z - 1},${w + 1}`,
    //     `${x - 1},${y - 1},${z - 1},${w + 1}`,
    //     `${x + 1},${y - 1},${z - 1},${w + 1}`,
    //     `${x},${y + 1},${z - 1},${w + 1}`,
    //     `${x - 1},${y + 1},${z - 1},${w + 1}`,
    //     `${x + 1},${y + 1},${z - 1},${w + 1}`,
    //   ];
    // } else {
    //   const [x, y, z] = expandedCoords.map(Number);
    //   coords = [
    //     `${x - 1},${y},${z}`,
    //     `${x + 1},${y},${z}`,
    //     `${x},${y - 1},${z}`,
    //     `${x - 1},${y - 1},${z}`,
    //     `${x + 1},${y - 1},${z}`,
    //     `${x},${y + 1},${z}`,
    //     `${x - 1},${y + 1},${z}`,
    //     `${x + 1},${y + 1},${z}`,
    //     `${x},${y},${z + 1}`,
    //     `${x - 1},${y},${z + 1}`,
    //     `${x + 1},${y},${z + 1}`,
    //     `${x},${y - 1},${z + 1}`,
    //     `${x - 1},${y - 1},${z + 1}`,
    //     `${x + 1},${y - 1},${z + 1}`,
    //     `${x},${y + 1},${z + 1}`,
    //     `${x - 1},${y + 1},${z + 1}`,
    //     `${x + 1},${y + 1},${z + 1}`,
    //     `${x},${y},${z - 1}`,
    //     `${x - 1},${y},${z - 1}`,
    //     `${x + 1},${y},${z - 1}`,
    //     `${x},${y - 1},${z - 1}`,
    //     `${x - 1},${y - 1},${z - 1}`,
    //     `${x + 1},${y - 1},${z - 1}`,
    //     `${x},${y + 1},${z - 1}`,
    //     `${x - 1},${y + 1},${z - 1}`,
    //     `${x + 1},${y + 1},${z - 1}`,
    //   ];
    // }

    const coords: number[][] = [[]];
    while (coords.length) {
      const temporalCoord = coords.shift();
      // Due the order of insertion in `coords`, th first coord with the same length is equal to expandedCoords, which
      // we want to skip. So we don't put it back to the array.
      if (temporalCoord.length === expandedCoords.length) break;
      const dimension = temporalCoord.length;
      coords.push([...temporalCoord, expandedCoords[dimension]]);
      coords.push([...temporalCoord, expandedCoords[dimension] - 1]);
      coords.push([...temporalCoord, expandedCoords[dimension] + 1]);
    }
    const finalCoords = coords.map((c) => c.join(","));

    memoCoord.set(originalCoord, finalCoords);
    return finalCoords;
  };

  return { resetNeighborCoords, getNeighborCoords };
})();

const solve = (input: string[], dimension: number): number => {
  let world: Map<string, boolean> = new Map();
  let toVisit: Set<string> = new Set();

  input.forEach((row, y) =>
    row.split("").forEach((cell, x) => {
      if (cell === "#") {
        const coords = [x, y, ...new Array(dimension - 2).fill(0)].join(",");
        world.set(coords, cell === "#");
        toVisit.add(coords);
        getNeighborCoords(coords).forEach((coord) => toVisit.add(coord));
      }
    })
  );

  for (let turn = 0; turn < 6; turn++) {
    const newWorld: Map<string, boolean> = new Map();
    const newToVisit: Set<string> = new Set();

    for (const coords of toVisit.values()) {
      const neighbors = getNeighborCoords(coords);
      const cell = world.get(coords);
      const activeNeighbors = neighbors
        .map((coord) => world.get(coord))
        .filter((cell) => cell).length;

      if (
        (cell && (activeNeighbors === 2 || activeNeighbors === 3)) ||
        (!cell && activeNeighbors === 3)
      ) {
        newWorld.set(coords, true);
        [coords, ...neighbors].forEach((coord) => newToVisit.add(coord));
      }
    }

    world = newWorld;
    toVisit = newToVisit;
  }

  return Array.from(world.values()).filter((v) => v).length;
};

export const part1: Solver = (input) => {
  // Don't cheat!
  resetNeighborCoords();
  const result = solve(input, 3);
  return String(result);
};
export const part2: Solver = (input) => {
  // Don't cheat!
  resetNeighborCoords();
  return String(solve(input, 4));
};
