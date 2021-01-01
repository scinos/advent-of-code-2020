import { strict as assert } from "assert";
import { part1, part2, extract, invert } from ".";
import { readInput } from "../../lib/readInput";

describe.only("Day 19: Medicine for Rudolph", () => {
  describe("Spec Extractor", () => {
    it("Extracts the initial state", async () => {
      const input = await readInput("2015/19");
      const { replacements, molecule } = extract(input);

      assert.equal(
        molecule,
        "CRnCaCaCaSiRnBPTiMgArSiRnSiRnMgArSiRnCaFArTiTiBSiThFYCaFArCaCaSiThCaPBSiThSiThCaCaPTiRnPBSiThRnFArArCaCaSiThCaSiThSiRnMgArCaPTiBPRnFArSiThCaSiRnFArBCaSiRnCaPRnFArPMgYCaFArCaPTiTiTiBPBSiThCaPTiBPBSiRnFArBPBSiRnCaFArBPRnSiRnFArRnSiRnBFArCaFArCaCaCaSiThSiThCaCaPBPTiTiRnFArCaPTiBSiAlArPBCaCaCaCaCaSiRnMgArCaSiThFArThCaSiThCaSiRnCaFYCaSiRnFYFArFArCaSiRnFYFArCaSiRnBPMgArSiThPRnFArCaSiRnFArTiRnSiRnFYFArCaSiRnBFArCaSiRnTiMgArSiThCaSiThCaFArPRnFArSiRnFArTiTiTiTiBCaCaSiRnCaCaFYFArSiThCaPTiBPTiBCaSiThSiRnMgArCaF"
      );
      assert.deepEqual(replacements, {
        Al: ["ThF", "ThRnFAr"],
        B: ["BCa", "TiB", "TiRnFAr"],
        Ca: ["CaCa", "PB", "PRnFAr", "SiRnFYFAr", "SiRnMgAr", "SiTh"],
        F: ["CaF", "PMg", "SiAl"],
        H: [
          "CRnAlAr",
          "CRnFYFYFAr",
          "CRnFYMgAr",
          "CRnMgYFAr",
          "HCa",
          "NRnFYFAr",
          "NRnMgAr",
          "NTh",
          "OB",
          "ORnFAr",
        ],
        Mg: ["BF", "TiMg"],
        N: ["CRnFAr", "HSi"],
        O: ["CRnFYFAr", "CRnMgAr", "HP", "NRnFAr", "OTi"],
        P: ["CaP", "PTi", "SiRnFAr"],
        Si: ["CaSi"],
        Th: ["ThCa"],
        Ti: ["BP", "TiTi"],
        e: ["HF", "NAl", "OMg"],
      });
    });
  });

  describe("Spec inverter", () => {
    it("Invert the specs", async () => {
      const input = await readInput("2015/19");
      const { replacements } = extract(input);
      const invertedReplacements = invert(replacements);

      assert.deepEqual(invertedReplacements, [
        { from: "CRnFYFYFAr", to: "H" },
        { from: "CRnFYMgAr", to: "H" },
        { from: "CRnMgYFAr", to: "H" },
        { from: "SiRnFYFAr", to: "Ca" },
        { from: "CRnFYFAr", to: "O" },
        { from: "NRnFYFAr", to: "H" },
        { from: "SiRnMgAr", to: "Ca" },
        { from: "CRnAlAr", to: "H" },
        { from: "CRnMgAr", to: "O" },
        { from: "NRnMgAr", to: "H" },
        { from: "SiRnFAr", to: "P" },
        { from: "ThRnFAr", to: "Al" },
        { from: "TiRnFAr", to: "B" },
        { from: "CRnFAr", to: "N" },
        { from: "NRnFAr", to: "O" },
        { from: "ORnFAr", to: "H" },
        { from: "PRnFAr", to: "Ca" },
        { from: "CaCa", to: "Ca" },
        { from: "CaSi", to: "Si" },
        { from: "SiAl", to: "F" },
        { from: "SiTh", to: "Ca" },
        { from: "ThCa", to: "Th" },
        { from: "TiMg", to: "Mg" },
        { from: "TiTi", to: "Ti" },
        { from: "BCa", to: "B" },
        { from: "CaF", to: "F" },
        { from: "CaP", to: "P" },
        { from: "HCa", to: "H" },
        { from: "HSi", to: "N" },
        { from: "NAl", to: "e" },
        { from: "NTh", to: "H" },
        { from: "OMg", to: "e" },
        { from: "OTi", to: "O" },
        { from: "PMg", to: "F" },
        { from: "PTi", to: "P" },
        { from: "ThF", to: "Al" },
        { from: "TiB", to: "B" },
        { from: "BF", to: "Mg" },
        { from: "BP", to: "Ti" },
        { from: "HF", to: "e" },
        { from: "HP", to: "O" },
        { from: "OB", to: "H" },
        { from: "PB", to: "Ca" },
      ]);
    });
  });

  describe("Part 1 - Machine calibration", () => {
    it("Count the molecules", async () => {
      const input = await readInput("2015/19");
      assert.equal(part1(input), "535");
    });
  });

  describe("Part 2 - Molecule generation", () => {
    it("Count the steps to generate the molecule", async () => {
      const input = await readInput("2015/19");
      assert.equal(part2(input), "212");
    });
  });
});
