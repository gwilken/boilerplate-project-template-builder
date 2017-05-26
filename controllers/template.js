var fs = require('fs-extra');
var db = require("../models");

var template = {

  userOptions: [],

  parseOptions: function(obj) {

      for(var key in obj) {
        this.userOptions.push(key);

          if (typeof obj[key] === 'object') {
              this.getOptions( obj[key] );
          }
      }
    return(this.userOptions);
  },

  scrubAllMarkers: function(file) {

    var newFilename = file + '.new';

    var re = new RegExp( '{--[a-zA-Z\d\s]*--}', 'g' );

    fs.readFile(file, 'utf8', function(err, data) {

      while (re.test(data)) {

        data = data.replace(re, '');

      };

      console.log('Scrubed all markers of', file);

    fs.writeFileSync(newFilename, data, 'utf8');

    });
  },

  replace: function(marker, string, buffer){

    var re = new RegExp(marker, 'i');

    var res = buffer.replace(re, string );

    return res;

  },

  getLayout: function(name, cb) {

    db.Layout.findOne({
      where: {
        name: name
      }
    }).then(layout => {

      cb(layout);

    });

  },

  getSnippets: function(name, cb) {

    db.Bundle.findOne({
      include: [db.Snippet],
      where: {
        name: name
      }
    }).then(dbBundle => {

      cb(dbBundle);

    });

  }
};

module.exports = template;
