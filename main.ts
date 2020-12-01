#!/usr/bin/env node
/* eslint no-console: "off" */

import * as yargs from "yargs";
import { run, Day, Part } from "./src/run";

interface Arguments {
  day: Day;
  part: Part;
}

const main = async (): Promise<string> => {
  const args = (yargs as yargs.Argv<Arguments>)
    .usage(
      "$0 [day] [part]",
      "run solutions for a given day",
      (yargs: yargs.Argv) => {
        const a = yargs
          .positional("day", {
            type: "string",
            coerce: (v: string) => v.padStart(2, "0"),
          })
          .positional("part", { type: "string", choices: ["1", "2"] })
          .demandOption(["day", "part"]);
        return a;
      }
    )
    .parse();
  return run(args);
};

main().then(console.log).catch(console.error);
