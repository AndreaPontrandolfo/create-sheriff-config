#!/usr/bin/env node

import yargs, { type Arguments } from 'yargs';
import prompts from 'prompts';
// import { Command, program } from 'commander';
// import { widgets } from './src/utils/widgets';
// import { spinnerError, stopSpinner } from "./src/utils/spinner";
import { setSheriffConfig } from './src/utils/setSheriffConfig';
import { setDependencies } from './src/utils/setDependencies';
import { setEslintConfig } from './src/utils/setEslintConfig';
import { setPrettierConfig } from './src/utils/setPrettierConfig';
import { setPrettierIgnore } from './src/utils/setPrettierIgnore';
import { logger } from './src/utils/logs';
import { isString } from 'lodash-es';

type Command = Arguments<{
  filter: string | undefined;
}>;

const command = yargs(process.argv.slice(2)).argv as Command;

async function main() {
  if (command?.filter) {
    logger.verbose(
      `It looks like you are trying to install the sheriff config in a workspace' package.
           Please specify the package' path...`,
    );

    const response = await prompts({
      type: 'text',
      name: 'path',
      message: 'Package path',
      initial: '.',
    });

    logger.info(`Selected path: "${response.path}"`);

    if (isString(response.path)) {
      global.customProjectRootPath = response.path;
    }
  }

  await setEslintConfig();
  await setSheriffConfig();
  await setPrettierConfig();
  await setPrettierIgnore();
  await setDependencies(command?.filter);
}

main();
