export const getComposerRequiredPackages = (composerContent) => {
  return ['require', 'require-dev'].reduce((acc, requiredKey) => {
    return [...acc, ...Object.keys(composerContent[requiredKey] || {})];
  }, []);
  
};