import { strict as assert } from "assert";
import { part1, part2, encode, decode } from ".";
import { readInput } from "../../lib/readInput";

describe("Day 8: Matchsticks", () => {
  describe("Encode", () => {
    it("Encode strings", () => {
      assert.equal(decode('""'), "");
      assert.equal(decode('"abc"'), "abc");
      assert.equal(decode('"aaa\\"aaa"'), "aaa!aaa");
      assert.equal(decode('"\\x27"'), "@");
      assert.equal(decode('"\\\\abc\\\\"'), "#abc#");
    });
  });

  describe("Decode", () => {
    it("Decodes strings", () => {
      assert.equal(encode('""'), '"\\"\\""');
      assert.equal(encode('"abc"'), '"\\"abc\\""');
      assert.equal(encode('"aaa\\"aaa"'), '"\\"aaa\\\\\\"aaa\\""');
      assert.equal(encode('"\\x27"'), '"\\"\\\\x27\\""');
      assert.equal(encode('"\\\\abc\\\\"'), '"\\"\\\\\\\\abc\\\\\\\\\\""');
    });
  });

  describe("Part 1 - Encode strings", () => {
    it("Input file", async () => {
      const input = await readInput("2015/08");
      assert.equal(part1(input), "1371");
    });
  });

  describe("Part 2", () => {
    it("Input file", async () => {
      const input = await readInput("2015/08");
      assert.equal(part2(input), "2117");
    });
  });
});
