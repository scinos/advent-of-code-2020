import type { Solver } from "../../runner";

const CODE_A = "a".charCodeAt(0);
const CODE_I = "i".charCodeAt(0);
const CODE_L = "l".charCodeAt(0);
const CODE_O = "o".charCodeAt(0);
const CODE_Z = "z".charCodeAt(0);

/**
 * This validator runs first and it will eliminate virtually all invalid passwords. This should be
 * as optimized as possible
 */
const has3ConsecutiveCharacters = (charCodes: number[]): boolean => {
  for (let i = 0; i < charCodes.length - 2; i++) {
    const code = charCodes[i];

    const nextCode1 = charCodes[i + 1];
    if (code + 1 !== nextCode1) continue;

    const nextCode2 = charCodes[i + 2];
    if (code + 2 !== nextCode2) continue;

    return true;
  }
  return false;
};

const hasAPairsOfCharacters = (charCodes: number[]): boolean => {
  let lastRepeatedCode = null;
  let i;
  let h;

  for (i = 0; i < charCodes.length - 1; i++) {
    if (charCodes[i] === charCodes[i + 1]) {
      lastRepeatedCode = charCodes[i];
      break;
    }
  }
  if (lastRepeatedCode === null) {
    return false;
  }

  for (h = i + 2; h < charCodes.length - 1; h++) {
    if (
      charCodes[h] === charCodes[h + 1] &&
      lastRepeatedCode !== charCodes[h]
    ) {
      return true;
    }
  }
  return false;
};

const isValid = (charCodes: number[]) =>
  has3ConsecutiveCharacters(charCodes) && hasAPairsOfCharacters(charCodes);

/**
 * Early check for invalid charcters (i, o, l) avoid generating invalid passords.
 * Note that if the original password had invalid characters, they will be still part
 * of the output until the increment process reaches them.
 */
const increment = (charCodes: number[]) => {
  const len = charCodes.length;
  for (let i = len - 1; i >= 0; i--) {
    const nextCode = charCodes[i] + 1;
    if (nextCode === CODE_I || nextCode === CODE_O || nextCode === CODE_L) {
      charCodes[i] = nextCode + 1;
      break;
    }
    if (nextCode <= 122) {
      charCodes[i] = nextCode;
      break;
    }
    charCodes[i] = CODE_A;
  }
  return charCodes;
};

export function* nextPassword(pass: string): Generator<string, void, void> {
  let candidate = pass.split("").map((c) => c.charCodeAt(0));

  while (true) {
    do {
      candidate = increment(candidate);
    } while (!isValid(candidate));
    yield candidate.map((c) => String.fromCharCode(c)).join("");
  }
}

export const part1: Solver = (input) => {
  const iter = nextPassword(input[0]);
  const val = iter.next().value as string;
  return val;
};

export const part2: Solver = (input) => {
  const iter = nextPassword(input[0]);
  iter.next();
  return iter.next().value as string;
};
