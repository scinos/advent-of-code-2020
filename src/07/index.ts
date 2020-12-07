import { Solver } from "../run";

type Bag = {
  name: string;
  bags: Map<string, number>;
  containedBy: Set<Bag>;
};

const generateBags = (input: string[]): Map<string, Bag> => {
  const bags = new Map<string, Bag>();
  const reBag = /^(?<color>.*?) bags contain (?:no other bags|(?<content>.*))\.$/;
  const reContent = /^ ?(?<bagAmmount>\d) (?<bagColor>.*?) bags?$/;

  for (const line of input) {
    const { color, content } = line.match(reBag).groups;
    const bag: Bag = {
      name: color,
      bags: new Map<string, number>(),
      containedBy: new Set<Bag>(),
    };
    bags.set(bag.name, bag);

    if (content) {
      const contentBags = content.split(",");
      for (const contentBag of contentBags) {
        const { bagAmmount, bagColor } = contentBag.match(reContent).groups;
        bag.bags.set(bagColor, Number(bagAmmount));
      }
    }
  }

  for (const bag of bags.values()) {
    for (const subBag of bag.bags.keys()) {
      bags.get(subBag).containedBy.add(bag);
    }
  }
  return bags;
};

export const part1: Solver = (input) => {
  const bags = generateBags(input);

  const containedBy = new Set();

  const extractContainers = (bag: Bag) => {
    for (const subBag of bag.containedBy.values()) {
      const { name } = subBag;
      if (!containedBy.has(name)) {
        containedBy.add(name);
        extractContainers(subBag);
      }
    }
  };
  extractContainers(bags.get("shiny gold"));

  return String(containedBy.size);
};

export const part2: Solver = (input) => {
  const bags = generateBags(input);

  const extractContainers = (bag: Bag): number => {
    let total = 1;
    for (const [subBag, ammount] of bag.bags.entries()) {
      total += ammount * extractContainers(bags.get(subBag));
    }
    return total;
  };
  return String(extractContainers(bags.get("shiny gold")) - 1);
};
