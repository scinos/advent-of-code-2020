import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 4", () => {
  describe("Part 1 - Hash with five zeroes", () => {
    it("Examples from the page", () => {
      assert.equal(part1(["abcdef"]), "609043");
      assert.equal(part1(["pqrstuv"]), "1048970");
    });

    it("Input", async () => {
      const input = await readInput("2015/04");
      assert.equal(part1(input), "254575");
    });
  });

  describe("Part 2 - Hash with six zeroes", () => {
    it("Input", async () => {
      const input = await readInput("2015/04");
      assert.equal(part2(input), "1038736");
    });
  });
});
