import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../lib/readInput";

describe("Day 13", () => {
  const input = ["939", "7,13,x,x,59,x,31,19"];

  it("Part 1", () => {
    assert.equal(part1(input), "295");
  });

  describe("Part 2", () => {
    it("Example 0", () => {
      assert.equal(part2(["", "67,7"]), "335");
    });

    it("Example 1", () => {
      assert.equal(part2(["", "17,x,13,19"]), "3417");
    });

    it("Example 2", () => {
      assert.equal(part2(["", "67,7,59,61"]), "754018");
    });

    it("Example 3", () => {
      assert.equal(part2(["", "1789,37,47,1889"]), "1202161486");
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("13");
      assert.equal(part1(input), "410");
    });
    it("Part 2", async () => {
      const input = await readInput("13");
      assert.equal(part2(input), "600691418730595");
    });
  });
});
