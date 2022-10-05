import { writeFileSync } from 'fs';
import { getPackageJsonContents } from './getPackageJsonContents';
import { logger } from './logs';
import { printError } from './printError';
import { printSucces } from './printSucces';
import { spinnerSuccess, updateSpinnerText } from './spinner';

export const setSheriffConfig = async () => {
  const SHERIFF_CONFIG_FILE_NAME = '.sheriffrc.json';
  const { packageJson } = await getPackageJsonContents();
  const userProjectDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const finalPluginsConfigurationSetup = {
    playwright: false,
    next: false,
    lodash: false,
  };

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

  if (userProjectDependencies.lodash || userProjectDependencies['lodash-es']) {
    logger.verbose(
      "'Lodash' package found in the project. Setting up support for it...",
    );
    finalPluginsConfigurationSetup.lodash = true;
  }

  logger.verbose(
    "Generating 'sheriffrc.json' with options:",
    finalPluginsConfigurationSetup,
  );

  // updateSpinnerText("Creating 'sheriffrc.json'...");
  try {
    writeFileSync(
      SHERIFF_CONFIG_FILE_NAME,
      JSON.stringify(finalPluginsConfigurationSetup, null, 2),
    );
    printSucces(`Successfully generated ${SHERIFF_CONFIG_FILE_NAME} file`);
  } catch (error) {
    printError(
      `Couldn't write ${SHERIFF_CONFIG_FILE_NAME} file to the filesystem`,
      {
        error,
      },
    );
  }

  // spinnerSuccess(
  //   "Successfully created '.sheriffrc.json' file at project root.",
  // );
};
