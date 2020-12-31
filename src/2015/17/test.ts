import { strict as assert } from "assert";
import { part1, part2, sumCombinations } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 17: No Such Thing as Too Much", () => {
  describe("Combinations", () => {
    it("Example from the page", () => {
      const result = Array.from(sumCombinations(25, [20, 15, 10, 5, 5]));
      assert.deepEqual(result, [
        [5, 5, 15],
        [5, 20],
        [5, 20],
        [10, 15],
      ]);
    });

    it("Duplicated elements", () => {
      const result = Array.from(sumCombinations(25, [20, 20, 5, 5]));
      assert.deepEqual(result, [
        [5, 20],
        [5, 20],
        [5, 20],
        [5, 20],
      ]);
    });
  });

  describe("Part 1 - All combinations", () => {
    it("input", async () => {
      const input = await readInput("2015/17");
      assert.equal(part1(input), "654");
    });
  });

  describe("Part 2 - Minimum combinations", () => {
    it("input", async () => {
      const input = await readInput("2015/17");
      assert.equal(part2(input), "57");
    });
  });
});
