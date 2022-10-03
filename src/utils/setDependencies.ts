import { autoInstallPackages } from "./autoInstallPackages";
import { getRequiredPackages } from "./getRequiredPackages";

export const setDependencies = async () => {
  const packages = await getRequiredPackages();
  await autoInstallPackages(packages);
};
