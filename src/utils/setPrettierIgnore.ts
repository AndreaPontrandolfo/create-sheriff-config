import findUp from 'find-up';
import { writeFileSync } from 'fs';
import { logger } from './logs';
import { printError } from './printError';
import { printSucces } from './printSucces';

const prettierIgnoreRawText = `/node_modules/
/dist/
/build/
/artifacts/
/coverage/
.git/`;

export const setPrettierIgnore = async () => {
  const PRETTIER_IGNORE_FILE_NAME = '.prettierignore';

  try {
    const prettierIgnoreFile = await findUp(PRETTIER_IGNORE_FILE_NAME);
    if (prettierIgnoreFile) {
      logger.verbose(
        `An already present '${PRETTIER_IGNORE_FILE_NAME}' file was found in the project. Skipping '${PRETTIER_IGNORE_FILE_NAME}' file generation and configuration.`,
      );
      return;
    }
    logger.verbose(
      `No '${PRETTIER_IGNORE_FILE_NAME}' file was found in the project. Generating and configuring '${PRETTIER_IGNORE_FILE_NAME}' file...`,
    );
    try {
      writeFileSync(PRETTIER_IGNORE_FILE_NAME, prettierIgnoreRawText);
      printSucces(`Successfully generated ${PRETTIER_IGNORE_FILE_NAME} file`);
    } catch (error) {
      printError(
        `Couldn't write ${PRETTIER_IGNORE_FILE_NAME} file to the filesystem`,
        {
          error,
        },
      );
    }
  } catch (error) {
    printError("Couldn't walk up the filesystem", { error });
  }
};
