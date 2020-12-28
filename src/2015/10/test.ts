import { strict as assert } from "assert";
import { part1, part2, sequence } from ".";
import { readInput } from "../../lib/readInput";

describe.only("Day 10: Elves Look, Elves Say", () => {
  describe("Sequence generator", () => {
    it("Generates the next step in the sequence", () => {
      assert.equal(sequence("1"), "11");
      assert.equal(sequence("11"), "21");
      assert.equal(sequence("21"), "1211");
      assert.equal(sequence("1211"), "111221");
      assert.equal(sequence("111221"), "312211");
    });
  });

  describe("Part 1", () => {
    it("input", async () => {
      const input = await readInput("2015/10");
      assert.equal(part1(input), "252594");
    });
  });

  describe("Part 2", () => {
    it("input", async () => {
      const input = await readInput("2015/10");
      assert.equal(part2(input), "3579328");
    });
  });
});
