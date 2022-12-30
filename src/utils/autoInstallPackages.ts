import { execSync } from 'child_process';
import { detect } from 'detect-package-manager';
import { unImportantLogger } from './logs';
import { printError } from './printError';
import { printSucces } from './printSucces';

export const autoInstallPackages = async (packages: string[]) => {
  const packagesLatestVersions = packages.map(
    (packageName) => `${packageName}@latest`,
  );
  try {
    const pm = await detect();
    const getInstallationCommand = (
      pm: string,
      packagesLatestVersions: string[],
    ) => `${pm} add -D ${packagesLatestVersions.join(' ')}`;
    const failedInstallationMessage = `Couldn't auto-install the required packages.
    You have to install them manually yourself.
    Please run: ${getInstallationCommand(pm, packagesLatestVersions)}`;
    unImportantLogger.silly(`Detected package manager: ${pm}`);

    try {
      execSync(getInstallationCommand(pm, packagesLatestVersions));
      printSucces(
        `${packages.join(' and ')} ${
          packages.length > 1 ? 'were' : 'was'
        } installed successfully`,
      );
    } catch (error) {
      printError(failedInstallationMessage, { error });
    }
  } catch (error) {
    printError("Couldn't walk up the filesystem", { error });
  }
};
