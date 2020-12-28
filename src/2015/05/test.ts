import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 5", () => {
  describe("Part 1", () => {
    it("ugknbfddgicrmopn", () => {
      assert.equal(part1(["ugknbfddgicrmopn"]), "1");
    });
    it("aaa", () => {
      assert.equal(part1(["aaa"]), "1");
    });
    it("jchzalrnumimnmhp", () => {
      assert.equal(part1(["jchzalrnumimnmhp"]), "0");
    });
    it("haegwjzuvuyypxyu", () => {
      assert.equal(part1(["haegwjzuvuyypxyu"]), "0");
    });
    it("dvszwmarrgswjxmb", () => {
      assert.equal(part1(["dvszwmarrgswjxmb"]), "0");
    });
    it("input", async () => {
      const input = await readInput("2015/05");
      assert.equal(part1(input), "258");
    });
  });

  describe("Part 2", () => {
    it("qjhvhtzxzqqjkmpb", () => {
      assert.equal(part2(["qjhvhtzxzqqjkmpb"]), "1");
    });
    it("xxyxx", () => {
      assert.equal(part2(["xxyxx"]), "1");
    });
    it("uurcxstgmygtbstg", () => {
      assert.equal(part2(["uurcxstgmygtbstg"]), "0");
    });
    it("ieodomkazucvgmuy", () => {
      assert.equal(part2(["ieodomkazucvgmuy"]), "0");
    });
    it("input", async () => {
      const input = await readInput("2015/05");
      assert.equal(part2(input), "53");
    });
  });
});
