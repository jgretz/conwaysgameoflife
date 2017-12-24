/* eslint-disable */
require('shelljs/global');

echo('Building Site ...');

// clean
rm('-rf', 'lib/site');
rm('-rf', 'site/dist');

// build admin spa and move it
cd('game');
exec('yarn');
exec('yarn run build', (code, stdout, stderr) => {
  cd('..');
  mv('game/dist', 'lib/site');

  echo('Build Complete');
});
