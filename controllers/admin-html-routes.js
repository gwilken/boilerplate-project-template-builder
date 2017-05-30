var path = require("path");

module.exports = function(app){

	app.get("/cms", (req, res)=>{
		res.sendFile(path.join(__dirname, "../public/cms.html"));
	});

	app.get("/admin", (req, res)=> {
		res.sendFile(path.join(__dirname, "../public/admin.html"));
	});

}
