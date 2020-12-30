import type { Solver } from "../../runner";

const re = /^Sue (?<number>\d+): (?<things>.*)$/;
const reThing = /^ *(?<name>[a-z]+): (?<ammount>\d+) *$/;

type Things = {
  children: number;
  cats: number;
  samoyeds: number;
  pomeranians: number;
  akitas: number;
  vizslas: number;
  goldfish: number;
  trees: number;
  cars: number;
  perfumes: number;
};

type Aunt = {
  number: number;
  things: Partial<Things>;
};

export const extract = (input: string): Aunt => {
  const { number, things } = re.exec(input)!.groups!;
  const parsedThings: Partial<Things> = {};

  for (const thing of things.split(",")) {
    const { name, ammount } = reThing.exec(thing)!.groups!;
    parsedThings[name as keyof Things] = Number(ammount);
  }

  return {
    number: Number(number),
    things: parsedThings,
  };
};

export const part1: Solver = (input) => {
  const aunts = input.map(extract);

  const target: Things = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  const aunt = aunts.find((aunt) =>
    (Object.entries(aunt.things) as [keyof Things, number][]).every(
      ([thing, ammount]) => target[thing] === ammount
    )
  )!;
  return String(aunt.number);
};

export const part2: Solver = (input) => {
  const aunts = input.map(extract);

  const target: Things = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  const aunt = aunts.find((aunt) =>
    (Object.entries(aunt.things) as [keyof Things, number][]).every(
      ([thing, ammount]) => {
        switch (thing) {
          case "cats":
          case "trees":
            return ammount > target[thing];
          case "pomeranians":
          case "goldfish":
            return ammount < target[thing];
          default:
            return ammount === target[thing];
        }
      }
    )
  )!;
  return String(aunt.number);
};
