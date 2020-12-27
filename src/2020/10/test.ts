import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 10", () => {
  const input = ["16", "10", "15", "5", "1", "11", "7", "19", "6", "12", "4"];
  const input2 = [
    "28",
    "33",
    "18",
    "42",
    "31",
    "14",
    "46",
    "20",
    "48",
    "47",
    "24",
    "23",
    "49",
    "45",
    "19",
    "38",
    "39",
    "11",
    "1",
    "32",
    "25",
    "35",
    "8",
    "17",
    "7",
    "9",
    "4",
    "2",
    "34",
    "10",
    "3",
  ];

  it("Part 1", () => {
    assert.equal(part1(input), "35");
  });
  it("Part 1-2", () => {
    assert.equal(part1(input2), "220");
  });

  describe("Part 2", () => {
    it("Example 1", () => {
      assert.equal(part2(input), "8");
    });
    it("Example 2", () => {
      assert.equal(part2(input2), "19208");
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("2020/10");
      assert.equal(part1(input), "2112");
    });
    it("Part 2", async () => {
      const input = await readInput("2020/10");
      assert.equal(part2(input), "3022415986688");
    });
  });
});
