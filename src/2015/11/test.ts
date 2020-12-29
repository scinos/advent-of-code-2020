import { strict as assert } from "assert";
import { part1, part2, nextPassword } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 11: Corporate Policy", () => {
  describe("Part 1", () => {
    it("input", async () => {
      const input = await readInput("2015/11");
      assert.equal(part1(input), "cqjxxyzz");
    });
  });

  describe("Part 2", () => {
    it("input", async () => {
      const input = await readInput("2015/11");
      assert.equal(part2(input), "cqkaabcc");
    });
  });
});
