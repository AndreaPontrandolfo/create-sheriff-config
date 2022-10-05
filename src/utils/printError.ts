import { logger } from './logs';

interface Error {
  error?: string | unknown;
}

export const printError = (message: string, { error }: Error = {}) => {
  if (error) {
    logger.error(new Error(`${message}. Error: ${error}`));
  }

  if (!error) {
    throw logger.error(new Error(`${message}.`));
  }
};
