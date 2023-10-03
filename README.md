# Link local composer packages

composer-link-local is a tool to simplify the process of linking local Composer packages and updating your `composer.json` file to use the local versions of these packages during development. This can be especially useful for local package development and testing.

## How it works

The tool will map your composer.json required deps, let you decide which of those deps you want to link locally, search over 3 (three) layers of directory structure above and below each layer and finally add the link for each dependency that you selected and was founded near the current directory using the "repositories" attribute of your composer.json

```js

  {
    //... composer.json contents

    "repositories": [
      {
        "type": "path",
        "url": "/path/to/you/local/dependecy",
        "options": {
          "symlink": true
        }
      }
    ]

    //... rest of your composer.json
  }
```

## Running

Certify that your are running Node.js at least 16x

```bash
npx composer-link-local

