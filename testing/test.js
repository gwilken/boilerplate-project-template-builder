var builder = require('../controllers/builder.js');
var writer = require('../controllers/writer.js');
var zipper = require('../controllers/zipper.js');

var db = require('../models');
var beautify = require('js-beautify').html;


    db.Snippet.findAll({
    }).then(function(docs) {

      var obj = {};
      var arr = [];

      docs.forEach(function(element) {

        if(! obj[element.stack] ) {
          obj[element.stack] = {};
        }

        if (! obj[element.stack][element.template] ) {
            obj[element.stack][element.template] = {};
          }

          if(! obj[element.stack][element.template][element.category]) {
              obj[element.stack][element.template][element.category] = [];
            }


            if(! obj[element.stack][element.template][element.category].includes(element.name) ) {

              obj[element.stack][element.template][element.category].push(element.name);

            }

      });

      console.log(JSON.stringify(obj, null, 2));
      console.log(arr);


    });


    //
    //     if( !obj[element.stack] ) obj[element.stack] =
    //
    //     var category = element.category;
    //
    //       category.push(element.name);
    //
    //     [element.template] =
    //
    //   });
    //
    //   console.log(obj);
    // });


// var args = builder.parseOptions(obj);

// builder.build(args, function(data) {
//
//   builder.scrubMarkers(data, function(result) {
//
//     builder.beautify(result, function(res) {
//
//       writer.writeZipFile(res, function() {
//         console.log('Zip file written.');
//       });
//
//     })
//   })
// })


// var options = {
//       html: {
//           markers: ['{--title--}', '{--comment--}'],
//           strings: ['test title', 'comment added']
//         }
//       };
