/* eslint-disable no-var */
require('shelljs/global');

// move over package.json
echo('Moving package.json ...');

if (find('./lib').length === 0) {
  mkdir('./lib');
}

cp('./package.prod.json', './lib/package.json');

// build app
require('./build_server');
require('./build_site');


