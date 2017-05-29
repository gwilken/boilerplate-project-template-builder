const fs = require('fs-extra');
const path = require('path');
const db = require("../models");
var async = require('async');

var write = {

  writeFiles: function(obj) {

    async.eachOf(obj, function(val, key, callback) {

      console.log(key);
      db.Template.findOne({
        where: {
          name: key
        }
      }).then(function(data) {

        var pathname = data.dataValues.path;
        var filename = data.dataValues.filename;

        console.log(key);

          fs.outputFileSync( path.join (__dirname, '../public/temp', pathname, filename), obj[key] );

      })

    })

  }

}

module.exports = write;
