'use strict';

var fs = require("fs-extra");
var spawn = require("child_process").spawn;

const log = require('./log');

// function clean() {
// }

module.exports = function(arg) {
  let _arg = JSON.parse(arg);

  log(arg)

  switch(_arg.cmd) {
    case "open": {
      spawn("open", [_arg.url]);
      break;
    }

    default: break;
  }
};
