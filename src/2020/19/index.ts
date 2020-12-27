import { Solver } from "../../runner";

type Linker = (id: string) => string;

const buildLinker = (rules: Map<string, string>, alt: boolean): Linker => {
  const cache: Map<string, string> = new Map();
  const linker: Linker = (id) => {
    if (cache.has(id)) {
      return cache.get(id)!;
    }

    const rule = rules.get(id)!;
    let result;

    if (alt && id === "11") {
      // This is hacky as hell, I know. The initial approach was /(?:rule42)+(?:rule31)+/, but that
      // doesn't work because it doesn't guarantee that rule31 matches exactly the same number of times as
      // rule42.

      const rule42 = linker("42");
      const rule32 = linker("31");
      result = `(?:${[
        `${rule42}{1}${rule32}{1}`,
        `${rule42}{2}${rule32}{2}`,
        `${rule42}{3}${rule32}{3}`,
        `${rule42}{4}${rule32}{4}`,
      ].join("|")})`;
    } else if (alt && id === "8") {
      result = `${linker("42")}+`;
    } else if (rule.startsWith('"')) {
      result = rule.replaceAll('"', "");
    } else {
      const groups = rule
        .split("|")
        .map((part) => part.trim().split(" ").map(linker).join(""));
      result = `(?:${groups.join("|")})`;
    }
    cache.set(id, result);
    return result;
  };
  return linker;
};

export const part1: Solver = (input) => {
  const rules: Map<string, string> = new Map();

  const messages = [];
  for (const line of input) {
    if (!line) continue;
    const [id, rule] = line.split(":");
    if (id && rule) {
      rules.set(id, rule.trim());
    } else {
      messages.push(id);
    }
  }

  const linker = buildLinker(rules, false);
  const expr = new RegExp(`^${linker("0")}$`);

  return String(messages.filter((m) => m.match(expr)).length);
};

export const part2: Solver = (input) => {
  const rules: Map<string, string> = new Map();

  const messages = [];
  for (const line of input) {
    if (!line) continue;
    const [id, rule] = line.split(":");
    if (id && rule) {
      rules.set(id, rule.trim());
    } else {
      messages.push(id);
    }
  }

  const linker = buildLinker(rules, true);
  const expr = new RegExp(`^${linker("0")}$`);

  return String(messages.filter((m) => m.match(expr)).length);
};
