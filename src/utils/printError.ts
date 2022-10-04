import chalk from "chalk";

interface Error {
  error?: string;
}

export const printError = (message: string, { error }: Error = {}) => {
  if (error) {
    throw new Error(chalk.red(`${message}. Error: ${error}`));
  }

  if (!error) {
    throw new Error(chalk.red(`${message}.`));
  }
};
