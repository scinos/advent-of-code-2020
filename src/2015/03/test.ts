import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 3", () => {
  describe("Part 1 - Santa is delivering", () => {
    it("Examples from the page", () => {
      assert.equal(part1([">"]), "2");
      assert.equal(part1(["^>v<"]), "4");
      assert.equal(part1(["^v^v^v^v^v"]), "2");
    });

    it("Input file", async () => {
      const input = await readInput("2015/03");
      assert.equal(part1(input), "2081");
    });
  });

  describe("Part 2 - Santa and Robo-Santa are delivering", () => {
    it("Examples from the page", () => {
      assert.equal(part2(["^v"]), "3");
      assert.equal(part2(["^>v<"]), "3");
      assert.equal(part2(["^v^v^v^v^v"]), "11");
    });

    it("Input file", async () => {
      const input = await readInput("2015/03");
      assert.equal(part2(input), "2341");
    });
  });
});
