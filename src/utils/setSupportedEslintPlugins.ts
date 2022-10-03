import { getPackageJsonContents } from "./getPackageJsonContents";

export const setSupportedEslintPlugins = async () => {
  const { packageJson } = await getPackageJsonContents();
  const userProjectDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  if (userProjectDependencies.playwright) {
    console.info(
      "'Playwright' package found in the project. Setting up support for it..."
    );
  }
  if (userProjectDependencies.next) {
    console.info(
      "'Next' package found in the project. Setting up support for it..."
    );
  }
  if (userProjectDependencies.lodash || userProjectDependencies["lodash-es"]) {
    console.info(
      "'Lodash' package found in the project. Setting up support for it..."
    );
  }
};
