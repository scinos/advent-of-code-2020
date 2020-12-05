#!/usr/bin/env node
/* eslint no-console: "off" */

import * as yargs from "yargs";

import { run, runAll } from "./src/run";
import type { Day, Part } from "./src/run";

const main = async (): Promise<string> => {
  const args = yargs
    .usage("$0 --day [day] --part [part]\nor\n$0 --all\n")
    .options({
      all: {
        alias: "a",
        describe: "run all days",
      },
      day: {
        describe: "day to run",
        coerce: (v: string): Day => v.padStart(2, "0") as Day,
      },
      part: {
        describe: "part of the day to run",
        coerce: (v: number): Part => String(v) as Part,
      },
    })
    .check((args) => {
      if (!args.day && !args.all) {
        throw new Error("Error: --day or --all required");
      }
      if (args.day && !args.part) {
        throw new Error("Error: You must specify --part when using --day");
      }
      return true;
    }).argv;

  if (args.day && args.part) {
    return run({ day: args.day, part: args.part });
  }
  if (args.all) {
    return runAll();
  }
  throw new Error("Unknown error pargin args");
};

main().then(console.log).catch(console.error);
