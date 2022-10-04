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
        "'eslint.config.js' file found. Skipping 'eslint.config.js' file generation and configuration."
      );
      return;
    }
    console.info(
      "'eslint.config.js' file not found. Generating and configuring 'eslint.config.js' file..."
    );
    writeFileSync("eslint.config.js", eslintConfigRawText);
  } catch (error) {
    printError("Couldn't walk up the filesystem", { error });
  }
};
