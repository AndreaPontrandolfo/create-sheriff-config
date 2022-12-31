import { autoInstallPackages } from './autoInstallPackages';
import { getRequiredPackages } from './getRequiredPackages';

export const setDependencies = async (selectedProject: string | undefined) => {
  const packages = await getRequiredPackages();
  await autoInstallPackages(packages, selectedProject);
};
