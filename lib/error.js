var clientErrorHandler = function(req, res, next) {
  var err = new Error(req.i18n.__('Not Found'));
  err.status = 404;
  next(err);
}

var errorHandler = function(err, req, res, next) {
  var env = req.app.get('env');
  res.status(err.status || 500);

  if (req.xhr) {
    res.send({
      error: err.message
    });
  } else {
    res.render('error', {
        title: err.message,
        error: env === 'development' ? err : {}
    });
  }

}

module.exports.clientErrorHandler = clientErrorHandler;
module.exports.errorHandler = errorHandler;
