import { strict as assert } from "assert";
import { part1 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 25", () => {
  const input = ["5764801", "17807724"];
  describe("Examples", () => {
    it("Part 1", () => {
      assert.equal(part1(input), "14897079");
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("2020/25");
      assert.equal(part1(input), "9714832");
    });
  });
});
