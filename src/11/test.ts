import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../lib/readInput";

describe("Day 11", () => {
  const input = [
    "L.LL.LL.LL",
    "LLLLLLL.LL",
    "L.L.L..L..",
    "LLLL.LL.LL",
    "L.LL.LL.LL",
    "L.LLLLL.LL",
    "..L.L.....",
    "LLLLLLLLLL",
    "L.LLLLLL.L",
    "L.LLLLL.LL",
  ];

  it("Part 1", () => {
    assert.equal(part1(input), "37");
  });

  it("Part 2", () => {
    assert.equal(part2(input), "26");
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("11");
      assert.equal(part1(input), "2424");
    });
    it("Part 2", async () => {
      const input = await readInput("11");
      assert.equal(part2(input), "2208");
    });
  });
});
