import { createFile } from './createFile';
import { getPackageJsonContents } from './getPackageJsonContents';
import { logger } from './logs';
import { printError } from './printError';
import { printWarning } from './printWarning';
import { wrappedFindUp } from './wrappedFindUp';

const eslintConfigRawText = {
  esm: `import sheriff from 'eslint-config-sheriff';
import { defineFlatConfig } from 'eslint-define-config';

export default defineFlatConfig([...sheriff]);`,
  commonjs: `const sheriff = require('eslint-config-sheriff');
const { defineFlatConfig } = require('eslint-define-config');

module.exports = defineFlatConfig([...sheriff]);`,
};

export const setEslintConfig = async () => {
  const ESLINT_CONFIG_FILE_NAME = 'eslint.config.js';
  const ESLINT_IGNORE_FILE_NAME = '.eslintignore';

  try {
    const eslintConfigFile = await wrappedFindUp(ESLINT_CONFIG_FILE_NAME);
    const eslintIgnoreFile = await wrappedFindUp(ESLINT_IGNORE_FILE_NAME);

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

    const root = await getPackageJsonContents();
    if (!root) {
      printWarning(
        "couldn't read the package.json. Defaulting to Commonjs imports style",
      );
      createFile(ESLINT_CONFIG_FILE_NAME, eslintConfigRawText.commonjs);
    }
    if (root) {
      if (root.packageJson.type === 'module') {
        createFile(ESLINT_CONFIG_FILE_NAME, eslintConfigRawText.esm);
      } else {
        createFile(ESLINT_CONFIG_FILE_NAME, eslintConfigRawText.commonjs);
      }
    }
  } catch (error) {
    printError("Couldn't walk up the filesystem", { error });
  }
};
