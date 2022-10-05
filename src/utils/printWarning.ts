import { logger } from './logs';

export const printWarning = (message: string) => {
  logger.warn(`⚠️  ${message}.`);
};
