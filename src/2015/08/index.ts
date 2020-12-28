import type { Solver } from "../../runner";

export const decode = (input: string): string =>
  input
    .replace(/\\\\/g, "#")
    .replace(/\\"/g, "!")
    .replace(/"/g, "")
    .replace(/\\x[0-9a-z]{2}/g, "@");

export const encode = (input: string): string => {
  const r = input.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `"${r}"`;
};

export const part1: Solver = (lines) => {
  const result = { code: 0, char: 0 };

  lines.forEach((line) => {
    result.code += line.length;
    result.char += decode(line).length;
  });

  return String(result.code - result.char);
};

export const part2: Solver = (lines) => {
  const result = { code: 0, char: 0 };

  lines.forEach((line) => {
    result.code += line.length;
    result.char += encode(line).length;
  });

  return String(result.char - result.code);
};
