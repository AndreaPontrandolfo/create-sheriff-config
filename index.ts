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

type Command = Arguments<{
  filter: string | undefined;
}>;

const command = yargs.argv as Command;

async function main() {
  console.log('🚀 ~ file: index.ts:14 ~ command', command);
  await setEslintConfig();
  await setSheriffConfig();
  await setPrettierConfig();
  await setPrettierIgnore();
  await setDependencies(command?.filter);
}

main();
