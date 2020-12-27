import { Solver } from "../../runner";
import { reduceGroup } from "../../lib/readInput";

type Passport = {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
};
type Field = keyof Passport;

type Validator = (passport: Passport) => boolean;

const fieldsArePresent: Validator = (passport) => {
  if (!("byr" in passport)) return false;
  if (!("iyr" in passport)) return false;
  if (!("eyr" in passport)) return false;
  if (!("hgt" in passport)) return false;
  if (!("hcl" in passport)) return false;
  if (!("ecl" in passport)) return false;
  if (!("pid" in passport)) return false;
  return true;
};

const fieldsAreValid: Validator = (passport) => {
  /**
   * byr (Birth Year) - four digits; at least 1920 and at most 2002.
   */
  if (!("byr" in passport)) return false;
  if (!passport.byr!.match(/^\d{4}$/)) return false;
  if (Number(passport.byr) < 1920) return false;
  if (Number(passport.byr) > 2002) return false;

  /**
   * iyr (Issue Year) - four digits; at least 2010 and at most 2020.
   */
  if (!("iyr" in passport)) return false;
  if (!passport.iyr!.match(/^\d{4}$/)) return false;
  if (Number(passport.iyr) < 2010) return false;
  if (Number(passport.iyr) > 2020) return false;

  /**
   * eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
   */
  if (!("eyr" in passport)) return false;
  if (!passport.eyr!.match(/^\d{4}$/)) return false;
  if (Number(passport.eyr) < 2020) return false;
  if (Number(passport.eyr) > 2030) return false;

  /**
   * hgt (Height) - a number followed by either cm or in:
   *   If cm, the number must be at least 150 and at most 193.
   *   If in, the number must be at least 59 and at most 76.
   */
  if (!("hgt" in passport)) return false;
  const hgtRe = /^(\d+)(cm|in)$/;
  const hgtMatch = passport.hgt!.match(hgtRe);
  if (!hgtMatch) return false;
  if (!passport.eyr!.match(/^\d{4}$/)) return false;
  if (
    hgtMatch[2] === "cm" &&
    (Number(hgtMatch[1]) < 150 || Number(hgtMatch[1]) > 193)
  )
    return false;
  if (
    hgtMatch[2] === "in" &&
    (Number(hgtMatch[1]) < 59 || Number(hgtMatch[1]) > 76)
  )
    return false;

  /**
   * hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
   */
  if (!passport.hcl) return false;
  if (!passport.hcl.match(/^#[0-9a-f]{6}$/)) return false;

  /**
   * ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
   */
  if (!passport.ecl) return false;
  if (!passport.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)) return false;

  /**
   * pid (Passport ID) - a nine-digit number, including leading zeroes.
   */
  if (!passport.pid) return false;
  if (!passport.pid.match(/^\d{9}$/)) return false;

  return true;
};

const extractFields = (line: string): Passport => {
  const fieldMatcher = /(?<field>byr|iyr|eyr|hgt|hcl|ecl|pid|cid):(?<value>\S+)/g;
  const passport: Passport = {};
  for (const match of Array.from(line.matchAll(fieldMatcher))) {
    const { field, value } = match.groups!;
    passport[field as Field] = value;
  }
  return passport;
};

const extractPassports = (lines: string[]): Passport[] => {
  const passports = reduceGroup(lines, (group) => {
    let passport: Passport = {};
    group.forEach((line) => {
      passport = { ...passport, ...extractFields(line) };
    });
    return passport;
  });
  return passports;
};

export const part1: Solver = (input) => {
  const passports = extractPassports(input);
  const validPassports = passports.filter(fieldsArePresent).length;
  return String(validPassports);
};

export const part2: Solver = (input) => {
  const passports = extractPassports(input);
  const validPassports = passports.filter(fieldsAreValid).length;
  return String(validPassports);
};
