import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../lib/readInput";

describe("Day 12", () => {
  const input = ["F10", "N3", "F7", "R90", "F11"];

  it("Part 1", () => {
    assert.equal(part1(input), "25");
  });

  it("Part 2", () => {
    assert.equal(part2(input), "286");
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("12");
      assert.equal(part1(input), "636");
    });
    it("Part 2", async () => {
      const input = await readInput("12");
      assert.equal(part2(input), "26841");
    });
  });
});
