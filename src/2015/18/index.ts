import type { Solver } from "../../runner";

export const extract = (input: string[]): boolean[][] => {
  const result: boolean[][] = input.map((line) =>
    line.split("").map((c) => c === "#")
  );
  return result;
};

/**
 * Creates a matrix of size WxH, using 0 for all the values
 */
function matrix(w: number, h: number): boolean[][] {
  return new Array(w).fill(0).map(() => new Array(h).fill(false));
}

export class CA {
  w: number;

  h: number;

  state: boolean[][];

  constructor(state: boolean[][]) {
    this.w = state[0].length;
    this.h = state.length;

    // this.state is a matrix like <state> with a 'ring'
    // of 0 values around it.
    this.state = matrix(this.w + 2, this.h + 2);
    for (let x = 1; x < this.w + 1; x++) {
      for (let y = 1; y < this.h + 1; y++) {
        this.state[x][y] = state[x - 1][y - 1];
      }
    }
  }

  /**
   * Returns the actual state of the CA.
   *
   * This is the this.state matrix without the outer ring.
   */
  getState(): boolean[][] {
    const state: boolean[][] = [];
    for (let x = 1; x < this.w + 1; x++) {
      state[x - 1] = [];
      for (let y = 1; y < this.h + 1; y++) {
        state[x - 1][y - 1] = this.state[x][y];
      }
    }

    return state;
  }

  iterate(): void {
    const newState = matrix(this.w + 2, this.h + 2);

    for (let x = 1; x < this.state.length - 1; x++) {
      const row = this.state[x];
      const newRow = newState[x];
      for (let y = 1; y < row.length - 1; y++) {
        const n = this.activeNeighbors(x, y);
        const state = this.state[x][y];

        if (
          (state === true && (n === 2 || n === 3)) ||
          (state === false && n === 3)
        ) {
          newRow[y] = true;
        } else {
          newRow[y] = false;
        }
      }
    }
    this.state = newState;
  }

  activeNeighbors(x: number, y: number): number {
    let total = 0;
    if (this.state[x - 1][y - 1]) total++;
    if (this.state[x][y - 1]) total++;
    if (this.state[x + 1][y - 1]) total++;
    if (this.state[x - 1][y]) total++;
    if (this.state[x + 1][y]) total++;
    if (this.state[x - 1][y + 1]) total++;
    if (this.state[x][y + 1]) total++;
    if (this.state[x + 1][y + +1]) total++;
    return total;
  }

  set(x: number, y: number, v: boolean): void {
    this.state[x + 1][y + 1] = v;
  }
}

export const part1: Solver = (input) => {
  const ca = new CA(extract(input));

  for (let i = 0; i < 100; i++) {
    ca.iterate();
  }

  return String(
    ca
      .getState()
      .reduce((a, b) => [...a, ...b])
      .filter((c) => c).length
  );
};

export const part2: Solver = (input) => {
  const ca = new CA(extract(input));
  ca.set(0, 0, true);
  ca.set(99, 0, true);
  ca.set(0, 99, true);
  ca.set(99, 99, true);

  for (let i = 0; i < 100; i++) {
    ca.iterate();
    ca.set(0, 0, true);
    ca.set(99, 0, true);
    ca.set(0, 99, true);
    ca.set(99, 99, true);
  }

  return String(
    ca
      .getState()
      .reduce((a, b) => a.concat(b), [])
      .filter((c) => c).length
  );
};
