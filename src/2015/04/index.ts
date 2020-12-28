import crypto from "crypto";
import type { Solver } from "../../runner";

const mining = (size: number, seed: string) => {
  const re = RegExp(`^0{${size}}`);
  const md5 = crypto.createHash("md5");
  let i = 0;
  while (
    !md5
      .copy()
      .update(`${seed}${++i}`)
      .digest("hex")
      .match(re)
  ) {}
  return i;
};

export const part1: Solver = (input) => {
  return String(mining(5, input[0]));
};

export const part2: Solver = (input) => {
  return String(mining(6, input[0]));
};
