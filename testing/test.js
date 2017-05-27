var builder = require('../controllers/builder.js');
var db = require('../models');

var obj = {
      bootstrap: true,
      mdl: true
    }

var args = builder.parseOptions(obj);

console.log(args);


var workingTemplates = {};

function get() {

  db.Snippet.findOne({
    where: {
      name: args[0]
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

      //console.log(workingTemplates);

      builder.replace(workingTemplates[template], snippet.dataValues.marker, snippet.dataValues.snippet_text, function(str) {

        workingTemplates[template] = str;

          console.log(workingTemplates[template]);

        })

      })

    })

  }

get();









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
