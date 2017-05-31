var builder = require('../controllers/builder.js');
var writer = require('../controllers/writer.js');
var zipper = require('../controllers/zipper.js');

var db = require('../models');
var beautify = require('js-beautify').html;

var obj = {
      skeleton: true,
      // bootstrap: true,
       jquery: true,
      // express: true,
      // css_reset: true
    };


    db.Snippet.findAll({

    }).then(function(docs) {

      var obj = {};
      var arr = [];

      obj.name = {};
      obj.name.stack = {};
      obj.name.stack.fun = {};
      obj.name.stack.fun.greg = [];

      obj.name.stack.fun.greg = [1,2,3];

      console.log(obj);
      //
      // docs.forEach(function(element) {
      //
      //
      //
      // })

    })
