import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 14", () => {
  const input = [
    "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
    "mem[8] = 11",
    "mem[7] = 101",
    "mem[8] = 0",
  ];

  describe("Part 1", () => {
    it("Example", () => {
      assert.equal(part1(input), "165");
    });
  });

  describe("Part 2", () => {
    it("Example 0", () => {
      assert.equal(
        part2([
          "mask = 000000000000000000000000000000X1001X",
          "mem[42] = 100",
          "mask = 00000000000000000000000000000000X0XX",
          "mem[26] = 1",
        ]),
        "208"
      );
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("14");
      assert.equal(part1(input), "9879607673316");
    });
    it("Part 2", async () => {
      const input = await readInput("14");
      assert.equal(part2(input), "3435342392262");
    });
  });
});
