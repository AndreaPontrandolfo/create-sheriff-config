import readPkgUp from 'read-pkg-up';
import { printError } from './printError';

export const getPackageJsonContents = async () => {
  try {
    const packageJsonContents = await readPkgUp();
    // TODO more appropriate type-guard
    if (!packageJsonContents) {
      printError('Package.json not found');
    }
    return packageJsonContents;
  } catch (error) {
    printError("Couldn't parse the package.json", { error });
  }
};
