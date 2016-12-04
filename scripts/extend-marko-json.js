// This file adds reference to this taglib to the Marko.json

const { existsSync, writeFileSync } = require('fs');
const { join, dirname, relative } = require('path');

// Creating a path to marko.json file at root of the current app
const markoJSfilename = join(existsSync(join(process.cwd(), 'package.json')) ? process.cwd() : join(dirname(require.main.filename), '..', '..'), 'marko.json');  
const markoJson = existsSync(markoJSfilename) ? require(markoJSfilename) : {};
const pathToUs = relative(dirname(markoJSfilename), join(__dirname, '..', 'components'));

// Extends "tags-dir"
if (Array.isArray(markoJson['tags-dir'])) {
    if (!markoJson['tags-dir'].includes(pathToUs)) markoJson['tags-dir'].push(pathToUs);
} else markoJson['tags-dir'] = (markoJson['tags-dir'] && markoJson['tags-dir'] !== pathToUs)  ? [ markoJson['tags-dir'], pathToUs ] : pathToUs;

// Write result
console.log("Adding '%s' to '%s'", pathToUs, markoJSfilename);
writeFileSync(markoJSfilename, JSON.stringify(markoJson, null, 2));
