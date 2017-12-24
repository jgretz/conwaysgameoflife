/* eslint-disable */
require('shelljs/global');

echo('Building Server ...');

// clean
rm('lib/*.js');

// move over server
exec('babel -d lib/ server/src/index.js');

mv('lib/server/src/index.js', 'lib/index.js');
rm('-rf', 'lib/server');
