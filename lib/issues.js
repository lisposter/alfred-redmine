'use strict';

const fs = require('fs-extra');
const path = require('path');
const url = require('url');

const AlfredItem = require('alfred-item');
const fuzzy = require('fuzzy');

const log = require('./log');

const common = require('./common');

let cfg = {};
try {
  cfg = fs.readJsonSync(path.join(common.DIR, '.redminerc'));
} catch(e) {
  log(e);
}

function makeContentItems(itemsSource) {
  let items = new AlfredItem();

  if (Object.prototype.toString.call(itemsSource) === '[object Array]') {
    itemsSource.map( (itm, i) => {
      items.addItem(
        i + Math.random(),
        itm.title,
        itm.subtitle,
        'icon.png',
        {
          arg: JSON.stringify({ cmd: 'open', url: cfg.server ? url.resolve(cfg.server, '/issues/' + itm.id) : '' })
        }
      )
    } )
  } else {
    items.addItem(
      Math.random(),
      itemsSource.title,
      itemsSource.subtitle,
      'icon.png',
      {
        arg: JSON.stringify({ cmd: 'open', url: cfg.server ? url.resolve(cfg.server, '/issues/' + itemsSource.id) : '' })
      }
    )
  }

  console.log(items);
}


module.exports = function(args) {

  if (!cfg.server || !cfg.api_key) {
    makeContentItems({
      title: 'No Configuration',
      subtitle: 'Please run redmine config add first.'
    });
    return;
  }

  if (args.length <= 1) {
    function showIssues(issues) {
      let _source = issues.map(itm => ({
              id: itm.id,
              title: itm.subject,
              subtitle: new Date().toISOString().slice(0, 10) + '\t' + itm.author.name + '\t\t' + itm.project.name
            }));

      makeContentItems(_source);
    }
    let tag = common.readHistoryTag();

    if (new Date().getTime() - tag < 300000) {
      let data = common.readHistoryData();
      showIssues(data.issues);
    } else {
      common.getIssues('/issues.json?assigned_to_id=me&limit=100', function(err, result) {
        if (err) {
          return;
        }

        showIssues(result.issues);

        common.writeHistoryData(result);
      });
    }

  } else {
    function doFuzzy(issues) {
      let fuzzyOptions = {
        extract: function(issue) {
          return issue.subject+issue.author;
        }
      };

      let _source = fuzzy.filter(args[1], issues, fuzzyOptions).map(itm => ({
              id: itm.original.id,
              title: itm.original.subject,
              subtitle: new Date().toISOString().slice(0, 10) + '\t' + itm.original.author.name + '\t\t' + itm.original.project.name
            }));

      makeContentItems(_source);
    }

    let tag = common.readHistoryTag();

    if (new Date().getTime() - tag < 300000) {
      let data = common.readHistoryData();
      doFuzzy(data.issues);
    } else {
      common.getIssues('/issues.json?assigned_to_id=me&limit=100', function(err, result) {
        if (err) {
          return;
        }

        doFuzzy(result.issues);

        common.writeHistoryData(result);

      });
    }

  }
}
