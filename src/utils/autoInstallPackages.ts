import { execSync } from "child_process";
import { detect } from "detect-package-manager";
import { printError } from "./printError";

export const autoInstallPackages = async (packages: string[]) => {
  const pm = await detect();
  console.debug(`Detected package manager: ${pm}`);
  try {
    execSync(`${pm} add -D ${packages.join(" ")}`);
    console.info(
      "'Eslint' and 'eslint-config-sheriff' installed successfully."
    );
  } catch (error) {
    printError("Couldn't auto-install the required packages", { error });
  }
};
