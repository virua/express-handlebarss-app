var express = require('express');
var router = express.Router();

var db = require('../lib/db');

router.get('/', function(req, res){
  var collection = db.get('content');

  collection.findOne({slug: 'home'}, function(err, doc){
    if (err) return console.error(err);

    if (doc) {
      res.render('index', {
        title: doc.title,
        content: doc.description
      });
    } else {
      res.status(404);
      res.render('error', {
        title: req.i18n.__('Oh no! Something has gone wrong.'),
        error: {}
      });
    }

  });

});

router.get('/content/:slug', function(req, res){
  var slug = req.params.slug;
  var collection = db.get('content');

  collection.findOne({slug: slug}, function(err, doc){
    if (err) return console.error(err);

    if (doc) {
      var datetime = require('node-datetime');
      var createdTime = new Date(doc.createdTime.high_ * 1000);
      var dt = datetime.create(createdTime);
      var formattedTime = dt.format('d.m.Y, H:m');

      res.render('content', {
        title: doc.title,
        content: doc.description,
        author: '<unknown>',
        formattedTime: formattedTime
      });
    } else {
      res.status(404);
      res.render('error', {
        title: req.i18n.__('Page `%s` not found', slug),
        error: {}
      });
    }

  });

});

module.exports = router;
