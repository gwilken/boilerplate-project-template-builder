
var db = require("../models");
var async = require('async');
var beautify_js = require('js-beautify');
var beautify_css = require('js-beautify').css;
var beautify_html = require('js-beautify').html;

var builder = {

  buildOptionsTree: function(cb) {
    db.Snippet.findAll({
    }).then(function(docs) {

      var obj = {};

      docs.forEach(function(element) {

        if(! obj[element.stack] ) {
          obj[element.stack] = {};
        }

        if (! obj[element.stack][element.category] ) {
            obj[element.stack][element.category] = {};
          }

          if(! obj[element.stack][element.category][element.template]) {
              obj[element.stack][element.category][element.template] = [];
            }

            if(! obj[element.stack][element.category][element.template].includes(element.name) ) {

              obj[element.stack][element.category][element.template].push(element.name);

            }
      });

    cb(obj);
    });
  },

  parseOptions: function(obj, cb) {
    var userOptions = [];

      for(var key in obj) {
          userOptions.push(key);
        }

    cb(userOptions);
  },

  build: function(arr, cb) {

    var workingTemplates = {};
    var count = 0;
    var countLength = 0;

    db.Snippet.count({
        where: {
          name: {
            $in: arr
          }
        }
    }).then(function(data) {
      countLength = data;
    })

    async.each(arr, function(element) {

      db.Snippet.findAll({
        where: {
          name: element
        }
      }).then(function(snippets) {

        async.each(snippets, function(snippet) {

          var template = snippet.dataValues.template;

          db.Template.findOne({
            where: {
              name: template
            }
          }).then(function(data) {

            if(!workingTemplates[template]) workingTemplates[template] = data.dataValues.text

            builder.replace(workingTemplates[template], snippet.dataValues.marker, snippet.dataValues.snippet_text, function(str) {

              workingTemplates[template] = str;

              count++;

              if(count === countLength ) {

                cb(workingTemplates);

              }
            })
          })
        })
      })
    });
  },

  replaceOptions: function(templates, options, cb) {
     for(var templateKey in templates) {

       for(var optionsKey in options)

        if(templateKey === optionsKey) {

            builder.replace(templates[templateKey], options[optionsKey].markers[0], options[optionsKey].strings[0], function(res) {

              templates[templateKey] = res;

            });
        }
     }
     cb( templates );
   },

  scrubMarkers: function(buffer, cb) {
    var re = new RegExp( '(,(\r?\n?\t* *)*)?{--[a-zA-Z\d\s]*--}', 'g' );

    for(var keys in buffer) {

      while (re.test(buffer[keys])) {

        buffer[keys] = buffer[keys].replace(re, '');

      };

    }

    cb(buffer);
  },

  replace: function(buffer, marker, string, cb){
    var re = new RegExp(marker, 'i');

    var res = buffer.replace(re, string + marker);

    cb(res);
  },

  beautify: function(obj, cb) {

    for(var key in obj) {

      switch(key) {

        case 'html':
          obj[key] = beautify_html(obj[key]);
        break;

        case 'css':
          obj[key] = beautify_css(obj[key]);
        break;

        case 'js':
          obj[key] = beautify_js(obj[key]);
        break;

        case 'package_json':
          obj[key] = beautify_js(obj[key]);
        break;

        case 'node':
           obj[key] = beautify_js(obj[key]);
        break;

        default:
        break;
      }
    }
    cb(obj);
  },

  getTemplate: function(name, cb) {
    db.Template.findOne({
      where: {
        name: name
      }
    }).then(template => {

      cb(template);
    });
  },

  getSnippets: function(type, cb) {
    db.Snippet.findAll({
      where: {
        type: type
      }
    }).then(dbBundle => {

      cb(dbBundle);
    });
  }
};

module.exports = builder;
