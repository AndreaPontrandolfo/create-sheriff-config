import findUp from 'find-up';
import { writeFileSync } from 'fs';
import { logger } from './logs';
import { printError } from './printError';
import { printSucces } from './printSucces';
import { printWarning } from './printWarning';

const eslintConfigRawText = `import sheriff from 'eslint-config-sheriff';

export default [...sheriff];`;

export const setEslintConfig = async () => {
  const ESLINT_CONFIG_FILE_NAME = 'eslint.config.js';
  const ESLINT_IGNORE_FILE_NAME = '.eslintignore';

  try {
    const eslintConfigFile = await findUp(ESLINT_CONFIG_FILE_NAME);
    const eslintIgnoreFile = await findUp(ESLINT_IGNORE_FILE_NAME);

    if (eslintIgnoreFile) {
      printWarning(
        `A ${ESLINT_IGNORE_FILE_NAME} file was found. Please remove it and transfer the ignored files list to the ${ESLINT_CONFIG_FILE_NAME} 'ignores' array`,
      );
    }

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
