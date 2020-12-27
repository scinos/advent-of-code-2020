import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 5", () => {
  it("Part 1", () => {
    assert.equal(part1(["FBFBBFFRLR"]), "357");
    assert.equal(part1(["BFFFBBFRRR"]), "567");
    assert.equal(part1(["FFFBBBFRRR"]), "119");
    assert.equal(part1(["BBFFBBFRLL"]), "820");
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("05");
      assert.equal(part1(input), "816");
    });
    it("Part 2", async () => {
      const input = await readInput("05");
      assert.equal(part2(input), "539");
    });
  });
});
