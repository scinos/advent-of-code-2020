/* eslint-disable prefer-destructuring */
import { Solver } from "../../runner";

const parseCards = (input: string[]): number[][] => {
  const players: number[][] = [];

  let lastPlayer = -1;
  for (const line of input) {
    if (line.startsWith("Player")) {
      lastPlayer++;
      players[lastPlayer] = [];
    } else if (line) {
      players[lastPlayer].push(Number(line));
    }
  }
  return players;
};

const play = (players: number[][], recursive: boolean): number => {
  const rounds: Set<string> = new Set();
  let winner = null;

  while (winner === null) {
    if (recursive) {
      const key = `${players[0].join(",")}-${players[1].join(",")}`;
      if (rounds.has(key)) {
        winner = 0;
        break;
      } else {
        rounds.add(key);
      }
    }

    const card1 = players[0].shift();
    const card2 = players[1].shift();

    // Determine round winner
    let roundWinner;
    if (recursive && players[0].length >= card1 && players[1].length >= card2) {
      roundWinner = play(
        [players[0].slice(0, card1), players[1].slice(0, card2)],
        recursive
      );
    } else {
      roundWinner = card1 > card2 ? 0 : 1;
    }

    // Assign cards
    if (roundWinner === 0) {
      players[0].push(card1);
      players[0].push(card2);
    } else {
      players[1].push(card2);
      players[1].push(card1);
    }

    // Check if someone won the game
    if (players[0].length === 0) winner = 1;
    else if (players[1].length === 0) winner = 0;
  }

  return winner;
};

export const part1: Solver = (input) => {
  const players = parseCards(input);
  const winner = players[play(players, false)];
  const result = winner.reverse().reduce((acc, card, index) => {
    return acc + card * (index + 1);
  }, 0);
  return String(result);
};

export const part2: Solver = (input) => {
  const players = parseCards(input);
  const winner = players[play(players, true)];
  const result = winner.reverse().reduce((acc, card, index) => {
    return acc + card * (index + 1);
  }, 0);
  return String(result);
};
