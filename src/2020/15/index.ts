import { Solver } from "../../runner";

const solve = (numbers: number[], target: number) => {
  const history: Map<number, number> = new Map();
  let turn;
  let number: number;

  for (turn = 0; turn < numbers.length; turn++) {
    history.set(numbers[turn], turn);
  }
  number = 0;

  /**
   * On each turn, we compute the number to say in the _next_ turn and the last time we saw the _current_ number.
   * The reason is we need to know the last time we saw a number (the value of history.get(number)) to compute the next number, before
   * overwriting it with the current turn.
   */
  while (turn < target - 1) {
    const lastSeen = history.get(number) ?? turn;
    history.set(number, turn);
    number = turn - lastSeen;
    turn++;
  }

  return number;
};

export const part1: Solver = (input) => {
  const nums = input[0].split(",").map(Number);
  const result = solve(nums, 2020);
  return String(result);
};

export const part2: Solver = (input) => {
  const nums = input[0].split(",").map(Number);
  const result = solve(nums, 30000000);
  return String(result);
};
