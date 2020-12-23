import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../lib/readInput";

describe("Day 22", () => {
  const input = [
    "Player 1:",
    "9",
    "2",
    "6",
    "3",
    "1",
    "",
    "Player 2:",
    "5",
    "8",
    "4",
    "7",
    "10",
  ];
  describe("Examples", () => {
    it("Part 1", () => {
      assert.equal(part1(input), "306");
    });
    it("Part 2", () => {
      assert.equal(part2(input), "291");
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("22");
      assert.equal(part1(input), "33421");
    });
    it("Part 2", async () => {
      const input = await readInput("22");
      assert.equal(part2(input), "33651");
    });
  });
});
