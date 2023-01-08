import { findUp } from 'find-up';

export const wrappedFindUp = async (fileNames: string | string[]) => {
  console.log(
    '🚀 ~ file: wrappedFindUp.ts:5 ~ wrappedFindUp ~ global.customProjectRootPath',
    global.customProjectRootPath,
  );
  const foundFile = await findUp(fileNames, {
    stopAt: global.customProjectRootPath,
  });
  return foundFile;
};
