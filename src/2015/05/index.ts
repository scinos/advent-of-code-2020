import type { Solver } from "../../runner";

export const part1: Solver = (input) => {
  const forbidden = /(ab|cd|pq|xy)/;
  const vowels = /(?:.*[aeiou]){3,}/;
  const double = /(.)\1/;

  const validStrings = input.filter(
    (line) => !forbidden.test(line) && vowels.test(line) && double.test(line)
  );

  return String(validStrings.length);
};

export const part2: Solver = (input) => {
  const dupes = /(.{2}).*\1/;
  const repeats = /(.).\1/;

  const validStrings = input.filter(
    (line) => line.match(dupes) && line.match(repeats)
  );
  return String(validStrings.length);
};
