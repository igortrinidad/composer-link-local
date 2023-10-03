#!/usr/bin/env node

import linkLocalPackages from '../src/index.js';  

try {
  const currentDirectory = process.cwd()
  await linkLocalPackages(currentDirectory)
} catch (error) {
  console.log(error)
}