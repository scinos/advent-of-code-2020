/* eslint-disable prefer-destructuring */
import { Solver } from "../run";

const ruleRe = /^.*?: \d/;
const ticketRe = /^\d/;

const extractRule = (
  line: string
): { field: string; rules: ((value: number) => boolean)[] } => {
  const rules = [];
  const [field, fieldRules] = line.split(":");
  const subparts = fieldRules.split(" or ");
  for (const subpart of subparts) {
    const [min, max] = subpart.split("-").map(Number);
    rules.push((num: number) => num >= min && num <= max);
  }
  return { field, rules };
};

const parseInput = (
  input: string[]
): {
  rules: Record<string, ((num: number) => boolean)[]>;
  tickets: number[][];
} => {
  const rules: Record<string, ((num: number) => boolean)[]> = {};
  const tickets = [];

  for (const line of input) {
    if (line.match(ruleRe)) {
      const { field, rules: fieldRules } = extractRule(line);
      rules[field] = fieldRules;
    } else if (line.match(ticketRe)) {
      tickets.push(line.split(",").map(Number));
    }
  }

  return { rules, tickets };
};

export const part1: Solver = (input) => {
  const { rules, tickets } = parseInput(input);
  const allRules = Object.values(rules).flat();

  const errorRate = tickets
    .flat()
    .filter((field) => !allRules.some((rule) => rule(field)))
    .reduce((a, b) => a + b, 0);

  return String(errorRate);
};

export const part2: Solver = (input) => {
  const { rules, tickets } = parseInput(input);
  const allRules = Object.values(rules).flat();
  const validTickets = tickets.filter((fields) => {
    return fields.every((field) => allRules.some((rule) => rule(field)));
  });

  const candidateFields: { id: number; fields: string[] }[] = [];
  for (let fieldIdx = 0; fieldIdx < validTickets[0].length; fieldIdx++) {
    const candidates = [];
    for (const [field, rulesForField] of Object.entries(rules)) {
      const matches = validTickets
        .map((ticket) => ticket[fieldIdx])
        .every((value) => rulesForField.some((rule) => rule(value)));
      if (matches) {
        candidates.push(field);
      }
    }
    candidateFields.push({ id: fieldIdx, fields: candidates });
  }
  candidateFields.sort((a, b) => a.fields.length - b.fields.length);

  const finalFields: string[] = [];
  while (candidateFields.length) {
    const { id, fields } = candidateFields.shift();

    if (fields.length === 1) {
      finalFields[id] = fields[0];
    } else {
      const newFields = fields.filter((field) => !finalFields.includes(field));
      if (newFields.length === 1) {
        finalFields[id] = newFields[0];
      } else {
        candidateFields.push({
          id,
          fields: newFields,
        });
      }
    }
  }

  let total = 1;
  for (let i = 0; i < finalFields.length; i++) {
    const field = finalFields[i];
    if (field.startsWith("departure")) {
      total *= tickets[0][i];
    }
  }
  return String(total);
};
