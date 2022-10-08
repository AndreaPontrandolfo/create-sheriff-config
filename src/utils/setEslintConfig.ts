import findUp from 'find-up';
import { writeFileSync } from 'fs';
import { logger } from './logs';
import { printError } from './printError';
import { printSucces } from './printSucces';
import { printWarning } from './printWarning';

const eslintConfigRawText = `import sheriff from 'eslint-config-sheriff';

export default [
  ...sheriff,
  {
    files: ['**/*{js,ts,jsx,tsx}'],
  }
];`;

export const setEslintConfig = async () => {
  const ESLINT_CONFIG_FILE_NAME = 'eslint.config.js';
  try {
    const eslintConfigFile = await findUp(ESLINT_CONFIG_FILE_NAME);
    if (eslintConfigFile) {
      logger.verbose(
        `'${ESLINT_CONFIG_FILE_NAME}' file found. Skipping '${ESLINT_CONFIG_FILE_NAME}' file generation and configuration.`,
      );
      return;
    }
    logger.verbose(
      `'${ESLINT_CONFIG_FILE_NAME}' file not found. Generating and configuring '${ESLINT_CONFIG_FILE_NAME}' file...`,
    );
    printWarning(
      'If you have other Eslint configs in your project, remove them',
    );
    try {
      writeFileSync(ESLINT_CONFIG_FILE_NAME, eslintConfigRawText);
      printSucces(`Successfully generated ${ESLINT_CONFIG_FILE_NAME} file`);
    } catch (error) {
      printError(
        `Couldn't write ${ESLINT_CONFIG_FILE_NAME} file to the filesystem`,
        {
          error,
        },
      );
    }
  } catch (error) {
    printError("Couldn't walk up the filesystem", { error });
  }
};
