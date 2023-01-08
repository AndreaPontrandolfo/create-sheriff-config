import { findUp } from 'find-up';
import { resolve, dirname } from 'path';

export const wrappedFindUp = async (fileNames: string | string[]) => {
  if (!global.customProjectRootPath) {
    const filePath = await findUp(fileNames);
    return filePath;
  }

  if (global.customProjectRootPath) {
    const stopAt = resolve(global.customProjectRootPath);
    const filePath = await findUp(fileNames, {
      cwd: global.customProjectRootPath,
    });

    if (filePath && dirname(filePath) === stopAt) {
      return filePath;
    }
  }

  return undefined;
};
