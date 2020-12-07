import { Solver } from "../run";

type Bag = {
  bags: Map<Bag, number>;
  containedBy: Set<Bag>;
};

const getBag = (bags: Map<string, Bag>, name: string): Bag => {
  if (!bags.has(name)) {
    bags.set(name, {
      bags: new Map<Bag, number>(),
      containedBy: new Set<Bag>(),
    });
  }
  return bags.get(name);
};

const generateBags = (input: string[]): Map<string, Bag> => {
  const bags = new Map<string, Bag>();
  const reBag = /^(?<color>.*?) bags contain (?:no other bags|(?<content>.*))\.$/;
  const reContent = /(?<bagAmmount>\d) (?<bagColor>.*?) bags?(?:, |$)/g;

  for (const line of input) {
    const { color, content } = line.match(reBag).groups;
    const bag: Bag = getBag(bags, color);

    if (content) {
      for (const {
        groups: { bagColor, bagAmmount },
      } of content.matchAll(reContent)) {
        const subBag = getBag(bags, bagColor);
        subBag.containedBy.add(bag);
        bag.bags.set(subBag, Number(bagAmmount));
      }
    }
  }

  return bags;
};

export const part1: Solver = (input) => {
  const bags = generateBags(input);

  const containedBy = new Set();

  const extractContainers = (bag: Bag) => {
    for (const subBag of bag.containedBy.values()) {
      if (!containedBy.has(subBag)) {
        containedBy.add(subBag);
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
      total += ammount * extractContainers(subBag);
    }
    return total;
  };

  return String(extractContainers(bags.get("shiny gold")) - 1);
};
