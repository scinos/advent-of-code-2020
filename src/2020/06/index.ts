import { reduceGroup } from "../../lib/readInput";
import { Solver } from "../../runner";

export const part1: Solver = (input) => {
  const groups = reduceGroup(input, (group): number => {
    const answers = new Set();
    group.forEach((line) => {
      for (const answer of line.split("")) {
        answers.add(answer);
      }
    });
    return answers.size;
  });

  return String(groups.reduce((a, b) => a + b));
};

export const part2: Solver = (input) => {
  const groups = reduceGroup(input, (group): number => {
    const expectedAnswers = group.length;
    const answers: number[] = Array(26).fill(0);
    let total = 0;
    for (const line of group) {
      for (const answer of line.split("")) {
        const idx = answer.charCodeAt(0) - 97;
        const answerCount = ++answers[idx];
        if (answerCount === expectedAnswers) total++;
      }
    }
    return total;
  });

  return String(groups.reduce((a, b) => a + b));
};
