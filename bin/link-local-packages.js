#!/usr/bin/env node

import path from 'path';
import fse from 'fs-extra';
import chalk from 'chalk';
import { getComposerJson } from '../src/getComposerJson.js';
import { getComposerRequiredPackages } from '../src/getComposerRequiredPackages.js';
import checkbox, { Separator } from '@inquirer/checkbox';

const currentDirectory = process.cwd();

console.log(chalk.yellow(`Starting linking local packages on: ${ currentDirectory}`));


( async () => {


  const composerContent = getComposerJson(currentDirectory)

  const requiredPackages = getComposerRequiredPackages(composerContent)

  
  

    const answer = await checkbox({
      message: 'Select a packages to install locally',
      choices: requiredPackages.map((pkg) => {
        return { name: pkg, value: pkg }
      }),
    });


})()

