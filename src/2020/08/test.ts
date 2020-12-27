import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 8", () => {
  const input = [
    "nop +0",
    "acc +1",
    "jmp +4",
    "acc +3",
    "jmp -3",
    "acc -99",
    "acc +1",
    "jmp -4",
    "acc +6",
  ];

  it("Part 1", () => {
    assert.equal(part1(input), "5");
  });
  it("Part 2", () => {
    assert.equal(part2(input), "8");
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("08");
      assert.equal(part1(input), "1179");
    });
    it("Part 2", async () => {
      const input = await readInput("08");
      assert.equal(part2(input), "1089");
    });
  });
});
