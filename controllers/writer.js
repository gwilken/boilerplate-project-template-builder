const fs = require('fs-extra');
const path = require('path');
const db = require("../models");
var async = require('async');

var write = {

  writeFiles: function(obj, cb) {

    var count = 0;
    var keyCount = Object.keys(obj).length;

    async.eachOf(obj, function(val, key, callback) {

      db.Template.findOne({
        where: {
          name: key
        }
      }).then(function(data) {

        var pathname = data.dataValues.path;
        var filename = data.dataValues.filename;

          fs.outputFile( path.join (__dirname, '../public/temp', pathname, filename), obj[key] ).then(function() {

              count++;
              if(count === keyCount) cb();

          });
      })
    });
  }
}

module.exports = write;
