var express = require('express');
var exphbs = require('express-handlebars');
var helmet = require('helmet');
var path = require('path');

var config = require('config');
var port = config.get('app.port');

var app = new express();
app.use(helmet());

var local = require('./lib/localization')(app);
var helpers = require('./lib/helpers');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: helpers
}));

app.set('view engine', '.hbs');

var indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

var userRoutes = require('./routes/users');
app.use('/users', userRoutes);

var error = require('./lib/error');
app.use(error.clientErrorHandler);
app.use(error.errorHandler);

module.exports = app;

app.listen(port, function(err){
  if (err) {
    return console.log('Oops, something bad happened', err);
  }

  console.log('Server listening on port %s; press Ctrl-C to terminate.', port);
});
