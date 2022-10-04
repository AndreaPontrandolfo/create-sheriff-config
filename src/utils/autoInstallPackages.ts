import { execSync } from "child_process";
import { detect } from "detect-package-manager";
import { printError } from "./printError";

export const autoInstallPackages = async (packages: string[]) => {
  const pm = await detect();
  console.info(`Detected package manager: ${pm}`);
  try {
    execSync(`${pm} add -D ${packages.join(" ")}`);
  } catch (error) {
    printError("Couldn't auto-install the required packages", { error });
  }
};
