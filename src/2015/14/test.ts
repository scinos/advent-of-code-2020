import { strict as assert } from "assert";
import { part1, part2, extract, computeDistance, race, racePoints } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 14: Reindeer Olympics", () => {
  describe("Spec extractor", () => {
    it("Extracts the specs", () => {
      const spec =
        "Dancer can fly 27 km/s for 5 seconds, but then must rest for 132 seconds.";
      assert.deepEqual(extract(spec), {
        name: "Dancer",
        speed: 27,
        duration: 5,
        rest: 132,
      });
    });
  });

  describe("Reindeer speed calculator", () => {
    it("Calculates the speed", () => {
      // 1 m/s for 1 sec, no rest
      assert.equal(computeDistance(1000, 1, 1, 0), 1000);

      // 3 m/s for 1 sec, no rest
      assert.equal(computeDistance(1000, 3, 1, 0), 3000);

      // 1 m/s for 1 sec, 1 sec rest
      assert.equal(computeDistance(1000, 1, 1, 1), 500);

      // Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
      assert.equal(computeDistance(1000, 14, 10, 127), 1120);

      // Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
      assert.equal(computeDistance(1000, 16, 11, 162), 1056);
    });
  });

  describe("Race outcome", () => {
    it("Calculates the race outcome", () => {
      const result = race(1000, [
        { name: "Comet", speed: 14, duration: 10, rest: 127 },
        { name: "Dancer", speed: 16, duration: 11, rest: 162 },
      ]);
      assert.deepEqual(result, [
        { name: "Comet", distance: 1120 },
        { name: "Dancer", distance: 1056 },
      ]);
    });

    it("Calculates the race outcomes with duplicates", () => {
      const result = race(30, [
        { name: "Comet", speed: 14, duration: 10, rest: 100 },
        { name: "Dancer", speed: 7, duration: 20, rest: 100 },
      ]);
      assert.deepEqual(result, [
        { name: "Comet", distance: 140 },
        { name: "Dancer", distance: 140 },
      ]);
    });
  });

  describe("Part 1 - Distance traveled by the winner", () => {
    it("Input file", async () => {
      const input = await readInput("2015/14");
      assert.equal(part1(input), "2640");
    });
  });

  describe("Part 2 - Points traveled by the winner", () => {
    it("Example from the page", () => {
      const result = racePoints(1000, [
        { name: "Comet", speed: 14, duration: 10, rest: 127 },
        { name: "Dancer", speed: 16, duration: 11, rest: 162 },
      ]);
      assert.deepEqual(result, { name: "Dancer", distance: 689 });
    });

    it("Input file", async () => {
      const input = await readInput("2015/14");
      assert.equal(part2(input), "1102");
    });
  });
});
