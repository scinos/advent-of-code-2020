import { Solver } from "../run";

const run = (program: string[]) => {
  let acc = 0;
  let pointer = 0;
  const counter = new Array(program.length).fill(0);
  const re = /^(?<ins>[a-z]{3}) (?<num>[+-]\d+)$/;

  while (pointer < program.length) {
    if (counter[pointer] >= 1) {
      throw acc;
    }
    counter[pointer]++;

    const { ins, num } = program[pointer].match(re).groups;
    switch (ins) {
      case "acc":
        acc += Number(num);
        pointer++;
        break;
      case "jmp":
        pointer += Number(num);
        break;
      case "nop":
        pointer++;
        break;
    }
  }

  return acc;
};

export const part1: Solver = (input) => {
  try {
    return String(run(input));
  } catch (e) {
    return String(e);
  }
};

export const part2: Solver = (input) => {
  const program = [...input];

  for (let i = 0; i < program.length; i++) {
    if (program[i].startsWith("acc")) continue;

    const originalInstruction = program[i];
    if (program[i].startsWith("nop")) {
      program[i] = program[i].replace("nop", "jmp");
    } else {
      program[i] = program[i].replace("jmp", "nop");
    }
    try {
      const result = run(program);
      return String(result);
    } catch {
      program[i] = originalInstruction;
    }
  }
  throw new Error("Answer not found");
};
