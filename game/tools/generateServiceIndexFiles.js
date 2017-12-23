import generateIndexFiles from './generateIndexFiles';

generateIndexFiles({
  searchPath: '../app/features',
  includeTests: [
    /features(?:\/|\\).+?(?:\/|\\)services$/,
  ],
  formatInput: fileName => `{default as ${fileName}}`,
});
