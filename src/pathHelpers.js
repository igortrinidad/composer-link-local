

export const getAboveDirPath = (currentPath) => {
  // For unix systems
  if(currentPath.includes('/')) {
    return currentPath.split('/').slice(0, -1).join('/')
  }

  // For windows systems
  return currentPath = currentPath.split('\\').slice(0, -1).join('\\')

}