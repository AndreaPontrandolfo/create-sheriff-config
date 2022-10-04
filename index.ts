#!/usr/bin/env node

import { Command } from "commander";
import { widgets } from "./src/utils/widgets";
// import { spinnerError, stopSpinner } from "./src/utils/spinner";
import { setSheriffConfig } from "./src/utils/setSheriffConfig";
import { setDependencies } from "./src/utils/setDependencies";
import { setEslintConfig } from "./src/utils/setEslintConfig";

const program = new Command();
program.description("Our New CLI");
program.version("0.0.1");
program.addCommand(widgets);

async function main() {
  await setEslintConfig();
  await setSheriffConfig();
  await setDependencies();
  await program.parseAsync();
}
console.log(); // log a new line so there is a nice space
main();
