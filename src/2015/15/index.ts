import type { Solver } from "../../runner";

const re = /^.*: capacity (?<capacity>-?\d+), durability (?<durability>-?\d+), flavor (?<flavor>-?\d+), texture (?<texture>-?\d+), calories (?<calories>-?\d+)$/;

type Ingredient = {
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
};

export const extract = (input: string): Ingredient => {
  const { capacity, durability, flavor, texture, calories } = re.exec(
    input
  )!.groups!;
  return {
    capacity: Number(capacity),
    durability: Number(durability),
    flavor: Number(flavor),
    texture: Number(texture),
    calories: Number(calories),
  };
};

export function* generateSplits(
  length: number,
  total: number
): Generator<number[], void, void> {
  function* gen(
    numbers: number[],
    sum: number
  ): Generator<number[], void, void> {
    // Only one left, add the number need to get to the total
    const left = total - sum;
    if (numbers.length === length - 1) {
      yield [...numbers, left];
    } else {
      for (let i = 0; i <= left; i++) {
        yield* gen([...numbers, i], sum + i);
      }
    }
  }
  yield* gen([], 0);
}

const sumIngredients = (
  partition: number[],
  ingredients: Ingredient[]
): Ingredient =>
  ingredients.reduce(
    (total, ingredient, idx) => {
      const factor = partition[idx];
      total.capacity += ingredient.capacity * factor;
      total.durability += ingredient.durability * factor;
      total.flavor += ingredient.flavor * factor;
      total.texture += ingredient.texture * factor;
      total.calories += ingredient.calories * factor;
      return total;
    },
    {
      capacity: 0,
      durability: 0,
      flavor: 0,
      texture: 0,
      calories: 0,
    }
  );

export const part1: Solver = (input) => {
  const ingredients = input.map(extract);
  const MAX = 100;
  let maxTotal = 0;

  for (const partition of generateSplits(ingredients.length, MAX)) {
    const { capacity, durability, flavor, texture } = sumIngredients(
      partition,
      ingredients
    );
    if (capacity > 0 && durability > 0 && flavor > 0 && texture > 0) {
      maxTotal = Math.max(maxTotal, capacity * durability * flavor * texture);
    }
  }

  return String(maxTotal);
};

export const part2: Solver = (input) => {
  const ingredients = input.map(extract);
  const MAX = 100;
  let maxTotal = 0;

  for (const partition of generateSplits(ingredients.length, MAX)) {
    const { capacity, durability, flavor, texture, calories } = sumIngredients(
      partition,
      ingredients
    );

    if (
      calories === 500 &&
      capacity > 0 &&
      durability > 0 &&
      flavor > 0 &&
      texture > 0
    ) {
      maxTotal = Math.max(maxTotal, capacity * durability * flavor * texture);
    }
  }

  return String(maxTotal);
};
