import { strict as assert } from "assert";
import { part1, part2 } from ".";
import { readInput } from "../lib/readInput";

describe("Day 24", () => {
  const input = [
    "sesenwnenenewseeswwswswwnenewsewsw",
    "neeenesenwnwwswnenewnwwsewnenwseswesw",
    "seswneswswsenwwnwse",
    "nwnwneseeswswnenewneswwnewseswneseene",
    "swweswneswnenwsewnwneneseenw",
    "eesenwseswswnenwswnwnwsewwnwsene",
    "sewnenenenesenwsewnenwwwse",
    "wenwwweseeeweswwwnwwe",
    "wsweesenenewnwwnwsenewsenwwsesesenwne",
    "neeswseenwwswnwswswnw",
    "nenwswwsewswnenenewsenwsenwnesesenew",
    "enewnwewneswsewnwswenweswnenwsenwsw",
    "sweneswneswneneenwnewenewwneswswnese",
    "swwesenesewenwneswnwwneseswwne",
    "enesenwswwswneneswsenwnewswseenwsese",
    "wnwnesenesenenwwnenwsewesewsesesew",
    "nenewswnwewswnenesenwnesewesw",
    "eneswnwswnwsenenwnwnwwseeswneewsenese",
    "neswnwewnwnwseenwseesewsenwsweewe",
    "wseweeenwnesenwwwswnew",
  ];
  describe("Examples", () => {
    it("Part 1", () => {
      assert.equal(part1(input), "10");
    });
    it("Part 2", () => {
      assert.equal(part2(input), "2208");
    });
  });

  describe("Solutions", () => {
    it("Part 1", async () => {
      const input = await readInput("24");
      assert.equal(part1(input), "485");
    });
    it("Part 2", async () => {
      const input = await readInput("24");
      assert.equal(part2(input), "3933");
    });
  });
});
