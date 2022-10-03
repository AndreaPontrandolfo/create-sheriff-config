import { readPackageUp } from "read-pkg-up";

export const getPackageJsonContents = async () => {
  try {
    const packageJsonContents = await readPackageUp();
    // TODO more appropriate type-guard
    if (!packageJsonContents) {
      throw new Error("Package.json not found.");
    }
    return packageJsonContents;
  } catch (error) {
    throw new Error(`Couldn't parse the package.json. Error: ${error}`);
  }
};
