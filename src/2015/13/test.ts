import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 13: Corporate Policy", () => {
  describe("Part 1", () => {
    it("input", async () => {
      const input = await readInput("2015/13");
      assert.equal(part1(input), "733");
    });
  });

  describe("Part 2", () => {
    it("input", async () => {
      const input = await readInput("2015/13");
      assert.equal(part2(input), "725");
    });
  });
});
