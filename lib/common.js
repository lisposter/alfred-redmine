'use strict';

const path = require('path');
const url = require('url');

const fs = require('fs-extra');
const request = require('request');

const log = require('./log');

const DIR = path.join(process.env.HOME, ".alfred/alfred-redmine/");

let cfg = {};
try {
  cfg = fs.readJsonSync(path.join(DIR, '.redminerc'));
} catch(e) {
  // log(e);
}

module.exports = {
  DIR: DIR,

  getIssues: function(_path, callback) {
    request.get({
      url: url.resolve(cfg.server, _path),
      headers: {
        'X-Redmine-API-Key': cfg.api_key
      }
    }, function(err, res, body) {
      if (err) {
        return callback(err);
      }

      return callback(null, JSON.parse(body));
    })
  },

  writeHistoryData: function(data) {
    let tag = new Date().getTime();

    try {
      fs.writeJSONSync(path.join(DIR, 'history.json'), data);
      fs.writeFileSync(path.join(DIR, 'history_tag'), tag);
    } catch(e) {
      log(e);
    }
  },

  readHistoryData: function() {
    let data = {};
    try {
      data = fs.readJSONSync(path.join(DIR, 'history.json'));
    } catch(e) {

    }

    return data;
  },

  readHistoryTag: function() {
    let tag;

    try {
      tag = Number(fs.readFileSync(path.join(DIR, 'history_tag')));
    } catch(e) {

    }

    return tag || 0;
  }
}
