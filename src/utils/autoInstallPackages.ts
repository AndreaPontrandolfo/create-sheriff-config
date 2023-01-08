import { execSync } from 'child_process';
import { detect } from 'detect-package-manager';
import { unImportantLogger } from './logs';
import { printError } from './printError';
import { printSucces } from './printSucces';

export const autoInstallPackages = async (
  packages: string[],
  selectedProject: string | undefined,
) => {
  const packagesLatestVersions = packages.map(
    (packageName) => `${packageName}@latest`,
  );
  try {
    const pm = await detect();
    const getInstallationCommand = (
      pm: string,
      packagesLatestVersions: string[],
      selectedProject: string | undefined,
      isFilterRequired = true,
    ) => {
      const projectArgument =
        isFilterRequired && selectedProject
          ? ` --filter=${selectedProject}`
          : '';

      return `${pm} add -D ${packagesLatestVersions.join(
        ' ',
      )}${projectArgument}`;
    };
    const failedInstallationMessage = `Couldn't auto-install the required packages.
    You have to install them manually yourself.
    Please run: ${getInstallationCommand(
      pm,
      packagesLatestVersions,
      selectedProject,
      false,
    )}`;

    unImportantLogger.silly(`Detected package manager: ${pm}`);

    if (pm === 'pnpm' && selectedProject) {
      unImportantLogger.silly(
        `Installing dependendencies in project: ${selectedProject}`,
      );
    }

    try {
      execSync(
        getInstallationCommand(pm, packagesLatestVersions, selectedProject),
      );
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
