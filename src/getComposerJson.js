import path from 'path'
import fse from 'fs-extra'

export const getComposerJson = (directory) => {

  const composerJsonPath = path.join(directory, 'composer.json');
  if (!fse.existsSync(composerJsonPath)) {
    return null
  }

  const composerJson = fse.readJsonSync(composerJsonPath);
  if (composerJson) {
    return composerJson
  }

  return null

}