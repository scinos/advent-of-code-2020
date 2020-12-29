import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 12", () => {
  describe("Part 1", () => {
    it("examples", () => {
      assert.equal(part1(["[1,2,3]"]), "6");
      assert.equal(part1(['{"a":2,"b":4}']), "6");
      assert.equal(part1(["[[[3]]]"]), "3");
      assert.equal(part1(['{"a":{"b":4},"c":-1}']), "3");
      assert.equal(part1(['{"a":[-1,1]}']), "0");
      assert.equal(part1(['[-1,{"a":1}]']), "0");
      assert.equal(part1(["[]"]), "0");
      assert.equal(part1(["{}"]), "0");
    });

    it("input", async () => {
      const input = await readInput("2015/12");
      assert.equal(part1(input), "111754");
    });
  });

  describe("Part 2", () => {
    it("examples", () => {
      assert.equal(part2(["[1,2,3]"]), "6");
      assert.equal(part2(['[1,{"c":"red","b":2},3]']), "4");
      assert.equal(part2(['{"d":"red","e":[1,2,3,4],"f":5}']), "0");
      assert.equal(part2(['[1,"red",5]']), "6");
    });

    it("input", async () => {
      const input = await readInput("2015/12");
      assert.equal(part2(input), "65402");
    });
  });
});
