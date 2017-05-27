var builder = require('../controllers/builder.js');
var db = require('../models');
var beautify = require('js-beautify').html;

var obj = {
      bootstrap: true,
      mdl: true,
      somejs: true,
      express: true
    };

var options = {
      html: {
          markers: ['{--title--}', '{--comment--}'],
          strings: ['test title biatch', 'comment added']
        }
      };


var args = builder.parseOptions(obj);


builder.build(args, function(templates) {

  builder.replaceOptions(templates, options, function(data) {

    builder.scrubMarkers(data, function(res) {

      console.log(res);

    })
  })
})
