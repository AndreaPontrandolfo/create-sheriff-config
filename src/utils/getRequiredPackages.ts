import { getPackageJsonContents } from './getPackageJsonContents';
import { logger, unImportantLogger } from './logs';
import { printError } from './printError';

export const getRequiredPackages = async () => {
  const root = await getPackageJsonContents();
  if (!root) {
    printError("couldn't read the package.json.");
    return [];
  }

  const userProjectDependencies = {
    ...root.packageJson.dependencies,
    ...root.packageJson.devDependencies,
  };

  const requiredPackages: string[] = [];

  if (!userProjectDependencies.eslint) {
    unImportantLogger.silly("No 'eslint' dependency found in the project.");
    requiredPackages.push('eslint');
    logger.verbose("Installing 'eslint'...");
  }

  requiredPackages.push('eslint-define-config');
  logger.verbose("Installing 'eslint-define-config'...");

  requiredPackages.push('eslint-config-sheriff');
  logger.verbose("Installing 'eslint-config-sheriff'...");

  return requiredPackages;
};
