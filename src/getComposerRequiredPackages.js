export const getComposerRequiredPackages = (composerContent) => {
  return ['require', 'require-dev'].reduce((acc, requiredKey) => {
    if (!composerContent[requiredKey]) {
      throw new Error(`composer.json does not have ${requiredKey} key, aborting...`);
    }

    return [...acc, ...Object.keys(composerContent[requiredKey])];
  }, []);
};