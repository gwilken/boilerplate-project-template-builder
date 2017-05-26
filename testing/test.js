var template = require('../controllers/template.js');
var db = require('../models');
//
// var body = {
//
//   type: 'html',
//   BundleId: 2,
//   snippet_text: '<script>http://www.test.com/js.js</script>',
//   directory_path: '/',
//   file_name: 'test.js',
//   marker: '{--script--}',
//   name: 'java'
//
// }
//
// db.Snippet.create(body).then(dbSnippet=>{
//
//   console.log(dbSnippet);
//
// }).catch(err=>{
//
//   console.error(err);
//
// });




template.getSnippets('css', function(snips) {




  template.getLayout(snips.Snippets[0].dataValues.type, function(layout) {

    console.log(layout.dataValues.text);
  
  })

});




//
//
// var obj = {
//         html: true,
//         css: {
//           bootstrap: true
//         },
//       node:
//         {
//           express: true,
//           mongo: true,
//           mysql: {
//             test: true
//           }
//         }
// }
//
// var arr = [];
//
// function cleanup(file) {
//
//   var fn = 'index.new';
//
//   var re = new RegExp( '{--[a-zA-Z\d\s]*--}', 'g' );
//
//   fs.readFile('index.html', 'utf8', function(err, data) {
//
//     //console.log(data);
//
//     while (re.test(data)) {
//
//       data = data.replace(re, '');
//
//     }
//
//     console.log('replace finished.');
//
//   fs.writeFileSync(fn, data, 'utf8');
//
//   });
// }

//
// function test(obj) {
//
//   for(var key in obj) {
//     arr.push(key);
//
//       if (typeof obj[key] === 'object') {
//           test(obj[key]);
//       }
//   }
//
//   return(arr);
//
// };
//
// console.log( test(obj) );
//
// var test = "{--style--}";
//
// var text = "<link>http://www.bootstcrap.com/cdn/test.css</link>";

// fs.readFile('../templates/html.bpl', 'utf8', function(err, data) {
//
//   if(err) console.log(err);
//
//   console.log(data);
//
//   var re = new RegExp(test, 'i');
//
//   var buffer = data;
//
//   var res = buffer.replace(re, text+test );
//
//   console.log(res);
//
//   fs.writeFile('index.html', res, 'utf8', function(err) {
//     console.log(err);
//   })
// })

// cleanup('index.html');
