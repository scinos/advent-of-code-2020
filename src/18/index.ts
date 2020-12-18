import { Solver } from "../run";

const SUM_RE = /\d+(?: \+ \d+)+/g;
const PAREN_RE = /\(([^(]*?)\)/g;

const solveSumFirst = (expression: string): string => {
  // Find groups of '<num> + <num> + <num>...' and replace them with the result
  expression = expression.replaceAll(SUM_RE, (match) =>
    match
      .split(" + ")
      .map(Number)
      .reduce((a, b) => a + b)
      .toString()
  );

  // At this point expression is a series of '<num> * <num> * <num> *...'
  return expression
    .split(" * ")
    .map(Number)
    .reduce((a, b) => a * b)
    .toString();
};

const solveWritingOrder = (expression: string): string => {
  const symbols = expression.split(" ");
  let total = Number(symbols[0]);

  // Iterate in groups of two. [i] is the operator, [i+1] the number
  for (let i = 1; i < symbols.length; i += 2) {
    const oper = symbols[i];
    const num = Number(symbols[i + 1]);
    if (oper === "*") total *= num;
    else total += num;
  }

  return String(total);
};

const solve = (expressions: string[], solver: (expr: string) => string) => {
  let sum = 0;
  for (let line of expressions) {
    let changed;

    // Solve the parentheses first
    do {
      changed = false;
      line = line.replaceAll(PAREN_RE, (match, expression) => {
        changed = true;
        return solver(expression);
      });
    } while (changed);

    // No parentheses left, just solve the expression
    sum += Number(solver(line));
  }
  return String(sum);
};

export const part1: Solver = (input) => solve(input, solveWritingOrder);
export const part2: Solver = (input) => solve(input, solveSumFirst);
