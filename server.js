var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("./public"));

require("./controllers/controller.js")(app);

db.sequelize.sync({ force: true }).then(function(){
	app.listen(PORT, function(){
		console.log("App.listening on PORT " + PORT);
	});
});