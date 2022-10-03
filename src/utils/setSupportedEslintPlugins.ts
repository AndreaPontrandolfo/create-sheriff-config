import { getPackageJsonContents } from "./getPackageJsonContents";

export const setSupportedEslintPlugins = async () => {
  const { packageJson } = await getPackageJsonContents();
  const userProjectDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const finalPluginsConfigurationSetup = {
    playwright: false,
    next: false,
    lodash: false,
  };

  if (userProjectDependencies.playwright) {
    console.info(
      "'Playwright' package found in the project. Setting up support for it..."
    );
    finalPluginsConfigurationSetup.playwright = true;
  }

  if (userProjectDependencies.next) {
    console.info(
      "'Next' package found in the project. Setting up support for it..."
    );
    finalPluginsConfigurationSetup.next = true;
  }

  if (userProjectDependencies.lodash || userProjectDependencies["lodash-es"]) {
    console.info(
      "'Lodash' package found in the project. Setting up support for it..."
    );
    finalPluginsConfigurationSetup.lodash = true;
  }
  console.info("Saving config:");
  console.table(finalPluginsConfigurationSetup);
  // console.dir(finalPluginsConfigurationSetup, {
  //   depth: null,
  //   colors: true,
  //   compact: false,
  // });
};
