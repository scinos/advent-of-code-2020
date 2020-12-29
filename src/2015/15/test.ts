import { strict as assert } from "assert";
import { part1, part2, extract, generateSplits } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 15: Science for Hungry People", () => {
  describe("Spec extractor", () => {
    it("Extracts the specs", () => {
      const spec =
        "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8";
      assert.deepEqual(extract(spec), {
        capacity: -1,
        durability: -2,
        flavor: 6,
        texture: 3,
        calories: 8,
      });
    });
  });

  describe("Partitions", () => {
    it("Generates the partitions (size 2)", () => {
      const p = Array.from(generateSplits(2, 5));
      assert.deepEqual(p, [
        [0, 5],
        [1, 4],
        [2, 3],
        [3, 2],
        [4, 1],
        [5, 0],
      ]);
    });

    it("Generates the partitions (size 3)", () => {
      const p = Array.from(generateSplits(3, 5));
      assert.deepEqual(p, [
        [0, 0, 5],
        [0, 1, 4],
        [0, 2, 3],
        [0, 3, 2],
        [0, 4, 1],
        [0, 5, 0],
        [1, 0, 4],
        [1, 1, 3],
        [1, 2, 2],
        [1, 3, 1],
        [1, 4, 0],
        [2, 0, 3],
        [2, 1, 2],
        [2, 2, 1],
        [2, 3, 0],
        [3, 0, 2],
        [3, 1, 1],
        [3, 2, 0],
        [4, 0, 1],
        [4, 1, 0],
        [5, 0, 0],
      ]);
    });
  });

  describe("Part 1 - Total score", () => {
    it("Example from the page", () => {
      const result = part1([
        "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8",
        "Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3",
      ]);

      assert.equal(result, "62842880");
    });

    it("Input file", async () => {
      const input = await readInput("2015/15");
      const result = part1(input);
      assert.equal(result, "13882464");
    });
  });

  describe("Part 2 - Total score with 500 calories", () => {
    it("Example from the page", () => {
      const result = part2([
        "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8",
        "Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3",
      ]);

      assert.equal(result, "57600000");
    });

    it("Input file", async () => {
      const input = await readInput("2015/15");
      assert.equal(part2(input), "11171160");
    });
  });
});
