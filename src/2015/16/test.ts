import { strict as assert } from "assert";
import { part1, part2, extract } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 16: Aunt Sue", () => {
  describe("Spec extractor", () => {
    it("Extracts the specs", () => {
      const spec = "Sue 1: cars: 9, akitas: 3, goldfish: 0";
      assert.deepEqual(extract(spec), {
        number: 1,
        things: {
          cars: 9,
          akitas: 3,
          goldfish: 0,
        },
      });
    });
  });

  describe("Part 1", () => {
    it("input", async () => {
      const input = await readInput("2015/16");
      assert.equal(part1(input), "373");
    });
  });

  describe("Part 2", () => {
    it("input", async () => {
      const input = await readInput("2015/16");
      assert.equal(part2(input), "260");
    });
  });
});
