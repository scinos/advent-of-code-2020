/* eslint-disable no-loop-func */
import { Solver } from "../../runner";

export const part1: Solver = (input) => {
  const mem: number[] = [];
  let mask: string[] = [];
  const maskRe = /^mask = (?<mask>.*)$/;
  const memRe = /^mem\[(?<address>\d+)\] = (?<value>\d+)$/;
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const match = input[i].match(maskRe);
    if (match) {
      mask = match.groups!.mask.split("");
      continue;
    }

    const { address: addressRaw, value: valRaw } = input[i].match(
      memRe
    )!.groups!;

    const valueBinary = Number(valRaw).toString(2).padStart(36, "0").split("");
    for (let i = 0; i < 36; i++) {
      if (mask[i] === "0" || mask[i] === "1") valueBinary[i] = mask[i];
    }
    const value = parseInt(valueBinary.join(""), 2);

    const address = Number(addressRaw);
    if (mem[address]) {
      sum -= mem[address];
    }
    mem[address] = value;
    sum += value;
  }

  return String(sum);
};

export const part2: Solver = (input) => {
  const mem = new Map<number, number>();
  let mask: string[] = [];
  const maskRe = /^mask = (?<mask>.*)$/;
  const memRe = /^mem\[(?<address>\d+)\] = (?<value>\d+)$/;
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const match = input[i].match(maskRe);
    if (match) {
      mask = match.groups!.mask.split("");
    } else {
      const { address: addressRaw, value: valRaw } = input[i].match(
        memRe
      )!.groups!;

      const addressBinary = Number(addressRaw)
        .toString(2)
        .padStart(36, "0")
        .split("");
      for (let i = 0; i < 36; i++) {
        if (mask[i] === "X" || mask[i] === "1") addressBinary[i] = mask[i];
      }

      const addresses = [addressBinary];
      while (true) {
        const mask = addresses[0];
        const x = mask.indexOf("X");
        if (x === -1) {
          break;
        }
        const address1 = [...mask];
        address1[x] = "0";
        const address2 = [...mask];
        address2[x] = "1";

        addresses.shift();
        addresses.push(address1);
        addresses.push(address2);
      }

      const val = Number(valRaw);
      for (const binaryAddress of addresses) {
        const address = parseInt(binaryAddress.join(""), 2);
        if (mem.has(address)) {
          sum -= mem.get(address)!;
        }
        mem.set(address, val);
        sum += val;
      }
    }
  }

  return String(sum);
};
