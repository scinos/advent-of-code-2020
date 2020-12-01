import { promises as fs } from "fs";

export const readInput = async (day: string): Promise<string[]> => {
  const input = await fs.readFile(`./inputs/${day}.txt`, "utf-8");
  const lines = input.split("\n");
  return lines;
};
