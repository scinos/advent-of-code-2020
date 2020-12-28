import type { Solver } from "../../runner";

type DistancesToCities = Map<string, number>;
type Cities = Map<string, DistancesToCities>;

const re = /^(?<cityA>.*?) to (?<cityB>.*?) = (?<distance>\d+)$/;

const getCities = (lines: string[]): Cities => {
  return lines.reduce((nodes: Cities, line) => {
    const { cityA, cityB, distance } = re.exec(line)!.groups!;
    const dist = Number(distance);

    if (!nodes.has(cityA)) nodes.set(cityA, new Map());
    if (!nodes.has(cityB)) nodes.set(cityB, new Map());

    nodes.get(cityA)!.set(cityB, dist);
    nodes.get(cityB)!.set(cityA, dist);
    return nodes;
  }, new Map());
};

export const part1: Solver = (lines) => {
  const nodes: Cities = getCities(lines);

  let bestDistance = Infinity;
  function visit(
    currentCity: string,
    currentDistance: number,
    rest: string[]
  ): void {
    if (rest.length === 0) {
      bestDistance = Math.min(bestDistance, currentDistance);
      return;
    }

    const nextVisit = [...rest];
    while (nextVisit.length) {
      const nextCity = nextVisit.pop()!;
      const distance = currentDistance + nodes.get(currentCity)!.get(nextCity)!;
      if (distance > bestDistance) continue;
      visit(
        nextCity,
        distance,
        rest.filter((c) => c !== nextCity)
      );
    }
  }

  nodes.forEach((cities, city) => visit(city, 0, Array.from(cities.keys())));
  return String(bestDistance);
};

export const part2: Solver = (lines) => {
  const nodes: Cities = getCities(lines);

  let worstDistance = -Infinity;
  function visit(
    currentCity: string,
    currentDistance: number,
    rest: string[]
  ): void {
    if (rest.length === 0) {
      worstDistance = Math.max(worstDistance, currentDistance);
      return;
    }

    const nextVisit = [...rest];
    while (nextVisit.length) {
      const nextCity = nextVisit.pop()!;
      const distance = currentDistance + nodes.get(currentCity)!.get(nextCity)!;
      visit(
        nextCity,
        distance,
        rest.filter((c) => c !== nextCity)
      );
    }
  }

  nodes.forEach((cities, city) => visit(city, 0, Array.from(cities.keys())));
  return String(worstDistance);
};
