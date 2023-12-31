
import { folderToExclude } from './enums.js'
import fse from 'fs-extra'
import path from 'path'
import { getComposerJson } from './getComposerJson.js'
import chalk from 'chalk'
import { getAboveDirPath } from './pathHelpers.js'

export const scanDirsForComposerPackage = async (packageName, entryPath, deepth = 3) => {

  var currentPath = path.join(entryPath)
  
  for(let i = 0; i < deepth; i++) {

    try {
      const currentPathItems = fse.readdirSync(currentPath)
      const packageFound = checkDirHasPackage(currentPath, currentPathItems, packageName)
      if(packageFound) {
        return packageFound
      }
  
      const foundPackage = await recursiveScanInsideDirs(currentPath, packageName, deepth)
  
      if(foundPackage) {
        return foundPackage
      }
  
      currentPath = getAboveDirPath(currentPath)
      
    } catch (error) {
      console.error(chalk.red(`Error while scanning ${currentPath}`), error.message)
      throw error
    }

  }

  return null

}

export const checkDirHasPackage = (currentPath, packageName) => {
  const composerJsonContent = getComposerJson(currentPath)
  const composerMatchPackageName = Boolean(composerJsonContent && composerJsonContent.name === packageName)
  return composerMatchPackageName ? currentPath : null
}

export const recursiveScanInsideDirs = async (currentPath, packageName, currentDepth = 3) => {
  if (currentDepth <= 0) {
    return null;
  }

  const items = fse.readdirSync(currentPath);

  for (const item of items) {
    const itemPath = path.join(currentPath, item);

    if (fse.statSync(itemPath).isDirectory() && !folderToExclude.includes(item)) {
      const packageFound = checkDirHasPackage(itemPath, packageName);

      if (packageFound) {
        return packageFound;
      }

      const innerResult = await recursiveScanInsideDirs(itemPath, packageName, currentDepth - 1);

      if (innerResult) {
        return innerResult;
      }
    }
  }

  return null
}
