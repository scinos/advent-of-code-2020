/* eslint-disable func-names */
import { Solver } from "../../runner";

const transform = function* (subject: number): Generator<number, void, void> {
  let val = 1;
  while (true) {
    val = (val * subject) % 20201227;
    yield val;
  }
};

export const part1: Solver = (input) => {
  const cardPK = Number(input[0]);
  const doorPK = Number(input[1]);

  let doorLoopSize = 1;
  const doorTransfomer = transform(7);
  while (doorTransfomer.next().value !== doorPK) doorLoopSize++;

  const cardTransformer = transform(cardPK);
  let encryptionKey;
  for (let i = 0; i < doorLoopSize; i++) {
    encryptionKey = cardTransformer.next().value;
  }

  return String(encryptionKey);
};

export const part2: Solver = () => {
  throw new Error("The is no part2 for day 50");
};
