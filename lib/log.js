'use strict';

const path = require('path');

const mkdirp = require('mkdirp');
const fs = require('fs-extra');

const DIR = require('./common').DIR;

const DEBUG = true;

module.exports = function(args) {
  if (!DEBUG) return;

  try {
    fs.accessSync(DIR)
  } catch(e) {
    mkdirp.sync(DIR);
  }
  fs.appendFileSync(path.join(DIR, 'out.log'), Date() + '\t\t' + args + '\n');
}
