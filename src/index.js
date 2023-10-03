
import { getComposerJson } from './getComposerJson.js';
import { getComposerRequiredPackages } from './getComposerRequiredPackages.js';
import { scanDirsForComposerPackage } from './scanDirsForComposerPackage.js';
import checkbox from '@inquirer/checkbox';
import { select } from '@inquirer/prompts';

export default async (currentDirectory) => {

  const composerContent = getComposerJson(currentDirectory)

  const requiredPackages = getComposerRequiredPackages(composerContent)

  if(!requiredPackages.length) {
    throw new Error(`No packages found in composer.json: ${ currentDirectory }`)
  }

    const scanDirs = await select({
      message: 'Scan directories for composer packages?',
      choices: [
        {
          name: 'Yes',
          value: true
        },
        {
          name: 'No',
          value: false
        }
      ]
    })

    const choices = requiredPackages.map((pkg) => {
      return { name: pkg, value: pkg, checked: pkg === 'webfitters/fittingroom' }
    }).sort((a, b) => a.checked < b.checked ? 1 : -1)

    const packagesSelected = await checkbox({
      message: 'Select a packages to install locally',
      choices,
    })

    const packages = packagesSelected.map(pkg => ({ name: pkg, path: '' }))

    for(const packageName of packages) {
      const packagePathFound = await scanDirsForComposerPackage(packageName.name, currentDirectory, 3)
      if(packagePathFound) {
        packageName.path = packagePathFound
      }
    }
    
    console.log(packages)

}