import type { Solver } from "../../runner";

// Dancer can fly 27 km/s for 5 seconds, but then must rest for 132 seconds.
const re = /^(.*?) can fly ([0-9]+) km\/s for ([0-9]+) seconds, but then must rest for ([0-9]+) seconds\.$/;

type Reindeer = {
  name: string;
  speed: number;
  duration: number;
  rest: number;
};
type RaceResult = { name: string; distance: number };

export const extract = (input: string): Reindeer => {
  const [, name, speed, duration, rest] = re.exec(input)!;
  return {
    name,
    speed: Number(speed),
    duration: Number(duration),
    rest: Number(rest),
  };
};

export const computeDistance = (
  raceLength: number,
  speed: number,
  duration: number,
  rest: number
): number => {
  const cycleLength = duration + rest;
  const cycleDistance = speed * duration;
  const cycles = Math.floor(raceLength / cycleLength);
  const partialCycle = Math.min(duration, raceLength % cycleLength);

  const distance = cycles * cycleDistance + partialCycle * speed;

  return distance;
};

export const race = (
  raceLength: number,
  reindeers: Reindeer[]
): RaceResult[] => {
  return reindeers
    .map(({ name, speed, duration, rest }) => {
      return {
        name,
        distance: computeDistance(raceLength, speed, duration, rest),
      };
    })
    .sort((a, b) => b.distance - a.distance);
};

export const racePoints = (
  raceLength: number,
  reindeers: Reindeer[]
): RaceResult => {
  const scores: Record<string, number> = {};

  reindeers.forEach((r) => {
    scores[r.name] = 0;
  });

  for (let i = 1; i <= raceLength; i++) {
    const partialResult = race(i, reindeers);
    const partialWinnerDistance = partialResult[0].distance;

    for (let h = 0; h < partialResult.length; h++) {
      const reindeer = partialResult[h];
      // In case there are a few reindeers tied in distance
      if (reindeer.distance === partialWinnerDistance) {
        scores[reindeer.name]++;
      }
    }
  }

  const winner: RaceResult = { distance: 0, name: "" };
  for (const [name, distance] of Object.entries(scores)) {
    if (distance > winner.distance) {
      winner.distance = distance;
      winner.name = name;
    }
  }

  return winner;
};

export const part1: Solver = (input) => {
  const raceLength = 2503;
  const reindeers = input.map(extract);
  const winner = race(raceLength, reindeers);
  return String(winner[0].distance);
};

export const part2: Solver = (input) => {
  const raceLength = 2503;
  const reindeers = input.map(extract);
  const winner = racePoints(raceLength, reindeers);
  return String(winner.distance);
};
