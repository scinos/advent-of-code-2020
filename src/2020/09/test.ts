import { strict as assert } from "assert";
import { part1, part2, findGap, findMinMax } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 9", () => {
  const input = [
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576,
  ];

  it("Find gap", () => {
    assert.equal(findGap(input, 5), 127);
  });
  it("Find min/max", () => {
    assert.deepEqual(findMinMax(input, 127), [15, 47]);
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("09");
      assert.equal(part1(input), "217430975");
    });
    it("Part 2", async () => {
      const input = await readInput("09");
      assert.equal(part2(input), "28509180");
    });
  });
});
