/* eslint-disable max-classes-per-file */
/* eslint-disable no-labels */
/* eslint-disable no-cond-assign */
import { Solver } from "../../runner";

const rotate = <T>(input: T[][]): T[][] => {
  const width = input.length;
  const result = new Array(width).fill(0).map(() => new Array(width));
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < width; x++) {
      result[y][x] = input[width - 1 - x][y];
    }
  }
  return result;
};

const flip = <T>(input: T[][]): T[][] => {
  const width = input.length;
  const result = new Array(width).fill(0).map(() => new Array(width));
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < width; x++) {
      result[y][x] = input[width - 1 - y][x];
    }
  }
  return result;
};

class Tile {
  id: string;

  lines: string[][];

  borders!: string[];

  constructor(id: string, lines: string[][]) {
    this.id = id;
    this.lines = lines;
    this.computeBorders();
  }

  private computeBorders() {
    const border1 = this.lines[0].join("");
    const border3 = this.lines[this.lines.length - 1].join("");
    let border2 = "";
    let border4 = "";
    for (const line of this.lines) {
      border2 += line[line.length - 1];
      border4 += line[0];
    }
    this.borders = [border1, border2, border3, border4];
  }
}

class TileGroup {
  id: string;

  permutations: Tile[];

  constructor(id: string, lines: string[][]) {
    this.id = id;
    this.permutations = [];
    this.computePermutations(lines);
  }

  private computePermutations(lines: string[][]) {
    let input = lines;
    for (let f = 0; f < 2; f++) {
      for (let r = 0; r < 4; r++) {
        this.permutations.push(new Tile(this.id, input));
        input = rotate(input);
      }
      input = flip(input);
    }
  }
}

/**
 * Given a partial map and set of TileGroup, finds the Tile that matches the map in x,y
 */
const findMatchingTile = (
  map: Tile[][],
  x: number,
  y: number,
  tiles: TileGroup[]
): Tile | null => {
  const tilesLeft = [...tiles];
  while (tilesLeft.length) {
    const tile = tilesLeft.pop()!;
    for (const permutatedTile of tile.permutations) {
      if (y > 0 && map[y - 1][x]) {
        if (permutatedTile.borders[0] !== map[y - 1][x].borders[2]) continue;
      }
      if (x < map.length - 1 && map[y][x + 1]) {
        if (permutatedTile.borders[1] !== map[y][x + 1].borders[3]) continue;
      }
      if (y < map.length - 1 && map[y + 1][x]) {
        if (permutatedTile.borders[2] !== map[y + 1][x].borders[0]) continue;
      }
      if (x > 0 && map[y][x - 1]) {
        if (permutatedTile.borders[3] !== map[y][x - 1].borders[1]) continue;
      }
      // Matches
      return permutatedTile;
    }
  }
  return null;
};

/**
 * Extract tiles from the original input
 */
const parseTiles = (input: string[]): TileGroup[] => {
  const tiles: TileGroup[] = [];

  let currentId = "";
  let currentTile: string[][] = [];
  for (const line of input) {
    if (!line) continue;

    const re = /^Tile (?<id>\d+):$/;
    let match;
    if ((match = line.match(re))) {
      if (currentTile.length) {
        tiles.push(new TileGroup(currentId, currentTile));
        currentTile = [];
      }
      currentId = match.groups!.id;
    } else {
      currentTile.push(line.split(""));
    }
  }
  tiles.push(new TileGroup(currentId, currentTile));
  return tiles;
};

/**
 * Counts how many times a pattern appears inside an image.
 */
const countPattern = (image: string[][], pattern: number[][]) => {
  let count = 0;
  const imageHeight = image.length;
  const imageWidth = image[0].length;
  const [patternHeight, patternWidth] = pattern.reduce(
    ([y, x], p) => [Math.max(p[0], y), Math.max(p[1], x)],
    [0, 0]
  );

  for (let y = 0; y < imageHeight - patternHeight; y++) {
    for (let x = 0; x < imageWidth - patternWidth; x++) {
      const patternMatches = pattern.every(
        ([yy, xx]) => image[y + yy][x + xx] === "#"
      );
      if (patternMatches) count++;
    }
  }
  return count;
};

/**
 * Tries to complete a map given the first tile
 */
const completeMap = (firstTile: TileGroup, tiles: TileGroup[]) => {
  const width = Math.sqrt(tiles.length);

  for (const permutatedTile of firstTile.permutations)
    nextPermutation: {
      const map: Tile[][] = new Array(width)
        .fill(0)
        .map(() => new Array(width));
      let tilesLeft = [...tiles.filter((t) => t.id !== firstTile.id)];

      for (let y = 0; y < width; y++) {
        for (let x = 0; x < width; x++) {
          if (x === 0 && y === 0) {
            // First tile is always defined
            map[x][y] = permutatedTile;
            continue;
          }

          // If there is no tile for x,y, return early, there is no valid map
          const tile = findMatchingTile(map, x, y, tilesLeft);
          if (!tile) break nextPermutation;

          // Save the tile and continue with the next coords
          map[y][x] = tile;
          tilesLeft = [...tilesLeft.filter((t) => t.id !== tile.id)];
        }
      }
      return map;
    }

  return null;
};

export const part1: Solver = (input) => {
  const tiles = parseTiles(input);
  const width = Math.sqrt(tiles.length);
  const candidatesToFirstTile = [...tiles];
  let map;

  do {
    const firstTile = candidatesToFirstTile.pop()!;
    map = completeMap(firstTile, tiles);
    if (!map) continue;
  } while (!map && candidatesToFirstTile.length);

  if (!map) throw new Error("Map not found");

  return String(
    Number(map[0][0].id) *
      Number(map[0][width - 1].id) *
      Number(map[width - 1][width - 1].id) *
      Number(map[width - 1][0].id)
  );
};

export const part2: Solver = (input) => {
  const tiles = parseTiles(input);

  // Get the map
  let map: Tile[][] | null;
  const candidatesToFirstTile = [...tiles];
  do {
    const firstTile = candidatesToFirstTile.pop()!;
    map = completeMap(firstTile, tiles);
    if (!map) continue;
  } while (!map && candidatesToFirstTile.length);

  // Get a tile for the whole map
  const mapWidth = map![0][0].lines.length - 2;
  const imageWidth = map!.length * mapWidth;
  const image = new Array(imageWidth).fill(0).map(() => new Array(imageWidth));
  for (let y = 0; y < imageWidth; y++) {
    for (let x = 0; x < imageWidth; x++) {
      const tile = map![Math.floor(y / mapWidth)][Math.floor(x / mapWidth)];
      image[y][x] = tile.lines[(y % mapWidth) + 1][(x % mapWidth) + 1];
    }
  }
  const megaTile = new TileGroup("", image);

  // Prepare the dragon pattern
  const pattern = [
    "                  # ",
    "#    ##    ##    ###",
    " #  #  #  #  #  #   ",
  ].reduce((acc: number[][], line, y) => {
    return [
      ...acc,
      ...Object.entries(line.split(""))
        .filter(([, c]) => c === "#")
        .map(([x]) => [y, Number(x)]),
    ];
  }, []);

  // Find the permutationt that contains dragons
  let dragonsFound: number;
  let permutatedMap: Tile;
  for (permutatedMap of megaTile.permutations) {
    dragonsFound = countPattern(permutatedMap.lines, pattern);
    if (dragonsFound > 0) {
      break;
    }
  }

  const imageTotal = permutatedMap!.lines.reduce(
    (acc, r) => acc + r.filter((c) => c === "#").length,
    0
  );

  return String(imageTotal - pattern.length * dragonsFound!);
};
