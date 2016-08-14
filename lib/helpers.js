var path = require('path');

exports.currentYear = function () {
  return new Date().getFullYear();
};

exports.config = function (key) {
  var config = require('config');
  return config.has(key) ? config.get(key) : '';
};

exports.localeUrl = function (url, lang) {
  return path.join('/', lang, '/', url);
};
