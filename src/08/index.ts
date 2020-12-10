/* eslint-disable no-param-reassign */
import { Solver } from "../run";

const run = (program: string[]) => {
  let acc = 0;
  let pointer = 0;
  const jmpNop = [];

  const counter = new Array(program.length).fill(0);
  const re = /^(?<ins>[a-z]{3}) (?<num>[+-]\d+)$/;

  while (pointer < program.length) {
    if (counter[pointer] >= 1) {
      // eslint-disable-next-line no-throw-literal
      throw { acc, jmpNop };
    }
    counter[pointer]++;

    const { ins, num } = program[pointer].match(re).groups;
    switch (ins) {
      case "acc":
        acc += Number(num);
        pointer++;
        break;
      case "jmp":
        jmpNop.push(pointer);
        pointer += Number(num);
        break;
      case "nop":
        jmpNop.push(pointer);
        pointer++;
        break;
    }
  }

  return { acc, jmpNop };
};

export const part1: Solver = (input) => {
  try {
    return String(run(input).acc);
  } catch ({ acc }) {
    return String(acc);
  }
};

const toggle = (program: string[], pos: number): void => {
  if (program[pos].startsWith("nop")) {
    program[pos] = program[pos].replace("nop", "jmp");
  } else {
    program[pos] = program[pos].replace("jmp", "nop");
  }
};

export const part2: Solver = (input) => {
  const program = [...input];
  const tried: number[] = [];

  while (true) {
    try {
      return String(run(program).acc);
    } catch ({ acc, jmpNop }) {
      if (tried.length) {
        toggle(program, tried[tried.length - 1]);
      }

      let nextInstructionToTry;
      do {
        nextInstructionToTry = jmpNop.pop();
      } while (tried.includes(nextInstructionToTry));
      tried.push(nextInstructionToTry);
      toggle(program, nextInstructionToTry);
    }
  }
};
