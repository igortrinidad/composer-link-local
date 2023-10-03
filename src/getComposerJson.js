import path from 'path'
import fse from 'fs-extra'

export const getComposerJson = (directory) => {

  const composerJsonPath = path.join(directory, 'composer.json');

  if (!fse.existsSync(composerJsonPath)) {
    throw new Error('composer.json not found');
  }
  
  const composerJson = fse.readJsonSync(composerJsonPath);
  
  if (!composerJson) {
    throw new Error('composer.json not found');
  }

  return composerJson;
}