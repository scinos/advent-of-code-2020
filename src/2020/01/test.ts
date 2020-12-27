import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 1", () => {
  it("2 factors", () => {
    const input = ["1721", "979", "366", "299", "675", "1456"];
    assert.equal(part1(input), "514579");
  });

  it("3 factors", () => {
    const input = ["1721", "979", "366", "299", "675", "1456"];
    assert.equal(part2(input), "241861950");
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("2020/01");
      assert.equal(part1(input), "326211");
    });
    it("Part 2", async () => {
      const input = await readInput("2020/01");
      assert.equal(part2(input), "131347190");
    });
  });
});
