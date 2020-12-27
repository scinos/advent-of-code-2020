import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 1", () => {
  describe("Part 1 - Destination floor", () => {
    it("Detects parentheses", () => {
      assert.equal(part1(["("]), "1");
      assert.equal(part1([")"]), "-1");
    });

    it("Examples from the page", () => {
      assert.equal(part1(["(())"]), "0");
      assert.equal(part1(["()()"]), "0");
      assert.equal(part1(["((("]), "3");
      assert.equal(part1(["(()(()("]), "3");
      assert.equal(part1(["))((((("]), "3");
      assert.equal(part1(["())"]), "-1");
      assert.equal(part1(["))("]), "-1");
      assert.equal(part1([")))"]), "-3");
      assert.equal(part1([")())())"]), "-3");
    });

    it("Input file", async () => {
      const input = await readInput("2015/01");
      assert.equal(part1(input), "138");
    });
  });

  describe("Part 2 - Going to basement", () => {
    it("detects getting to the basement", () => {
      assert.equal(part2([")"]), "1");
      assert.equal(part2(["())"]), "3");
    });
    it("example 1", () => {
      assert.equal(part2([")"]), "1");
    });
    it("example 2", () => {
      assert.equal(part2(["()())"]), "5");
    });
    it("Input file", async () => {
      const input = await readInput("2015/01");
      assert.equal(part2(input), "1771");
    });
  });
});
