var i18n = require('i18n-2');
var path = require('path');

var config = require('config');
var locales = config.get('app.locales');

var options = {
    locales: ['en', 'uk'],
    defaultLocale: 'en',
    directory: path.join(__dirname, '..', 'locales'),
    extension: '.json'
};

var setLanguageFromUrl = function(req, res, next) {
  var match = req.url.match(/^\/([A-Z]{2})([\/\?].*)?$/i);
  var lang = options.defaultLocale;
  if (match){
    req.lang = lang = match[1];
    req.url = match[2] || '/';
  }
  req.i18n.setLocale(lang);
  req.app.locals.lang = lang;

  var langs = [];
  for (var i = 0; i < locales.length; i++) {
    var item = locales[i];
    item.current = locales[i].code == lang;
    langs.push(item);
  }
  req.app.locals.langs = langs;

  next();
};

module.exports = function(app) {
  i18n.expressBind(app, options);
  app.use(setLanguageFromUrl);
};
