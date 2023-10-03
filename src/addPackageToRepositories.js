

export const addPackageToRepositories = (packagePath, composerContent) => {

  if(!composerContent.repositories) {
    composerContent.repositories = []
  }

  const repositoryAlreadyAdded = composerContent.repositories.find(repo => repo.url === packagePath)

  if(!repositoryAlreadyAdded) {
    composerContent.repositories.push({
      "type": "path",
      "url": packagePath,
      "options": {
          "symlink": true
      }
    })
  }
  
}