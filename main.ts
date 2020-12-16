#!/usr/bin/env node

import * as yargs from "yargs";
import { run } from "./src/run";

const main = (): void => {
  const args = yargs
    .usage("$0 --day [day]\nor\n$0 --all\n")
    .options({
      all: {
        alias: "a",
        describe: "run all days",
      },
      day: {
        describe: "day to run",
        type: "number",
      },
      input: {
        describe: "dir with input files",
        default: "./inputs",
        type: "string",
      },
    })
    .check((args) => {
      if (!args.day && !args.all) {
        throw new Error("Error: --day or --all required");
      }
      return true;
    }).argv;

  for (const line of run(args)) {
    console.log(line);
  }
};

main();
