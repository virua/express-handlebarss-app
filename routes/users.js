var express = require('express');
var router = express.Router();

var db = require('../lib/db');

router.get('/', function(req, res){
  var collection = db.get('user');

  collection.find({}, function(err, docs){
    if (err) return console.error(err);

    if (docs) {

      var items = [];
      for (var i = 0; i < docs.length; i++) {
        var doc = docs[i];
        items.push({
          name: doc.name,
          lastname: doc.lastname,
          url: '/users/' + doc.slug + '/'
        });
      }

      res.render('users/index', {
        title: req.i18n.__('Users'),
        items: items
      });

    } else {
      res.status(404);
      res.render('error', {
        title: req.i18n.__('User list is empty'),
        error: {}
      });
    }

  });

});

router.get('/:slug', function(req, res){
  var slug = req.params.slug;
  var collection = db.get('user');

  collection.findOne({slug: slug}, function(err, doc){
    if (err) return console.error(err);

    if (doc) {
      res.render('users/profile', {
        title: doc.name + ' ' + doc.lastname,
        description: doc.description
      });
    } else {
      res.status(404);
      res.render('error', {
        title: req.i18n.__('User `%s` not found', slug),
        error: {}
      });
    }

  });

});

module.exports = router;
