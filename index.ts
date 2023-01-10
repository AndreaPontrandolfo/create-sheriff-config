#!/usr/bin/env node

import yargs, { type Arguments } from 'yargs';
// import { Command, program } from 'commander';
// import { widgets } from './src/utils/widgets';
// import { spinnerError, stopSpinner } from "./src/utils/spinner";
import { setSheriffConfig } from './src/utils/setSheriffConfig';
import { setDependencies } from './src/utils/setDependencies';
import { setEslintConfig } from './src/utils/setEslintConfig';
import { setPrettierConfig } from './src/utils/setPrettierConfig';
import { setPrettierIgnore } from './src/utils/setPrettierIgnore';
import { askForCustomPath } from './src/utils/askForCustomPath';

type Command =
  | Arguments<{
      filter: string | undefined;
    }>
  | undefined;

const command = yargs(process.argv.slice(2)).argv as Command;

// eslint-disable-next-line
async function main() {
  if (command?.filter) {
    await askForCustomPath();
    // TODO: ask the user if he want Prettier support in the workspace' package directory
  }

  await setEslintConfig();
  await setSheriffConfig();
  await setPrettierConfig();
  await setPrettierIgnore();
  await setDependencies(command?.filter);
}

// eslint-disable-next-line
main();
