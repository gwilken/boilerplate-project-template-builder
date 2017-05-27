var fs = require('fs-extra');
var db = require("../models");

var builder = {

  userOptions: [],

  parseOptions: function(obj, cb) {
      for(var key in obj) {
        this.userOptions.push(key);

          if (typeof obj[key] === 'object') {
              this.parseOptions( obj[key] );
          }
      }
    return this.userOptions;
  },

  build: function(arr, cb) {
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

              cb(workingTemplates);

            }
          })
        })
      })
    }) //foreach
  },

  replaceOptions: function(templates, options, cb) {
     for(var templateKey in templates) {

       for(var optionsKey in options)

        if(templateKey === optionsKey) {

            builder.replace(templates[templateKey], options[optionsKey].markers[0], options[optionsKey].strings[0], function(res) {

              templates[templateKey] = res;

            })
        }
     }
     cb( templates );
   },

  scrubMarkers: function(buffer, cb) {
    var re = new RegExp( '{--[a-zA-Z\d\s]*--}', 'g' );

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

  beautify: function(text, cb) {
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