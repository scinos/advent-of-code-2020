import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 17", () => {
  describe("Part 1", () => {
    it("Example", () => {
      assert.equal(part1([".#.", "..#", "###"]), "112");
    });
  });
  describe("Part 2", () => {
    it("Example", () => {
      assert.equal(part2([".#.", "..#", "###"]), "848");
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("17");
      assert.equal(part1(input), "315");
    });
    it("Part 2", async () => {
      const input = await readInput("17");
      assert.equal(part2(input), "1520");
    });
  });
});
