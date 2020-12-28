#!/usr/bin/env node

import * as yargs from "yargs";
import { run } from "./src/runner";

const main = async (): void => {
  const args = yargs.usage("$0 [--year year] [--day day]\n").options({
    year: {
      describe: "year to run",
      type: "number",
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
  }).argv;

  for await (const line of run(args)) {
    console.log(line);
  }
};

main();
