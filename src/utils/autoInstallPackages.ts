import { execSync } from "child_process";
import { detect } from "detect-package-manager";

export const autoInstallPackages = async (packages: string[]) => {
  const pm = await detect();
  console.info(`Detected package manager: ${pm}`);
  execSync(`${pm} add -D ${packages.join(" ")}`);
};
