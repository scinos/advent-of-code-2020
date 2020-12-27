import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 2", () => {
  it("Part 1", () => {
    const input = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];
    assert.equal(part1(input), "2");
  });

  it("Part 2", () => {
    const input = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];
    assert.equal(part2(input), "1");
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("2020/02");
      assert.equal(part1(input), "638");
    });
    it("Part 2", async () => {
      const input = await readInput("2020/02");
      assert.equal(part2(input), "699");
    });
  });
});
