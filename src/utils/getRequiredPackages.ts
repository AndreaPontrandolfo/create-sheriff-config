import { getPackageJsonContents } from "./getPackageJsonContents";

export const getRequiredPackages = async () => {
  const { packageJson } = await getPackageJsonContents();
  const userProjectDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const requiredPackages: string[] = [];

  if (!userProjectDependencies.eslint) {
    console.info("No 'eslint' dependency found in the project.");
    console.info("Installing 'eslint' and 'eslint-config-sheriff'...");
    requiredPackages.push("eslint");
  }

  if (userProjectDependencies.eslint) {
    console.info("Installing 'eslint-config-sheriff'...");
  }

  requiredPackages.push("eslint-config-sheriff");

  return requiredPackages;
};
