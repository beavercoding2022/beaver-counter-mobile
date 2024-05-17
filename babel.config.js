module.exports = {
  presets: ['module:@react-native/babel-preset'],

  // https://reactnative.dev/docs/performance#using-consolelog-statements
  env: {
    production: {
      plugins: ['transform-remove-console', 'react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'], // <- this is the same as the baseUrl
        extensions: [
          '.ios.ts',
          '.ios.tsx',
          '.android.ts',
          '.android.tsx',
          '.ts',
          '.tsx',
        ],
        alias: {
          '@': './src/', // <- this is absolute (different from tsconfig)
        },
      },
    ],
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-function-name',
  ],
};
