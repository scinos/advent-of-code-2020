import type { Solver } from "../../runner";

export const measures = (line: string): number[] => {
  const re = /^([0-9]+)x([0-9]+)x([0-9]+)$/;
  const [, l, w, h] = re.exec(line)!;

  // Numerically sort the measures for consistency (similar to rotating
  // the 3D object)
  return [l, w, h].map((n) => Number(n)).sort((a, b) => a - b);
};

export const part1: Solver = (input) => {
  const m: number[][] = input.map(measures);
  const result = m.reduce(
    (total, [l, w, h]) => total + (2 * l * w + 2 * w * h + 2 * h * l + l * w),
    0
  );
  return String(result);
};

export const part2: Solver = (input) => {
  const m: number[][] = input.map(measures);
  const result = m.reduce(
    (total, [l, w, h]) => total + (l * 2 + w * 2 + l * w * h),
    0
  );
  return String(result);
};
