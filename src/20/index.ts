/* eslint-disable no-labels */
/* eslint-disable no-cond-assign */
import { Solver } from "../run";

class Tile {
  id: string;

  lines: string[][];

  image: string[][];

  borders: string[];

  constructor(id: string, lines: string[]) {
    this.id = id;
    this.lines = lines.map((l) => l.split(""));
    this.computeBorders();
  }

  computeImage() {
    const width = this.lines[0].length - 1;
    this.image = new Array(width).fill(0).map(() => new Array(width));
    for (let y = 1; y < width + 1; y++) {
      for (let x = 1; x < width + 1; x++) {
        this.image[y - 1][x - 1] = this.lines[y][x];
      }
    }
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

  rotate(full: boolean) {
    const width = this.lines.length;
    const newLines = new Array(width).fill(0).map(() => new Array(width));
    for (let y = 0; y < width; y++) {
      for (let x = 0; x < width; x++) {
        newLines[y][x] = this.lines[width - 1 - x][y];
      }
    }
    this.lines = newLines;
    this.computeBorders();
  }

  flip(full: boolean) {
    const width = this.lines.length;
    const newLines = new Array(width).fill(0).map(() => new Array(width));
    for (let y = 0; y < width; y++) {
      for (let x = 0; x < width; x++) {
        newLines[y][x] = this.lines[width - 1 - y][x];
      }
    }
    this.lines = newLines;
    this.computeBorders();
  }

  reset() {
    this.computeBorders();
  }
}

const findMatchingTile = (
  map: Tile[][],
  x: number,
  y: number,
  tiles: Tile[]
): {
  tile: Tile;
  f: number;
  r: number;
} => {
  const tilesLeft = [...tiles];
  while (tilesLeft.length) {
    const tile = tilesLeft.pop();
    for (let f = 0; f < 2; f++, tile.flip(false)) {
      for (let r = 0; r < 4; r++, tile.rotate(false)) {
        if (y > 0 && map[y - 1][x]) {
          if (tile.borders[0] !== map[y - 1][x].borders[2]) continue;
        }
        if (x < map.length - 1 && map[y][x + 1]) {
          if (tile.borders[1] !== map[y][x + 1].borders[3]) continue;
        }
        if (y < map.length - 1 && map[y + 1][x]) {
          if (tile.borders[2] !== map[y + 1][x].borders[0]) continue;
        }
        if (x > 0 && map[y][x - 1]) {
          if (tile.borders[3] !== map[y][x - 1].borders[1]) continue;
        }
        // Matches
        return { tile, f, r };
      }
    }
  }
  return { tile: null, f: null, r: null };
};

export const part1: Solver = (input) => {
  const tiles: Tile[] = [];

  let currentId: string;
  let currentTile = [];
  for (const line of input) {
    if (!line) continue;

    const re = /^Tile (?<id>\d+):$/;
    let match;
    if ((match = line.match(re))) {
      if (currentTile.length) {
        tiles.push(new Tile(currentId, currentTile));
        currentTile = [];
      }
      currentId = match.groups.id;
    } else {
      currentTile.push(line);
    }
  }
  tiles.push(new Tile(currentId, currentTile));

  const width = Math.sqrt(tiles.length);
  const firstTiles = [...tiles];
  let found = false;
  let map;
  let transforms;
  while (firstTiles.length && !found)
    nextCandidate: {
      const firstTile = firstTiles.pop();
      firstTile.reset();
      map = new Array(width).fill(0).map(() => new Array(width));
      transforms = new Array(width).fill(0).map(() => new Array(width));

      for (let f = 0; f < 2; f++, firstTile.flip(false)) {
        for (let r = 0; r < 4; r++, firstTile.rotate(false))
          nextRotation: {
            let tilesLeft = [...tiles.filter((t) => t.id !== firstTile.id)];
            map = new Array(width).fill(0).map(() => new Array(width));
            map[0][0] = firstTile;
            transforms[0][0] = [f, r];
            for (let y = 0; y < width; y++) {
              for (let x = 0; x < width; x++) {
                if (x === 0 && y === 0) continue;
                const { tile, f, r } = findMatchingTile(map, x, y, tilesLeft);
                if (!tile) break nextRotation;
                map[y][x] = tile;
                transforms[y][x] = [f, r];
                tilesLeft = [...tilesLeft.filter((t) => t.id !== tile.id)];
              }
            }

            found = true;
            break nextCandidate;
          }
      }
    }

  return String(
    Number(map[0][0].id) *
      Number(map[0][width - 1].id) *
      Number(map[width - 1][width - 1].id) *
      Number(map[width - 1][0].id)
  );
};

export const part2: Solver = (input) => {
  const tiles: Tile[] = [];

  let currentId: string;
  let currentTile = [];
  for (const line of input) {
    if (!line) continue;

    const re = /^Tile (?<id>\d+):$/;
    let match;
    if ((match = line.match(re))) {
      if (currentTile.length) {
        tiles.push(new Tile(currentId, currentTile));
        currentTile = [];
      }
      currentId = match.groups.id;
    } else {
      currentTile.push(line);
    }
  }
  tiles.push(new Tile(currentId, currentTile));

  const width = Math.sqrt(tiles.length);
  const firstTiles = [...tiles];
  let found = false;
  let map;
  let transforms;
  while (firstTiles.length && !found)
    nextCandidate: {
      const firstTile = firstTiles.pop();
      firstTile.reset();
      map = new Array(width).fill(0).map(() => new Array(width));
      transforms = new Array(width).fill(0).map(() => new Array(width));

      for (let f = 0; f < 2; f++, firstTile.flip(false)) {
        for (let r = 0; r < 4; r++, firstTile.rotate(false))
          nextRotation: {
            let tilesLeft = [...tiles.filter((t) => t.id !== firstTile.id)];
            map = new Array(width).fill(0).map(() => new Array(width));
            map[0][0] = firstTile;
            transforms[0][0] = [f, r];
            for (let y = 0; y < width; y++) {
              for (let x = 0; x < width; x++) {
                if (x === 0 && y === 0) continue;
                const { tile, f, r } = findMatchingTile(map, x, y, tilesLeft);
                if (!tile) break nextRotation;
                map[y][x] = tile;
                transforms[y][x] = [f, r];
                tilesLeft = [...tilesLeft.filter((t) => t.id !== tile.id)];
              }
            }

            found = true;
            break nextCandidate;
          }
      }
    }

  tiles.forEach((tile) => tile.computeImage());

  const widthInMaps = Math.sqrt(tiles.length);
  const mapWidth = tiles[0].image.length - 1;
  const imageWidth = widthInMaps * mapWidth;
  const image = new Array(imageWidth).fill(0).map(() => new Array(imageWidth));

  for (let y = 0; y < imageWidth; y++) {
    for (let x = 0; x < imageWidth; x++) {
      const tile = map[Math.floor(y / mapWidth)][Math.floor(x / mapWidth)];
      image[y][x] = tile.image[y % mapWidth][x % mapWidth];
    }
  }

  const megaTile = new Tile(
    "1",
    image.map((row) => row.join(""))
  );

  const dragonPattern = [
    "                  # ",
    "#    ##    ##    ###",
    " #  #  #  #  #  #   ",
  ].map((r) => r.split(""));

  for (let f = 0; f < 2; f++, megaTile.flip(false)) {
    for (let r = 0; r < 4; r++, megaTile.rotate(false)) {
      let dragonsFound = 0;
      for (let y = 0; y < imageWidth - dragonPattern.length; y++) {
        for (let x = 0; x < imageWidth - dragonPattern[0].length; x++)
          nextDragon: {
            for (let yy = 0; yy < dragonPattern.length; yy++) {
              for (let xx = 0; xx < dragonPattern[0].length; xx++) {
                if (dragonPattern[yy][xx] !== "#") continue;
                if (megaTile.lines[y + yy][x + xx] !== "#") {
                  break nextDragon;
                }
              }
            }
            dragonsFound++;
          }
      }
      console.log(f, r, dragonsFound);
      if (dragonsFound) {
        const dragonTotal = dragonPattern.reduce(
          (acc, r) => acc + r.filter((c) => c === "#").length,
          0
        );
        const imageTotal = megaTile.lines.reduce(
          (acc, r) => acc + r.filter((c) => c === "#").length,
          0
        );
        return String(imageTotal - dragonTotal * dragonsFound);
      }
    }
  }
  throw new Error("not found");
};
