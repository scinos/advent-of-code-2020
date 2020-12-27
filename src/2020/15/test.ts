import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 15", () => {
  const input: string[] = ["0,3,6"];

  describe("Part 1", () => {
    it("Example", () => {
      assert.equal(part1(input), "436");
    });
  });
  describe("Part 2", () => {
    it("Example", () => {
      assert.equal(part2(input), "175594");
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("15");
      assert.equal(part1(input), "763");
    });
    it("Part 2", async () => {
      const input = await readInput("15");
      assert.equal(part2(input), "1876406");
    });
  });
});
