import generateIndexFiles from './generateIndexFiles';

generateIndexFiles({
  searchPath: '../app',
  includeTests: [
    /util/,
  ],
  formatInput: () => '*',
});
