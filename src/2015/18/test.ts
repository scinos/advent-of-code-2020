import { strict as assert } from "assert";
import { part1, part2, CA, extract } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 18: Like a GIF For Your Yard", () => {
  describe("Initial State Extractor", () => {
    it("Extracts the initial state", () => {
      assert.deepEqual(extract(["#.", ".#"]), [
        [true, false],
        [false, true],
      ]);
    });
  });

  describe("CA", () => {
    it("Iterates", () => {
      let ca;

      ca = new CA([
        [false, true],
        [true, false],
      ]);
      ca.iterate();
      assert.deepEqual(ca.getState(), [
        [false, false],
        [false, false],
      ]);

      ca = new CA([
        [true, true],
        [true, false],
      ]);
      ca.iterate();
      assert.deepEqual(ca.getState(), [
        [true, true],
        [true, true],
      ]);
    });

    it("Example from the page", () => {
      const ca = new CA([
        [false, true, false, true, false, true],
        [false, false, false, true, true, false],
        [true, false, false, false, false, true],
        [false, false, true, false, false, false],
        [true, false, true, false, false, true],
        [true, true, true, true, false, false],
      ]);

      ca.iterate();
      assert.deepEqual(ca.getState(), [
        [false, false, true, true, false, false],
        [false, false, true, true, false, true],
        [false, false, false, true, true, false],
        [false, false, false, false, false, false],
        [true, false, false, false, false, false],
        [true, false, true, true, false, false],
      ]);

      ca.iterate();
      assert.deepEqual(ca.getState(), [
        [false, false, true, true, true, false],
        [false, false, false, false, false, false],
        [false, false, true, true, true, false],
        [false, false, false, false, false, false],
        [false, true, false, false, false, false],
        [false, true, false, false, false, false],
      ]);

      ca.iterate();
      assert.deepEqual(ca.getState(), [
        [false, false, false, true, false, false],
        [false, false, false, false, false, false],
        [false, false, false, true, false, false],
        [false, false, true, true, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
      ]);

      ca.iterate();
      assert.deepEqual(ca.getState(), [
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, true, true, false, false],
        [false, false, true, true, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
      ]);
    });
  });

  describe("Part 1 - ON Lights after 100 steps", () => {
    it("Input file", async () => {
      const input = await readInput("2015/18");
      assert.equal(part1(input), "1061");
    });
  });

  describe("Part 2 - ON Lights after 100 steps (+4 corners)", () => {
    it("Input file", async () => {
      const input = await readInput("2015/18");
      const result = part2(input);
      assert.equal(result, "1006");
    });
  });
});
