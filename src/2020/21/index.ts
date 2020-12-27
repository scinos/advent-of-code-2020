import { Solver } from "../../runner";

type Allergen = string;
type Ingredient = string;

const intersect = <T>(listA: T[], listB: T[]): T[] =>
  listA.filter((item) => listB.includes(item));

export const part1: Solver = (input) => {
  const re = /^(?<rawIngredients>.*) \(contains (?<rawAllergens>.*)\)$/;

  const allergens: Map<Allergen, Ingredient[]> = new Map();
  const ingredients: Map<Ingredient, number> = new Map();

  for (const line of input) {
    const { rawIngredients, rawAllergens } = line.match(re).groups;
    const ingredientsList = rawIngredients.split(" ");
    const allergensList = rawAllergens.split(", ");

    for (const ingredient of ingredientsList) {
      ingredients.set(ingredient, (ingredients.get(ingredient) || 0) + 1);
    }

    for (const allergen of allergensList) {
      if (!allergens.has(allergen)) {
        allergens.set(allergen, ingredientsList);
      } else {
        allergens.set(
          allergen,
          intersect(allergens.get(allergen), ingredientsList)
        );
      }
    }
  }

  const ingredientsWithAllergens = new Set(
    Array.from(allergens.values()).flat()
  );

  let total = 0;
  for (const [ingredient, count] of ingredients.entries()) {
    if (ingredientsWithAllergens.has(ingredient)) continue;
    total += count;
  }

  return String(total);
};

export const part2: Solver = (input) => {
  const re = /^(?<rawIngredients>.*) \(contains (?<rawAllergens>.*)\)$/;

  const allergens: Map<Allergen, Ingredient[]> = new Map();
  for (const line of input) {
    const { rawIngredients, rawAllergens } = line.match(re).groups;
    const ingredientsList = rawIngredients.split(" ");
    const allergensList = rawAllergens.split(", ");

    for (const allergen of allergensList) {
      if (!allergens.has(allergen)) {
        allergens.set(allergen, ingredientsList);
      } else {
        allergens.set(
          allergen,
          intersect(allergens.get(allergen), ingredientsList)
        );
      }
    }
  }

  const canonicalList: Map<Ingredient, Allergen> = new Map();
  const candidates = Array.from(allergens.entries());
  while (candidates.length) {
    const [allergen, ingredients] = candidates.shift();
    if (ingredients.length === 1) {
      canonicalList.set(ingredients[0], allergen);
    } else {
      candidates.push([
        allergen,
        ingredients.filter((i) => !canonicalList.has(i)),
      ]);
    }
  }

  const result = Array.from(canonicalList.entries())
    .sort(([, allergenA], [, allergenB]) => allergenA.localeCompare(allergenB))
    .map(([ingredient]) => ingredient)
    .join(",");

  return result;
};
