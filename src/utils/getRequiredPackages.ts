import { getPackageJsonContents } from "./getPackageJsonContents";

export const getRequiredPackages = async () => {
  const { packageJson } = await getPackageJsonContents();
  const userProjectDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const requiredPackages: string[] = [];

  if (!userProjectDependencies.eslint) {
    console.info(
      "No 'Eslint' dependency found in the project. Installing eslint..."
    );
    requiredPackages.push("eslint");
  }

  requiredPackages.push("eslint-config-sheriff");

  return requiredPackages;
};
