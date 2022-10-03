import { execSync } from "child_process";
import { detect } from "detect-package-manager";

export const autoInstallPackages = async (packages: string[]) => {
  const pm = await detect();
  console.log("🚀 ~ file: autoInstallPackages.ts ~ line 7 ~ pm", pm);
  execSync(`${pm} add -D ${packages.join(" ")}`);
};
