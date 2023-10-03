
import { getComposerJson } from './getComposerJson.js';
import { getComposerRequiredPackages } from './getComposerRequiredPackages.js';
import { scanDirsForComposerPackage } from './scanDirsForComposerPackage.js';
import { addPackageToRepositories } from './addPackageToRepositories.js';
import checkbox from '@inquirer/checkbox';
import { select } from '@inquirer/prompts';
import fse from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

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
      return { name: pkg, value: pkg }
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
        console.log(chalk.blue(`Found package ${ packageName.name } at ${ packageName.path }`))
      } else {
        console.log(chalk.yellow(`Could not find the package ${ packageName.name } in directories near the current directory ${ currentDirectory }`))
      }
    }

    const packagesToAdd = packages.filter(pkg => pkg.path)

    for(const packageToAdd of packagesToAdd) {
      addPackageToRepositories(packageToAdd.path, composerContent)
    }
    
    fse.writeFileSync(path.join(currentDirectory, 'composer.json'), JSON.stringify(composerContent, null, 2))

}