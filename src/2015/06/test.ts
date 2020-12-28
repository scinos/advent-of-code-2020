import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 6", () => {
  describe("Part 1", () => {
    it("turn on 0,0 through 999,999", () => {
      assert.equal(part1(["turn on 0,0 through 999,999"]), "1000000");
    });
    it("toggle 0,0 through 999,0", () => {
      assert.equal(part1(["toggle 0,0 through 999,0"]), "1000");
      assert.equal(
        part1(["turn on 0,0 through 999,0", "toggle 0,0 through 999,0"]),
        "0"
      );
      assert.equal(
        part1(["turn on 0,0 through 99,0", "toggle 0,0 through 999,0"]),
        "900"
      );
    });
    it("turn off 499,499 through 500,500", () => {
      assert.equal(
        part1([
          "turn on 0,0 through 999,999",
          "turn off 499,499 through 500,500",
        ]),
        "999996"
      );
    });
    it("input", async () => {
      const input = await readInput("2015/06");
      assert.equal(part1(input), "569999");
    });
  });

  describe("Part 2", () => {
    it("turn on 0,0 through 0,0", () => {
      assert.equal(part2(["turn on 0,0 through 0,0"]), "1");
    });
    it("toggle 0,0 through 999,999", () => {
      assert.equal(part2(["toggle 0,0 through 999,999"]), "2000000");
    });
    it("input", async () => {
      const input = await readInput("2015/06");
      assert.equal(part2(input), "17836115");
    });
  });
});
