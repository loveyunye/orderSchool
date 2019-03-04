let contents, fs, yaml;

yaml = require('js-yaml');

fs = require('fs');

contents = yaml.load(fs.readFileSync(__dirname + '/config.yaml'));

exports.getMysqlConfig = function() {
  return contents.mysql;
};

exports.getAppParam = function() {
  return contents.app;
};