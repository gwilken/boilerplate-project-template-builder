var builder = require('../controllers/builder.js');
var db = require('../models');
var beautify = require('js-beautify').html;

var obj = {
      mdl: true,
      jquery: true,
      express: true
    };

var options = {
      html: {
          markers: ['{--title--}', '{--comment--}'],
          strings: ['test title', 'comment added']
        }
      };


var args = builder.parseOptions(obj);

//console.log(args);

builder.build(args, function(data) {

  console.log('hit');
  console.log(data);
  return;
})


//
// builder.build(args, function(templates) {
//
// //  builder.replaceOptions(templates, options, function(data) {
//
//     builder.scrubMarkers(templates, function(res) {
//
//       console.log(res);
//
//     })
// //  })
// })
