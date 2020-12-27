import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 16", () => {
  describe("Part 1", () => {
    it("Example", () => {
      assert.equal(
        part1([
          "class: 1-3 or 5-7",
          "row: 6-11 or 33-44",
          "seat: 13-40 or 45-50",
          "",
          "your ticket:",
          "7,1,14",
          "",
          "nearby tickets:",
          "7,3,47",
          "40,4,50",
          "55,2,20",
          "38,6,12",
        ]),
        "71"
      );
    });
  });
  describe("Part 2", () => {
    it("Example", () => {
      assert.equal(
        part2([
          "departure class: 0-1 or 4-19",
          "row: 0-5 or 8-19",
          "departure seat: 0-13 or 16-19",
          "",
          "your ticket:",
          "11,12,13",
          "",
          "nearby tickets:",
          "3,9,18",
          "15,1,5",
          "5,14,9",
        ]),
        "156"
      );
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("16");
      assert.equal(part1(input), "27802");
    });
    it("Part 2", async () => {
      const input = await readInput("16");
      assert.equal(part2(input), "279139880759");
    });
  });
});
