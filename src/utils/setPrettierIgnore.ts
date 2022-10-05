import { findUp } from "find-up";
import { writeFileSync } from "fs";
import { printError } from "./printError";

const prettierIgnoreRawText = `/node_modules/
/dist/
/build/
/artifacts/
/coverage/
.git/`;

export const setPrettierIgnore = async () => {
  const PRETTIER_IGNORE_FILE_NAME = ".prettierignore";

  try {
    const prettierIgnoreFile = await findUp(PRETTIER_IGNORE_FILE_NAME);
    if (prettierIgnoreFile) {
      console.info(
        `An already present '${PRETTIER_IGNORE_FILE_NAME}' file was found in the project. Skipping '${PRETTIER_IGNORE_FILE_NAME}' file generation and configuration.`
      );
      return;
    }
    console.info(
      `No '${PRETTIER_IGNORE_FILE_NAME}' file was found in the project. Generating and configuring '${PRETTIER_IGNORE_FILE_NAME}' file...`
    );
    writeFileSync(PRETTIER_IGNORE_FILE_NAME, prettierIgnoreRawText);
  } catch (error) {
    printError("Couldn't walk up the filesystem", { error });
  }
};
