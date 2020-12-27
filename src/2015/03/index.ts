import type { Solver } from "../../runner";

const movement = (agents: number, input: string[]) => {
  const coords: [number, number][] = [];
  for (let i = 0; i < agents; i++) {
    coords.push([0, 0]);
  }

  const map: Set<string> = new Set();
  map.add("0,0");

  input.forEach((d, idx) => {
    const s = idx % agents;
    const agentCoords = coords[s];

    switch (d) {
      case ">":
        agentCoords[1]++;
        break;
      case "<":
        agentCoords[1]--;
        break;
      case "^":
        agentCoords[0]++;
        break;
      case "v":
        agentCoords[0]--;
        break;
    }
    map.add(agentCoords.join(","));
  });

  return map.size;
};

export const part1: Solver = (input) => {
  return String(movement(1, input[0].split("")));
};

export const part2: Solver = (input) => {
  return String(movement(2, input[0].split("")));
};
