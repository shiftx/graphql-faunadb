const fs = require('fs');

const package = require('../package.json');
delete package.scripts;
delete package.devDependencies;

// const { version } = package;
// const match = /^[0-9]+\.[0-9]+\.[0-9]+-?([^.]*)/.exec(version);
// assert(match, 'Version does not match semver spec.');
// const tag = match[1];
// assert(!tag || tag === 'rc', 'Only "rc" tag is supported.');

// assert(!package.publishConfig, 'Can not override "publishConfig".');
// package.publishConfig = { tag: tag || 'latest' };

fs.writeFileSync('./dist/package.json', JSON.stringify(package, null, 2));
