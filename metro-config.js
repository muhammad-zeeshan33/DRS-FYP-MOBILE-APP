module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false, // false because of hermes issue https://github.com/storybookjs/react-native/issues/152
      },
    }),
  },
};
