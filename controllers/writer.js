const fs = require('fs-extra');
const path = require('path');
const db = require("../models");
var async = require('async');
const AdmZip = require('adm-zip');

var write = {

  writeFileToDisk: function(obj, cb) {

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
  },

  writeZipFile: function(obj, cb) {

    var zip = new AdmZip();
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

          zip.addFile( path.join( pathname, filename), obj[key] );

          count++;

          if(count === keyCount) {
            zip.writeZip( path.join( __dirname, '../public/zips/files.zip') );
            cb();
          }
        });
      });
    }
  }


module.exports = write;
