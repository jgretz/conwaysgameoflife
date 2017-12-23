import generateIndexFiles from './generateIndexFiles';

generateIndexFiles({
  searchPath: '../app/features',
  includeTests: [
    /features(?:\/|\\).+?(?:\/|\\)actions/,
  ],
  formatInput: () => '*',
});
