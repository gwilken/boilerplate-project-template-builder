var builder = require('../controllers/builder.js');
var writer = require('../controllers/writer.js');
var zipper = require('../controllers/zipper.js');

var db = require('../models');
var beautify = require('js-beautify').html;

var obj = {
      bootstrap: true,
      jquery: true,
      express: true,
      css_reset: true
    };

var options = {
      html: {
          markers: ['{--title--}', '{--comment--}'],
          strings: ['test title', 'comment added']
        }
      };


var args = builder.parseOptions(obj);


builder.build(args, function(data) {

  builder.scrubMarkers(data, function(result) {

    builder.beautify(result, function(res) {

      writer.writeFiles(data, function() {

        console.log('files written.');

        zipper();

        console.log('files zipped.');

      });
    })
  })
})

  // builder.beautify(data, function(res) {
  //   console.log(res);
  // });

//console.log(data);






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
