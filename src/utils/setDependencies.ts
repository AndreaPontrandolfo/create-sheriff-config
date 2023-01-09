import { autoInstallPackages } from './autoInstallPackages';
import { getRequiredPackages } from './getRequiredPackages';

export const setDependencies = async (
  selectedProject: string | undefined,
): Promise<void> => {
  const packages = getRequiredPackages();

  await autoInstallPackages(packages, selectedProject);
};
