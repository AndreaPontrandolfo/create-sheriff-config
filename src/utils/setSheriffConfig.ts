import { writeFileSync } from "fs";
import { getPackageJsonContents } from "./getPackageJsonContents";
import { spinnerSuccess, updateSpinnerText } from "./spinner";

export const setSheriffConfig = async () => {
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
  console.info("'sheriffrc.json' options to be written:");
  console.table(finalPluginsConfigurationSetup);
  // console.info("Creating 'sheriffrc.json'...");
  updateSpinnerText("Creating 'sheriffrc.json'...");
  writeFileSync(
    ".sheriffrc.json",
    JSON.stringify(finalPluginsConfigurationSetup, null, 2)
  );
  spinnerSuccess(
    "Successfully created '.sheriffrc.json' file at project root."
  );
  // console.info("Successfully created '.sheriffrc.json' file at project root.");
  // console.dir(finalPluginsConfigurationSetup, {
  //   depth: null,
  //   colors: true,
  //   compact: false,
  // });
};
