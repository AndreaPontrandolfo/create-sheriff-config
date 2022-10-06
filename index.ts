#!/usr/bin/env node

import { Command } from 'commander';
import { widgets } from './src/utils/widgets';
// import { spinnerError, stopSpinner } from "./src/utils/spinner";
import { setSheriffConfig } from './src/utils/setSheriffConfig';
import { setDependencies } from './src/utils/setDependencies';
import { setEslintConfig } from './src/utils/setEslintConfig';
import { setPrettierConfig } from './src/utils/setPrettierConfig';
import { setPrettierIgnore } from './src/utils/setPrettierIgnore';

async function main() {
  await setEslintConfig();
  await setSheriffConfig();
  await setPrettierConfig();
  await setPrettierIgnore();
  await setDependencies();
}
main();
