import { getPackageJsonContents } from './getPackageJsonContents';
import { logger, unImportantLogger } from './logs';

export const getRequiredPackages = async () => {
  const { packageJson } = await getPackageJsonContents();
  const userProjectDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const requiredPackages: string[] = [];

  if (!userProjectDependencies.eslint) {
    unImportantLogger.silly("No 'eslint' dependency found in the project.");
    logger.verbose("Installing 'eslint' and 'eslint-config-sheriff'...");
    requiredPackages.push('eslint');
  }

  if (userProjectDependencies.eslint) {
    logger.verbose("Installing 'eslint-config-sheriff'...");
  }

  requiredPackages.push('eslint-config-sheriff');

  return requiredPackages;
};
