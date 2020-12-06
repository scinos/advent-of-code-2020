import { promises as fs } from "fs";

export const readInput = async (day: string): Promise<string[]> => {
  const input = await fs.readFile(`./inputs/${day}.txt`, "utf-8");
  const lines = input.split("\n");
  return lines;
};

export const reduceGroup = <T>(
  input: string[],
  reducer: (group: string[]) => T
): T[] => {
  const result: T[] = [];
  let currentGroup: string[] = [];

  for (let i = 0; i <= input.length; i++) {
    const line = input[i];
    if (line === "" || i === input.length) {
      result.push(reducer(currentGroup));
      currentGroup = [];
    } else {
      currentGroup.push(line);
    }
  }
  return result;
};
