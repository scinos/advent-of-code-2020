import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 21", () => {
  const input = [
    "mxmxvkd kfcds sqjhc nhms (contains dairy, fish)",
    "trh fvjkl sbzzf mxmxvkd (contains dairy)",
    "sqjhc fvjkl (contains soy)",
    "sqjhc mxmxvkd sbzzf (contains fish)",
  ];
  describe("Examples", () => {
    it("Part 1", () => {
      assert.equal(part1(input), "5");
    });
    it("Part 2", () => {
      assert.equal(part2(input), "mxmxvkd,sqjhc,fvjkl");
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("21");
      assert.equal(part1(input), "2826");
    });
    it("Part 2", async () => {
      const input = await readInput("21");
      assert.equal(
        part2(input),
        "pbhthx,sqdsxhb,dgvqv,csnfnl,dnlsjr,xzb,lkdg,rsvlb"
      );
    });
  });
});
