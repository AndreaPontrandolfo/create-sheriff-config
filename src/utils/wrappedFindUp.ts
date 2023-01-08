import { findUp, findUpSync } from 'find-up';
import { resolve, dirname } from 'path';

export const wrappedFindUp = async (fileNames: string | string[]) => {
  if (!global.customProjectRootPath) {
    const filePath = findUpSync(fileNames);
    return filePath;
  }

  if (global.customProjectRootPath) {
    const stopAt = resolve(global.customProjectRootPath);
    const filePath = findUpSync(fileNames, {
      cwd: global.customProjectRootPath,
    });

    if (filePath && dirname(filePath) === stopAt) {
      return filePath;
    }
  }
};
