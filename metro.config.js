const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Suporte a ES Modules
  config.resolver.sourceExts = [...config.resolver.sourceExts, 'js', 'jsx', 'ts', 'tsx', 'mjs', 'cjs'];
  config.transformer.getTransformOptions = async () => ({
    transform: {
      experimentalImportSupport: true,
      inlineRequires: true,
    },
  });

  // Desativar Hermes para web
  if (process.env.REACT_NATIVE_PLATFORM === 'web') {
    config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');
  }

  return config;
})();