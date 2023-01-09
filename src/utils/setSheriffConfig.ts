import { createFile } from './createFile';
import { getPackageJsonContents } from './getPackageJsonContents';
import { logger } from './logs';
import { printError } from './printError';
// import { spinnerSuccess, updateSpinnerText } from './spinner';

export const setSheriffConfig = async (): Promise<void> => {
  const SHERIFF_CONFIG_FILE_NAME = '.sheriffrc.json';
  const root = await getPackageJsonContents();

  if (!root) {
    printError("couldn't read the package.json.");

    return;
  }
  const userProjectDependencies = {
    ...root.packageJson.dependencies,
    ...root.packageJson.devDependencies,
  };

  const finalPluginsConfigurationSetup = {
    react: false,
    lodash: false,
    next: false,
    playwright: false,
    jest: false,
    vitest: false,
  };

  if (!userProjectDependencies) {
    printError(
      "Couldn't read project dependencies. Every setting will be set to false",
    );
  }

  if (userProjectDependencies) {
    if (
      userProjectDependencies.react ||
      userProjectDependencies['react-scripts'] ||
      userProjectDependencies.next
    ) {
      logger.verbose(
        "'React' package found in the project. Setting up support for it...",
      );
      finalPluginsConfigurationSetup.react = true;
    }

    if (userProjectDependencies.playwright) {
      logger.verbose(
        "'Playwright' package found in the project. Setting up support for it...",
      );
      finalPluginsConfigurationSetup.playwright = true;
    }

    if (userProjectDependencies.next) {
      logger.verbose(
        "'Next' package found in the project. Setting up support for it...",
      );
      finalPluginsConfigurationSetup.next = true;
    }

    if (
      userProjectDependencies.lodash ||
      userProjectDependencies['lodash-es']
    ) {
      logger.verbose(
        "'Lodash' package found in the project. Setting up support for it...",
      );
      finalPluginsConfigurationSetup.lodash = true;
    }

    if (userProjectDependencies.jest) {
      logger.verbose(
        "'Jest' package found in the project. Setting up support for it...",
      );
      finalPluginsConfigurationSetup.jest = true;
    }

    if (userProjectDependencies.vitest) {
      logger.verbose(
        "'Vitest' package found in the project. Setting up support for it...",
      );
      finalPluginsConfigurationSetup.vitest = true;
    }
  }

  logger.verbose(
    `Generating ${SHERIFF_CONFIG_FILE_NAME} with options:`,
    finalPluginsConfigurationSetup,
  );

  // updateSpinnerText("Creating '.sheriffrc.json'...");
  createFile(
    SHERIFF_CONFIG_FILE_NAME,
    JSON.stringify(finalPluginsConfigurationSetup, null, 2),
  );

  // spinnerSuccess(
  //   "Successfully created '.sheriffrc.json' file at project root.",
  // );
};
