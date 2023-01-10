import promptShape from 'prompts';
import { isString } from 'lodash';
import { logger } from './logs';

export const askForCustomPath = async (): Promise<void> => {
  logger.verbose(
    `It looks like you are trying to install the sheriff config in a workspace' package.
             Please specify the package' path...`,
  );

  const response = await promptShape({
    type: 'text',
    name: 'path',
    message: 'Package path',
    initial: '.',
  });

  if (isString(response.path)) {
    logger.info(`Selected path: "${response.path}"`);
    global.customProjectRootPath = response.path;
  }
};
