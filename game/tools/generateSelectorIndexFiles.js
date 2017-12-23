import generateIndexFiles from './generateIndexFiles';

generateIndexFiles({
  searchPath: '../app/features',
  includeTests: [
    /features(?:\/|\\).+?(?:\/|\\)selectors/,
  ],
  formatInput: fileName => `{default as ${fileName}}`,
});
