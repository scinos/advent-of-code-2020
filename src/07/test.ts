import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../lib/readInput";

describe.only("Day 7", () => {
  const input = [
    "light red bags contain 1 bright white bag, 2 muted yellow bags.",
    "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
    "bright white bags contain 1 shiny gold bag.",
    "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
    "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
    "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
    "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
    "faded blue bags contain no other bags.",
    "dotted black bags contain no other bags.",
  ];

  it("Part 1", () => {
    assert.equal(part1(input), "4");
  });
  describe("Part 2", () => {
    it("Initial input", () => {
      assert.equal(part2(input), "32");
    });
    it("Second input", () => {
      const input = [
        "shiny gold bags contain 2 dark red bags.",
        "dark red bags contain 2 dark orange bags.",
        "dark orange bags contain 2 dark yellow bags.",
        "dark yellow bags contain 2 dark green bags.",
        "dark green bags contain 2 dark blue bags.",
        "dark blue bags contain 2 dark violet bags.",
        "dark violet bags contain no other bags.",
      ];
      assert.equal(part2(input), "126");
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("07");
      assert.equal(part1(input), "370");
    });
    it("Part 2", async () => {
      const input = await readInput("07");
      assert.equal(part2(input), "29547");
    });
  });
});
