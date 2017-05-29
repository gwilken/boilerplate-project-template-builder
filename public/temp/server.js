//--- node.js dependencies ---

const express = require("express");{--require--}

//--- code begin ---

const app = express();var PORT = 8000;app.get('/', function (req, res) {  res.send('Hello World!')});app.listen(PORT, function () {  console.log('App listening on port,' PORT);});{--nodecode--}