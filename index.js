#!/usr/bin/env node

'use strict';

const path = require('path');

const fs = require('fs-extra');
const AlfredItem = require('alfred-item');

const config = require('./lib/config');
const issues = require('./lib/issues');
const log = require('./lib/log');

const DIR = path.join(process.env.HOME, ".alfred/alfred-redmine/");
const query = process.argv.slice(2).map(q => q.trim());

// distribution sub-commands
if (query.length >= 1) {
  switch(query[0]) {
    case 'config':
      log('config entered case')
      return config(query);
      break;
    case 'issues':
    case 'issue':
      return issues(query);
      break;
  }
}


let items = new AlfredItem();

items.addItem(
  1 + Math.random(),
  'Issues...',
  'issues',
  'icon.png',
  {
    autocomplete: ' issues '
  }
)

items.addItem(
  2 + Math.random(),
  'Configuration',
  'config',
  'icon.png',
  {
    autocomplete: ' config '
  }
)

console.log(items);
