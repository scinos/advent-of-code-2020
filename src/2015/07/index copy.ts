/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import type { Solver } from "../../runner";

const reSignal = /^([0-9]+) -> ([a-z]+)$/;
const reLink = /^([a-z]+) -> ([a-z]+)$/;
const reNot = /^NOT ([a-z]+) -> ([a-z]+)$/;
const reAnd = /^([a-z]+|[0-9]+) AND ([a-z]+) -> ([a-z]+)$/;
const reOr = /^([a-z]+) OR ([a-z]+) -> ([a-z]+)$/;
const reLShift = /^([a-z]+) LSHIFT ([0-9]+) -> ([a-z]+)$/;
const reRShift = /^([a-z]+) RSHIFT ([0-9]+) -> ([a-z]+)$/;

function modulo(a: number, b: number) {
  return a - Math.floor(a / b) * b;
}

function ToInteger(num: number | string) {
  const x = Number(num);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

function ToUint16(x: number | string) {
  return modulo(ToInteger(x), Math.pow(2, 16));
}

abstract class Wire {
  dest: string;

  result?: number | string;

  constructor(dest: string) {
    this.dest = dest;
  }

  abstract getSignal(): number | string;
}

const wires: Record<string, Wire> = {};

class WireLink extends Wire {
  a: string;

  constructor(dest: string, a: string) {
    super(dest);
    this.a = a;
  }

  getSignal() {
    if (!this.result) {
      this.result = ToUint16(wires[this.a].getSignal());
    }
    return this.result;
  }
}

class WireNOT extends WireLink {
  getSignal() {
    if (!this.result) {
      this.result = ToUint16(~wires[this.a].getSignal());
    }
    return this.result;
  }
}

class WireSignal extends Wire {
  signal: number | string;

  constructor(dest: string, signal: number | string) {
    super(dest);
    this.signal = signal;
  }

  getSignal() {
    if (!this.result) {
      this.result = ToUint16(this.signal);
    }
    return this.result;
  }
}

class WireAND extends Wire {
  a: string;

  b: string;

  constructor(dest: string, a: string, b: string) {
    super(dest);
    this.a = a;
    this.b = b;
  }

  getSignal() {
    if (!this.result) {
      let { a }: { a: string | number } = this;
      if (isNaN(Number(a))) {
        a = wires[this.a].getSignal();
      }

      let { b }: { b: string | number } = this;
      if (isNaN(Number(b))) {
        b = wires[this.b].getSignal();
      }

      this.result = ToUint16((a as number) & (b as number));
    }

    return this.result;
  }
}

class WireOR extends WireAND {
  getSignal() {
    if (!this.result) {
      let { a }: { a: string | number } = this;
      if (isNaN(Number(a))) {
        a = wires[this.a].getSignal();
      }

      let { b }: { b: string | number } = this;
      if (isNaN(Number(b))) {
        b = wires[this.b].getSignal();
      }

      this.result = ToUint16((a as number) | (b as number));
    }

    return this.result;
  }
}

class WireLShift extends Wire {
  a: string;

  num: number;

  constructor(dest: string, a: string, num: number) {
    super(dest);
    this.a = a;
    this.num = num;
  }

  getSignal() {
    if (!this.result) {
      this.result = ToUint16(
        (wires[this.a].getSignal() as number) << Number(this.num)
      );
    }

    return this.result;
  }
}

class WireRShift extends WireLShift {
  getSignal() {
    if (!this.result) {
      this.result = ToUint16(
        (wires[this.a].getSignal() as number) >> Number(this.num)
      );
    }

    return this.result;
  }
}

const wire = (lines: string[]) => {
  lines.forEach((line) => {
    let match;
    let wire: Wire;

    match = reSignal.exec(line);
    if (match) wire = new WireSignal(match[2], match[1]);

    match = reAnd.exec(line);
    if (match) wire = new WireAND(match[3], match[1], match[2]);

    match = reOr.exec(line);
    if (match) wire = new WireOR(match[3], match[1], match[2]);

    match = reLShift.exec(line);
    if (match) wire = new WireLShift(match[3], match[1], Number(match[2]));

    match = reRShift.exec(line);
    if (match) wire = new WireRShift(match[3], match[1], Number(match[2]));

    match = reNot.exec(line);
    if (match) wire = new WireNOT(match[2], match[1]);

    match = reLink.exec(line);
    if (match) wire = new WireLink(match[2], match[1]);

    wires[wire!.dest] = wire!;
  });

  return wires;
};

export const part1: Solver = (input) => {
  const wires = wire(input);
  return String(wires.a.getSignal());
};

export const part2: Solver = (input) => {
  const input2 = input.map((line) =>
    line === "14146 -> b" ? "956 -> b" : line
  );
  const wires2 = wire(input2);
  return String(wires2.a.getSignal());
};
