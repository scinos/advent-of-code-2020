import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 18", () => {
  describe("Part 1", () => {
    it("Example 1", () => {
      assert.equal(part1(["1 + 2 * 3 + 4 * 5 + 6"]), "71");
    });
    it("Example 2", () => {
      assert.equal(part1(["1 + (2 * 3) + (4 * (5 + 6))"]), "51");
    });
  });
  describe("Part 2", () => {
    it("Example 1", () => {
      assert.equal(part2(["1 + 2 * 3 + 4 * 5 + 6"]), "231");
    });
    it("Example 2", () => {
      assert.equal(part2(["1 + (2 * 3) + (4 * (5 + 6))"]), "51");
    });
    it("Example 3", () => {
      assert.equal(part2(["2 * 3 + (4 * 5)"]), "46");
    });
    it("Example 4", () => {
      assert.equal(part2(["5 + (8 * 3 + 9 + 3 * 4 * 3)"]), "1445");
    });
    it("Example 5", () => {
      assert.equal(
        part2(["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"]),
        "669060"
      );
    });
    it("Example 6", () => {
      assert.equal(
        part2(["((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"]),
        "23340"
      );
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("18");
      assert.equal(part1(input), "209335026987");
    });
    it("Part 2", async () => {
      const input = await readInput("18");
      assert.equal(part2(input), "33331817392479");
    });
  });
});
