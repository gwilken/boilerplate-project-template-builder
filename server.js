
const express 		= require("express");
const bodyParser 	= require("body-parser");
const path		 		= require("path");
const exphbs 			= require("express-handlebars");
const routes 			= require("./controllers/controller.js");

const app = express();

var PORT = 80;

var db = require("./models");

app.use(express.static( path.join(__dirname, "/public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
