var monk = require('monk');
var config = require('config');

var dbHost = config.get('mongo.host');
var dbPort = config.get('mongo.port');
var dbName = config.get('mongo.dbName');
var db = monk(dbHost + ':' + dbPort + '/' + dbName);

module.exports = db;
