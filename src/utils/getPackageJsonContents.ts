import readPkgUp from 'read-pkg-up';
import { printError } from './printError';

interface PackageJsonContents {
  packageJson: {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };
}

export const getPackageJsonContents = async () => {
  try {
    const packageJsonContents = await readPkgUp();
    // TODO more appropriate type-guard
    if (!packageJsonContents) {
      printError('Package.json not found');
    }
    return packageJsonContents as PackageJsonContents;
  } catch (error) {
    printError("Couldn't parse the package.json", { error });
  }
};
