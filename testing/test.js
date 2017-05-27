var builder = require('../controllers/builder.js');
var db = require('../models');

var obj = {
      bootstrap: true,
      mdl: true,
      somejs: true
    }

var args = builder.parseOptions(obj);

console.log(args);




function build(arr, callback) {

  var workingTemplates = {};
  var count = 0;

  arr.forEach(function(element) {

    db.Snippet.findOne({
      where: {
        name: element
      }
    }).then(function(snippet) {

      var template = snippet.dataValues.template;

      db.Template.findOne({
        where: {
          name: template
        }
      }).then(function(data) {

        if(!workingTemplates[template]) {

          workingTemplates[template] = data.dataValues.text

        }

        builder.replace(workingTemplates[template], snippet.dataValues.marker, snippet.dataValues.snippet_text, function(str) {

          workingTemplates[template] = str;

          count++;

          if(count === arr.length ) {

            //callback(workingTemplates);

            console.log(workingTemplates[template]);
          }

          })

        })

      })

  }) //foreach

}

build(args, function(obj) {
  console.log(obj);
});









function callback(buff) {

  builder.scrubMarkers(buff, function(res) {

      console.log(res);

  });
}




function go() {

    builder.getSnippets(element, function(snippets) {

      builder.getTemplate('html', function(template) {

        var buffer = template.dataValues.text
        var counter = 0;

        snippets.forEach(function(snippet) {

          builder.replace(buffer, snippet.dataValues.marker, snippet.dataValues.snippet_text, function(str) {

            buffer = str;
            counter++;

            if(counter === snippets.length) {

              callback(buffer);

            }
          })
        })
      })
    })
}
