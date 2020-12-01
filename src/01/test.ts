import { strict as assert } from "assert";
import { massToFuel, massToFuelComplex } from "./lib";
import { part1, part2 } from ".";
import { readInput } from "../lib/readInput";

describe("Day 1", () => {
  describe("Simple mass", () => {
    it("Mass 12", () => {
      assert.equal(massToFuel(12), 2);
    });

    it("Mass 14", () => {
      assert.equal(massToFuel(14), 2);
    });

    it("Mass 1969", () => {
      assert.equal(massToFuel(1969), 654);
    });

    it("Mass 100756", () => {
      assert.equal(massToFuel(100756), 33583);
    });
  });

  describe("Complex mass", () => {
    it("Mass 14", () => {
      assert.equal(massToFuelComplex(14), 2);
    });

    it("Mass 1969", () => {
      assert.equal(massToFuelComplex(1969), 966);
    });

    it("Mass 100756", () => {
      assert.equal(massToFuelComplex(100756), 50346);
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("01");
      assert.equal(part1(input), "3576689");
    });
    it("Part 2", async () => {
      const input = await readInput("01");
      assert.equal(part2(input), "5362136");
    });
  });
});
