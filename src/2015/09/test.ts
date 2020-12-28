import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 9", () => {
  describe("Part 1", () => {
    it("Example", () => {
      assert.equal(
        part1([
          "London to Dublin = 464",
          "London to Belfast = 518",
          "Dublin to Belfast = 141",
        ]),
        "605"
      );
    });

    it("input", async () => {
      const input = await readInput("2015/09");
      assert.equal(part1(input), "251");
    });
  });

  describe("Part 2", () => {
    it("Example", () => {
      assert.equal(
        part2([
          "London to Dublin = 464",
          "London to Belfast = 518",
          "Dublin to Belfast = 141",
        ]),
        "982"
      );
    });

    it("input", async () => {
      const input = await readInput("2015/09");
      assert.equal(part2(input), "898");
    });
  });
});
