import { strict as assert } from "assert";
import { part1, part2, measures } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 2", () => {
  describe("Measures", () => {
    it("Extracts the measures", () => {
      assert.deepEqual(measures("1x2x3"), [1, 2, 3]);
      assert.deepEqual(measures("1x1x1"), [1, 1, 1]);
      assert.deepEqual(measures("100x100x100"), [100, 100, 100]);
    });
    it("Sorts the measures", () => {
      assert.deepEqual(measures("1x2x3"), [1, 2, 3]);
      assert.deepEqual(measures("1x3x2"), [1, 2, 3]);
      assert.deepEqual(measures("3x2x1"), [1, 2, 3]);
    });
  });

  describe("Part 1 - Square feet of wrapping paper", () => {
    it("Examples from the page", () => {
      assert.equal(part1(["2x3x4"]), "58");
      assert.equal(part1(["1x1x10"]), "43");
    });

    it("Input file", async () => {
      const input = await readInput("2015/02");
      assert.equal(part1(input), "1586300");
    });
  });

  describe("Part 2 - Feet of ribbon", () => {
    it("Examples from the page", () => {
      assert.equal(part2(["2x3x4"]), "34");
      assert.equal(part2(["1x1x10"]), "14");
    });

    it("Input file", async () => {
      const input = await readInput("2015/02");
      assert.equal(part2(input), "3737498");
    });
  });
});
