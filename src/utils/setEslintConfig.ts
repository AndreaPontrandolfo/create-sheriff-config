import { findUp } from "find-up";
import { writeFileSync } from "fs";
import { printError } from "./printError";

const eslintConfigRawText = `import sheriff from 'eslint-config-sheriff/recommended';
export default [
  ...sheriff,
  {
    files: ['**/*{js,ts,jsx,tsx}'],
  }
];`;

export const setEslintConfig = async () => {
  const ESLINT_CONFIG_FILE_NAME = "eslint.config.js";
  try {
    const eslintConfigFile = await findUp(ESLINT_CONFIG_FILE_NAME);
    if (eslintConfigFile) {
      console.info(
        `'${ESLINT_CONFIG_FILE_NAME}' file found. Skipping '${ESLINT_CONFIG_FILE_NAME}' file generation and configuration.`
      );
      return;
    }
    console.info(
      `'${ESLINT_CONFIG_FILE_NAME}' file not found. Generating and configuring '${ESLINT_CONFIG_FILE_NAME}' file...`
    );
    console.warn(
      "If you have other Eslint configs in your project, remove them."
    );
    writeFileSync(ESLINT_CONFIG_FILE_NAME, eslintConfigRawText);
  } catch (error) {
    printError("Couldn't walk up the filesystem", { error });
  }
};
