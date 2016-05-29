'use strict';

const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const path = require('path');

const validator = require('validator');

const log = require('./log');

const AlfredItem = require('alfred-item');

const DIR = require('./common').DIR;

function makeMsgItems(title, msg) {
  let items = new AlfredItem();

  items.addItem(
      Math.random(),
      title || '',
      msg || ''
    );

  console.log(items);
}

function verifyConfig(args) {
  if (args.length < 1) {
    return makeMsgItems('Format: <server_url> <api_key>', 'Please input config');
  }

  if (args[0] && !validator.isURL(args[0])) {
    return makeMsgItems('Format: <server_url> <api_key>', 'Invalid URL!');
  }

  if (!args[1]) {
    return makeMsgItems('Format: <server_url> <api_key>', 'Invalid API Key!');
  }

  log(args);

  try {
    fs.writeJsonSync(path.join(DIR, '.redminerc'), { "server": args[0], "api_key": args[1] });

    return makeMsgItems('Succeed!', 'You can now close this.');
  } catch(e) {
    return log(e);
  }
}

function deleteConfig() {
  try {
    fs.writeJsonSync(path.join(DIR, '.redminerc'), { });

    return makeMsgItems('Succeed!', 'You can now close this.');
  } catch(e) {
    return log(e);
  }
}

module.exports = function(args) {
  log('config entered')
  const _args = args;

  try {
    fs.accessSync(DIR)
  } catch(e) {
    mkdirp.sync(DIR);
  }

  if (args.length >= 2) {
    switch(args[1]) {
      case 'add':
        return verifyConfig(args.slice(2));
      case 'delete':
        return deleteConfig();
    }
  }

  let items = new AlfredItem();

  items.addItem(
      1 + Math.random(),
      'Add / Edit',
      'Add a new configuration or edit the existed',
      'icon.png',
      {
        autocomplete: ' config add '
      }
    )

  items.addItem(
      2 + Math.random(),
      'Delete',
      'Delete configuration',
      'icon.png',
      {
        autocomplete: ' config delete '
      }
    )

  console.log(items);
}
