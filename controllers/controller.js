const express   = require("express");
const moment    = require('moment');
const snippet   = require("../models/snippet.js");
const bundle    = require("../models/bundle.js");

var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {

  db.logs.findAll({}).then(function(data) {

    data.forEach(function(element) {
      element.date = moment(element.date).format('MMM Do YYYY');
    })

    var logsObj = {
      log: data
    };

    res.render('index', logsObj);

  })
});

router.get("/", function(req, res) {

});

router.post("/", function(req, res) {

});

module.exports = router;
