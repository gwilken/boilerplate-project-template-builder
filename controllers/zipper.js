const AdmZip = require('adm-zip');
const path = require('path');


var zipFiles = function() {
  var zip = new AdmZip();

  zip.addLocalFolder( path.join( __dirname, '../public/temp') );
  zip.writeZip( path.join( __dirname, '../public/zips/files.zip') );
}

module.exports = zipFiles;
