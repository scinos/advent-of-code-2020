import { strict as assert } from "assert";
import { part1, wire } from ".";
import { readInput } from "../../lib/readInput";

describe.only("Day 7", () => {
  describe("Part 1", () => {
    it("Example", async () => {
      const input = [
        "123 -> x",
        "456 -> y",
        "x AND y -> d",
        "x OR y -> e",
        "x LSHIFT 2 -> f",
        "y RSHIFT 2 -> g",
        "NOT x -> h",
        "NOT y -> i",
      ];
      const result = await wire(input);
      assert.equal(await result.get("d"), 72);
      assert.equal(await result.get("e"), 507);
      assert.equal(await result.get("f"), 492);
      assert.equal(await result.get("g"), 114);
      assert.equal(await result.get("h"), 65412);
      assert.equal(await result.get("i"), 65079);
      assert.equal(await result.get("x"), 123);
      assert.equal(await result.get("y"), 456);
    });

    it("Input file", async () => {
      const input = await readInput("2015/07");
      assert.equal(await part1(input), "956");
    });
  });

  describe("Part 2", () => {
    it("Input file", async () => {
      const input = await readInput("2015/07");
      assert.equal(await part2(input), "40149");
    });
  });
});
