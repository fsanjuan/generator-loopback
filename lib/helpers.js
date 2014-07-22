'use strict';
var chalk = require('chalk');

exports.reportValidationError = function(err, logFn) {
  if (!err || err.name !== 'ValidationError') {
    return;
  }
  
  var details = err.details;
  logFn(chalk.red('Validation error: invalid %s'), details.context);
  Object.keys(details.messages).forEach(function(prop) {
    logFn(chalk.red(' - %s: %s'), prop, details.messages[prop]);
  });
};

/**
 * validate application (module) name
 * @param name
 * @returns {String|Boolean}
 */
exports.validateAppName = function (name) {
  if (name.charAt(0) === '.' ) {
    return 'Application name cannot start with .: ' + name;
  }
  if(name.match(/[\/@\s\+%:]/)) {
    return 'Application name cannot contain special characters (/@+%: ): ' +
      name;
  }
  if(name.toLowerCase() === 'node_modules') {
    return 'Application name cannot be node_modules';
  }
  if(name.toLowerCase() === 'favicon.ico') {
    return 'Application name cannot be favicon.ico';
  }
  if(name !== encodeURIComponent(name)) {
    return 'Application name cannot contain special characters escaped by ' +
      'encodeURIComponent: ' + name;
  }
  return true;
};

/**
 * Validate name for properties, data sources, or connectors
 * @param {String} name The user input
 * @returns {String|Boolean}
 */
exports.validateName = function (name) {
  if (name.match(/[\/@\s\+%:\.]/) ||
    name !== encodeURIComponent(name)) {
    return 'Name cannot contain special characters (/@+%:. ): ' + name;
  }
  if(name !== encodeURIComponent(name)) {
    return 'Name cannot contain special characters escaped by ' +
      'encodeURIComponent: ' + name;
  }
  return true;
};

