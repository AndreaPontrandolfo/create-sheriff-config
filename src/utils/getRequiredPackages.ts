import { getPackageJsonContents } from './getPackageJsonContents';
import { logger } from './logs';

export const getRequiredPackages = async () => {
  const { packageJson } = await getPackageJsonContents();
  const userProjectDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const requiredPackages: string[] = [];

  if (!userProjectDependencies.eslint) {
    logger.silly("No 'eslint' dependency found in the project.");
    logger.verbose("Installing 'eslint' and 'eslint-config-sheriff'...");
    requiredPackages.push('eslint');
  }

  if (userProjectDependencies.eslint) {
    logger.verbose("Installing 'eslint-config-sheriff'...");
  }

  requiredPackages.push('eslint-config-sheriff');

  return requiredPackages;
};
