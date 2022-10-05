import { execSync } from 'child_process';
import { detect } from 'detect-package-manager';
import { logger } from './logs';
import { printError } from './printError';
import { printSucces } from './printSucces';

export const autoInstallPackages = async (packages: string[]) => {
  try {
    const pm = await detect();
    logger.silly(`Detected package manager: ${pm}`);
    try {
      execSync(`${pm} add -D ${packages.join(' ')}`);
      printSucces(
        `${packages.join(' and ')} ${
          packages.length > 1 ? 'were' : 'was'
        } installed successfully`,
      );
    } catch (error) {
      printError("Couldn't auto-install the required packages", { error });
    }
  } catch (error) {
    printError("Couldn't walk up the filesystem", { error });
  }
};
