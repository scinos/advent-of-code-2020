import { strict as assert } from "assert";
import { part1, part2, solve } from ".";
import { readInput } from "../lib/readInput";

describe("Day 23", () => {
  const input = ["389125467"];
  describe("Examples", () => {
    it("Example 1", () => {
      const cupIndex = solve(
        input[0].split("").map((c) => Number(c)),
        9,
        10
      );

      let firstCup = cupIndex.get(1);
      const result = new Array(8).fill(0).reduce((acc) => {
        firstCup = firstCup.next;
        acc += `${firstCup.id}`;
        return acc;
      }, "");

      assert.equal(result, "92658374");
    });
    it("Example 2", () => {
      const cupIndex = solve(
        input[0].split("").map((c) => Number(c)),
        9,
        100
      );

      let firstCup = cupIndex.get(1);
      const result = new Array(8).fill(0).reduce((acc) => {
        firstCup = firstCup.next;
        acc += `${firstCup.id}`;
        return acc;
      }, "");

      assert.equal(result, "67384529");
    });
    it("Example 3", () => {
      const cupIndex = solve(
        input[0].split("").map((c) => Number(c)),
        1e6,
        1e7
      );
      const firstCup = cupIndex.get(1);
      const result = String(firstCup.next.id * firstCup.next.next.id);

      assert.equal(result, "149245887792");
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("23");
      assert.equal(part1(input), "95648732");
    });
    it("Part 2", async () => {
      const input = await readInput("23");
      assert.equal(part2(input), "192515314252");
    });
  });
});
