import { logger } from './logs';

export const printSucces = (message: string) => {
  logger.info(`✔️  ${message}.`);
};
