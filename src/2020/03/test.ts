import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 3", () => {
  const input = [
    "..##.......",
    "#...#...#..",
    ".#....#..#.",
    "..#.#...#.#",
    ".#...##..#.",
    "..#.##.....",
    ".#.#.#....#",
    ".#........#",
    "#.##...#...",
    "#...##....#",
    ".#..#...#.#",
  ];

  it("Part 1", () => {
    assert.equal(part1(input), "7");
  });

  it("Part 2", () => {
    assert.equal(part2(input), "336");
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("03");
      assert.equal(part1(input), "286");
    });
    it("Part 2", async () => {
      const input = await readInput("03");
      assert.equal(part2(input), "3638606400");
    });
  });
});
