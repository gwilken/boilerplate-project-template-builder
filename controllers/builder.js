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

  scrubMarkers: function(buffer, cb) {

    var re = new RegExp( '{--[a-zA-Z\d\s]*--}', 'g' );

    while (re.test(buffer)) {

      buffer = buffer.replace(re, '');

    };

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
