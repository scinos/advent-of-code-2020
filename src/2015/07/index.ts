/* eslint-disable no-async-promise-executor */
/* eslint-disable no-cond-assign */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import type { AsyncSolver } from "../../runner";

const reSignal = /^(?<signal>\d+) -> (?<dest>[a-z]+)$/;
const reAnd = /^((?<wireA>[a-z]+)|(?<signalA>\d+)) AND ((?<wireB>[a-z]+)|(?<signalB>\d+)) -> (?<dest>[a-z]+)$/;
const reOr = /^((?<wireA>[a-z]+)|(?<signalA>\d+)) OR ((?<wireB>[a-z]+)|(?<signalB>\d+)) -> (?<dest>[a-z]+)$/;
const reLShift = /^((?<wire>[a-z]+)|(?<signal>\d+)) LSHIFT (?<num>\d+) -> (?<dest>[a-z]+)$/;
const reRShift = /^((?<wire>[a-z]+)|(?<signal>\d+)) RSHIFT (?<num>\d+) -> (?<dest>[a-z]+)$/;
const reNot = /^NOT (?<wire>[a-z]+) -> (?<dest>[a-z]+)$/;
const reLink = /^(?<wire>[a-z]+) -> (?<dest>[a-z]+)$/;

const uint16 = (n: number): number => n & 0xffff;

type Wires = Map<string, Promise<number>>;

export const wire = async (lines: string[]): Promise<Wires> => {
  const wires: Wires = new Map();
  let saveMap: (wires: Wires) => void;
  const getMap: Promise<Wires> = new Promise((resolve) => {
    saveMap = resolve;
  });

  lines.forEach((line) => {
    let match;

    if ((match = reSignal.exec(line))) {
      const { dest, signal } = match!.groups!;
      wires.set(dest, Promise.resolve(Number(signal)));
      return;
    }

    if ((match = reAnd.exec(line))) {
      const { dest, wireA, wireB, signalA, signalB } = match!.groups!;
      wires.set(
        dest,
        new Promise(async (resolve) => {
          const map = await getMap;
          const a: number = signalA ? Number(signalA) : await map.get(wireA)!;
          const b: number = signalB ? Number(signalB) : await map.get(wireB)!;
          resolve(uint16(a & b));
        })
      );
      return;
    }

    if ((match = reOr.exec(line))) {
      const { dest, wireA, wireB, signalA, signalB } = match!.groups!;
      wires.set(
        dest,
        new Promise(async (resolve) => {
          const map = await getMap;
          const a: number = signalA ? Number(signalA) : await map.get(wireA)!;
          const b: number = signalB ? Number(signalB) : await map.get(wireB)!;
          resolve(uint16(a | b));
        })
      );
      return;
    }

    if ((match = reLShift.exec(line))) {
      const { dest, wire, signal, num } = match!.groups!;
      wires.set(
        dest,
        new Promise(async (resolve) => {
          const map = await getMap;
          const a: number = signal ? Number(signal) : await map.get(wire)!;
          const b = Number(num);
          resolve(uint16(a << b));
        })
      );
      return;
    }

    if ((match = reRShift.exec(line))) {
      const { dest, wire, signal, num } = match!.groups!;
      wires.set(
        dest,
        new Promise(async (resolve) => {
          const map = await getMap;
          const a: number = signal ? Number(signal) : await map.get(wire)!;
          const b = Number(num);
          resolve(uint16(a >> b));
        })
      );
      return;
    }

    if ((match = reNot.exec(line))) {
      const { dest, wire } = match!.groups!;
      wires.set(
        dest,
        new Promise(async (resolve) => {
          const map = await getMap;
          const a = await map.get(wire)!;
          resolve(uint16(~a));
        })
      );
      return;
    }

    if ((match = reLink.exec(line))) {
      const { dest, wire } = match!.groups!;
      wires.set(
        dest,
        new Promise(async (resolve) => {
          const map = await getMap;
          const a = await map.get(wire)!;
          resolve(uint16(a));
        })
      );
    }
  });

  saveMap!(wires);

  return wires;
};

export const part1: AsyncSolver = async (input) => {
  const wires = await wire(input);
  return String(await wires.get("a"));
};

export const part2: AsyncSolver = async (input) => {
  const wires = await wire(
    input.map((line) => (line === "14146 -> b" ? "956 -> b" : line))
  );
  return String(await wires.get("a"));
};
