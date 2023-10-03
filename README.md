# Link local composer packages

composer-link-local is a tool to simplify the process of linking local Composer packages and updating your `composer.json` file to use the local versions of these packages during development. This can be especially useful for local package development and testing.

## How it works

The tool will map your composer.json required deps, let you decide which of those deps you want to link locally and finally search over 3 (three) layers of directory structure above and below each layer.

## Running

Certify that your are running Node.js at least 16x

```bash
! TODO: DEPLOY ON NPM TO IT WORKS
npx composer-link-local

