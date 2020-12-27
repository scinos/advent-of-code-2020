import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 6", () => {
  const input = [
    "abc",
    "",
    "a",
    "b",
    "c",
    "",
    "ab",
    "ac",
    "",
    "a",
    "a",
    "a",
    "a",
    "",
    "b",
  ];

  it("Part 1", () => {
    assert.equal(part1(input), "11");
  });
  it("Part 2", () => {
    assert.equal(part2(input), "6");
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("06");
      assert.equal(part1(input), "6809");
    });
    it("Part 2", async () => {
      const input = await readInput("06");
      assert.equal(part2(input), "3394");
    });
  });
});
