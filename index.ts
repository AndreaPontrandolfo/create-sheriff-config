#!/usr/bin/env node

import { Command } from "commander";
import { widgets } from "./src/utils/widgets";
// import { spinnerError, stopSpinner } from "./src/utils/spinner";
import { setSupportedEslintPlugins } from "./src/utils/setSupportedEslintPlugins";
import { setDependencies } from "./src/utils/setDependencies";

const program = new Command();
program.description("Our New CLI");
program.version("0.0.1");
program.addCommand(widgets);

async function main() {
  await setSupportedEslintPlugins();
  await setDependencies();
  await program.parseAsync();
}
console.log(); // log a new line so there is a nice space
main();
